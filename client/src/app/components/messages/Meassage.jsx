import { AuthContext } from '@/app/context/AuthContext'
import useConversation from '../../zustand/useConversation'
import React, { useContext } from 'react'
import { extractTime } from '@/Utils/extractTime'

const Message = ({message}) => {
  const {AuthData}=useContext(AuthContext)
  const {selectedConversation}= useConversation();
  const fromMe = message.senderId===AuthData._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe?'chat-end':'chat-start';
  const profilePic = fromMe?AuthData.profilePic: selectedConversation?.profilePic;
  const bubbleBgColor = fromMe? 'bg-blue-500' :'';
  const shakeClass = message.shouldShake ? "shake" :'';
  return (
  <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'> 
            <div className='w-10 rounded-full'>
                <img src={profilePic} alt="Tailwind CSS chat bubble component" />
            </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
        <div className='chat-footer text-xs text-white flex gap-1 items-center '>{formattedTime}</div>
    </div>
  )
}

export default Message