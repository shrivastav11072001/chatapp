import { SocketContext } from '@/app/context/SocketContext';
import useConversation from '../../zustand/useConversation';
import React, { useContext } from 'react'

function Conversation({conversation, lastIdx,emoji}) {
    const {selectedConversation, setSelectedConversation}=useConversation();
    const isSelected = selectedConversation?._id ===conversation._id;
    const {onlineUsers} = useContext(SocketContext);
    const isOnline = onlineUsers.includes(conversation._id);
    
  return (
    <>
    <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-2 cursor-pointer
        ${isSelected ? 'bg-sky-500' :""}
        `}
        onClick={()=>setSelectedConversation(conversation)}
        >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
            <div className='w-12 rounded-full'>
                <img src={conversation.profilePic} alt="user avatar" />
            </div>
        </div>
        <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
                <p className='font-bold text-gray-200'>{conversation.fullName}</p>
                <span className='text-xl'>{emoji}</span>
            </div>
        </div> 
    </div>
    {!lastIdx && <div className='divider my-0 py-0 h-0.5 bg-gray-200'/>}
    </>
  )
}

export default Conversation