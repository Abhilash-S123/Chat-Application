import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import {Server} from 'socket.io'

const FRONTEND_URL = process.env.CLIENT_URL

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app)

// Initialize socket.io server with CORS
export const io = new Server(server, {
    cors: {
         origin: "*",
         methods: ["GET", "POST", "PUT"],
         credentials: true
    }
})



io.engine.on("connection_error", (err) => {
  console.log("Socket error:", err);
});


// Store online users
export const userSocketMap = {}; // { userId: socketId }

// Socket.io connection handler
io.on("connection", (socket) => {
     const userId =socket.handshake.query.userId;
     console.log("User Connected", userId);

     if(userId) userSocketMap[userId] = socket.id;

     // Emit online users to all connected clients
     io.emit("getOnlineUsers", Object.keys(userSocketMap))

     socket.on("disconnect", () => {
           console.log("User Disconnected", userId);
           delete  userSocketMap[userId];
           io.emit("getOnlineUsers", Object.keys(userSocketMap))
     })

      // Event for showing typing status to reciever
     socket.on("typing", ({senderId, receiverId}) => {
         const receiverSocketId = userSocketMap[receiverId]
         if (receiverSocketId) {
            io.to(receiverSocketId).emit("typing", senderId)
         }
     })

     // Event for stop showing typing status
      socket.on("stopTyping", ({senderId, receiverId}) => {
         const receiverSocketId = userSocketMap[receiverId]
         if (receiverSocketId) {
            io.to(receiverSocketId).emit("stopTyping", senderId)
         }
     })
})

// Middleware setup
app.use(express.json({limit: "4mb"}));
app.use(cors({
    origin: "*",
    credentials: true,
}))

// Routes setup
app.use("/api/status", (req, res) =>   res.send("Server is live"))
app.use("/api/auth", userRouter); 
app.use("/api/messages", messageRouter)


// Connect to mongodb
 await connectDB()

const PORT = process.env.PORT || 5000;
      
server.listen( PORT,"0.0.0.0", () => {
    console.log("server is running on " + PORT); 
})

export default server;
   