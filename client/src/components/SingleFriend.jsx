import React from 'react'
import { BiSolidShow } from 'react-icons/bi'
import { IoPersonRemove } from 'react-icons/io5'


const SingleFriend = ({
                        avatar,
                        name,
                        bio,
                        removeFriend,
                        userId

}) => {
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
            <button className='button2' onClick={()=>seeProfile(userId)}><BiSolidShow/> &nbsp; See Profile</button>
        </div>
      </div>
    </div>
  )
}

export default SingleFriend
