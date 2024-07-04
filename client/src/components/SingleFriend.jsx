import React, { useState } from 'react'
import { IoPersonRemove } from 'react-icons/io5'
import { MdChatBubble, MdVisibility } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Chat from './Chat'


const SingleFriend = ({
                        avatar,
                        name,
                        bio,
                        removeFriend,
                        userId

}) => {
  const [chatOpen,setChatOpen] =useState(false);
  return (
    <div className='container'>
      <div className='profile-img'>
        <img src={avatar}/>
      </div>
      <div className='details'>
        <h4>{name}</h4>
        <p>{bio}</p>
        <div className='action-buttons marginTop'>
            <button className='button3' onClick={()=>removeFriend(userId)}><IoPersonRemove/> &nbsp; Remove Friend</button>
            {/* <button className='button2' onClick={()=>seeProfile(userId)}><BiSolidShow/> &nbsp; See Profile</button> */}
            <Link to={`/user-profile/${userId}`} className="button2 link"><MdVisibility /> &nbsp; See Profile </Link>
            <button className='button2' onClick={()=>setChatOpen(true)}><MdChatBubble/> Message</button>
        </div>
        {
          chatOpen && <Chat/>
        }
      </div>
    </div>
  )
}

export default SingleFriend
