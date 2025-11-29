import React, { useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { ChatContext } from '../../context/ChatContext'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useState } from 'react'
import toast from 'react-hot-toast'

const ChatContainer = () => {

  const { selectedUser, setSelectedUser, messages, sendMessage,
    getMessages, typingUser } = useContext(ChatContext)

  const { authUser, onlineUsers, socket } = useContext(AuthContext)

  const scrollEnd = useRef()

  const MAX_SIZE = 4 * 1024 * 1024; // 4 MB

  const fileInputRef = useRef()

  const [input, setInput] = useState('')

  // Handle sending a message      
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null 
    await sendMessage({ text: input.trim() })
    setInput("")
  }

  // Handle sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("select an image file")
      return;
    }

    if (file.size > MAX_SIZE) {
      toast.error("Image too large! ");
      return;
    }
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onloadend = async () => {
      await sendMessage({ image: reader.result })
      fileInputRef.current.value = ""
    }
  }
 // function for typing status 
   let typingTimeout = useRef(null)

  const handleTyping = () => {

     if (!selectedUser) return;

     socket.emit("typing", {
         senderId: authUser._id,
         receiverId: selectedUser._id
     })

     clearTimeout(typingTimeout.current)
      typingTimeout.current = setTimeout(() => {
       socket.emit("stopTyping", {
           senderId: authUser._id,
           receiverId: selectedUser._id
       })
     }, 1200)
  }

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id)
    }
  }, [selectedUser])

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return selectedUser ? (
    <div className='h-full overflow-scroll relative border bg-gray-900 border-gray-600'>

      {/* header */}

      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img className='w-8 h-8 rounded-full' src={selectedUser.profilePic || assets.avatar_icon} alt="" />
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && <span className='w-2 h-2 rounded-full bg-green-500'></span>}
          {<span ref={typingTimeout} className='text-sm text-gray-300 '>{ typingUser === selectedUser._id ? "typing..." : ""}</span>}
        </p>
        <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt=""
          className='md:hidden max-w-7' />
      </div>

      {/* chat-area */}

      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3
          pb-6'>
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 mb-4 justify-end ${msg.
            senderId !== authUser._id && 'flex-row-reverse'}`}>
            
            {/* Message Content */}
            <div className={`flex flex-col ${msg.senderId === authUser._id ? "items-end" : "items-start"}`}>
                {msg.image ? (
                <img src={msg.image} alt="" className='max-w-[230px] border
                        border-gray-700 rounded-lg overflow-hidden' />
                ) : (
                <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg
                        break-all bg-violet-500/30 text-white ${msg.senderId === authUser._id ? 'rounded-br-none' :
                        'rounded-bl-none'}`}>{msg.text}</p>
                )}
                
                {/* Time and Checkmarks */}
                <div className='flex items-center gap-1 mt-1'>
                    <p className='text-[10px] text-gray-500'>{formatMessageTime(msg.createdAt)}</p>
                    
                    {/* Only show checks on MY messages */}
                    {msg.senderId === authUser._id && (
                        msg.seen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        )
                    )}
                </div>
            </div>

            <div className='text-center text-xs'>
              <img src={msg.senderId === authUser._id ? authUser?.profilePic ||
                assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon
              } alt="" className='w-7 h-7 rounded-full' />
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* bottom area */}

      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
        <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
          <input onChange={(e) => {setInput(e.target.value); handleTyping();} } value={input}
            onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null} type="text"            
            placeholder='Send a message' className='flex-1 text-sm p-3 border-none rounded-lg outline-none
              text-white placeholder-gray-400' />              
          <input ref={fileInputRef} onChange={handleSendImage} type="file" id='image' accept='image/png, image/jpeg' hidden />
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="" className='w-5 mr-2
                cursor-pointer' />
          </label>
        </div>
        <img onClick={handleSendMessage} src={assets.send_button} alt="" className='w-7
          cursor-pointer'/>
      </div>
  
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500
    bg-white/10 max-md:hidden h-full'>
      <img className='max-w-16' src={assets.logo_icon} alt="" />
      <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
    </div>
  )
}

export default ChatContainer