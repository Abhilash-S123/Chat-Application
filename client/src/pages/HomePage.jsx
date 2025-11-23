import React, { useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import SideBar from '../components/SideBar'
import RightSideBar from '../components/RightSideBar'
import { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'

const HomePage = () => {

  const {selectedUser} = useContext(ChatContext) 
   
  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
       <div className={` border-2 border-amber-50  rounded-2xl bg-gray-950
       overflow-hidden h-full grid grid-cols-1 relative ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2' }`}>
        <SideBar/>     
        <ChatContainer/>
        <RightSideBar/>
      </div>          
    </div>
  ) 
}

export default HomePage 