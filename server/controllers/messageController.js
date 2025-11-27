import { receiveMessageOnPort } from "worker_threads"
import cloudinary from "../lib/cloudinary.js"
import Message from "../models/message.js"
import User from "../models/user.js"
import {io, userSocketMap} from "../server.js"


// Get all users except the logged in user
export const getUsersForSidebar =async (req, res) => {
    try {
        const userId = req.user._id
        const filterUsers = await User.find({_id: {$ne: userId}}).select("-password")

        //Count numbers of messages not seen
        const unseenMessages = {}
        
        const promises = filterUsers.map(async (user) => {
           const messages = await Message.find({senderId:
             user._id, receiverId: userId, seen: false})
            if(messages.length > 0) {
                unseenMessages[user._id] = messages.length
            }
        })
        await Promise.all(promises)
        res.json({success: true, users: filterUsers, unseenMessages})
    } catch (error) {
        console.log(error.messages);
        res.json({success: false, message: error.message})
        
    }
}
 // Get all messages for selected user
// REPLACE your existing getMessage function with this:

export const getMessage = async (req, res) => {
    try {
        const { id: selectedUserId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: selectedUserId },
                { senderId: selectedUserId, receiverId: myId }
            ]
        })

        // Mark messages as seen in Database
        await Message.updateMany(
            { senderId: selectedUserId, receiverId: myId, seen: false },
            { seen: true }
        );

        // --- NEW CODE: Notify the sender that I have opened the chat ---
        const senderSocketId = userSocketMap[selectedUserId];
        if (senderSocketId) {
            // Emit an event to the sender telling them "receiverId" (me) read the messages
            io.to(senderSocketId).emit("messagesSeen", { receiverId: myId });
        }
        // -------------------------------------------------------------

        res.json({ success: true, messages })
    } catch (error) {
        console.log(error.messages);
        res.json({ success: false, message: error.message })
    }
}
 // api to mark message as seen using message id
// REPLACE your existing markMessageAsSeen function with this:

export const markMessageAsSeen = async (req, res) => {
    try {
        const { id } = req.params
        
        // Update to true AND return the updated document (new: true)
        const message = await Message.findByIdAndUpdate(id, { seen: true }, { new: true })

        if(!message) {
            return res.status(404).json({success: false, message: "Message not found"})
        }

        // Notify the sender via Socket that their message was seen
        const senderSocketId = userSocketMap[message.senderId];
        if (senderSocketId) {
            io.to(senderSocketId).emit("messageSeen", { messageId: message._id });
        }

        res.json({ success: true })
    } catch (error) {
        console.log(error.messages);
        res.json({ success: false, message: error.message })
    }
}

// Send message to selected user
export const sendMessage = async (req, res) => {
    try {
       const {text, image} = req.body;
       
       const receiverId = req.params.id;
       const senderId = req.user._id;

       let imageUrl;
       if (image) {  
        const uploadResponse = await cloudinary.uploader.upload(image)
        imageUrl = uploadResponse.secure_url 
       }

       const newMessage = await Message.create({
        senderId,
        receiverId,
        text,
        image: imageUrl
       })

       // Emit the new message to the reciever's socket
       const receiverSocketId = userSocketMap[receiverId];
       if(receiverSocketId) {
           io.to(receiverSocketId).emit("newMessage", newMessage)
       }
            console.log(1);
            
       res.json({success: true, newMessage});

    } catch (error) {
        console.log(error.messages);
        res.json({success: false, message: error.message})
    }
}