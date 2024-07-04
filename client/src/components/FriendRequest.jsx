import React from 'react'
import { IoPersonAdd,IoPersonRemove } from "react-icons/io5";
import { BiSolidShow } from "react-icons/bi";
import { Link } from 'react-router-dom';

const FriendRequest = ({
                        avatar,
                        name,
                        bio,
                        userId,
                        acceptRequest,
                        rejectRequest
                    }) => {

    
    // const seeProfile = (userId) =>{
    //     showProfile(userId)
    // }

  return (
    <div className='container'>
      <div className='profile-img'>
        <img src={avatar}/>
      </div>
      <div className='details'>
        <h4>{name}</h4>
        <p>{bio}</p>
        <div className='action-buttons marginTop'>
            <button className='button1' onClick={()=>acceptRequest(userId)}><IoPersonAdd/> &nbsp; Accept</button>
            <button className='button3' onClick={()=>rejectRequest(userId)}><IoPersonRemove/> &nbsp; Reject</button>
            {/* <button className='button2' onClick={()=>seeProfile(userId)}><BiSolidShow/> &nbsp; See Profile</button> */}
            <Link to={`/user-profile/${userId}`} className="button2 link">
            <BiSolidShow/> &nbsp; See Profile
                    </Link>
        </div>
      </div>
    </div>
  )
}

export default FriendRequest
