import MessageContainer from '@/app/components/messages/MessageContainer'
import Sidebar from '@/app/components/sidebar/Sidebar'
import React from 'react'

const Main = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0]'>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Main