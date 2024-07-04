import React from 'react'
import { IoPersonAdd,IoPersonRemove } from "react-icons/io5";
import { BiSolidShow } from "react-icons/bi";
import { useAuth } from '../utils/AuthContext';
import { Link } from 'react-router-dom';

const SearchedUser = ({
                        avatar,
                        name,
                        bio,
                        userId,
                        sendRequest,
                        friends,
                       
                        unsendRequest
                    }) => {

    const {user} = useAuth()
    
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
        <div className='action-buttons'>
        {
            friends.pending.includes(user._id)&&<button className='button3' onClick={()=>unsendRequest(userId)}><IoPersonRemove/> &nbsp; Unsend Request</button>
        }
        {
            !friends.pending.includes(user._id)&& !friends.accepted.includes(user._id) &&<button className='button1' onClick={()=>sendRequest(userId)}><IoPersonAdd/> &nbsp; Add Friend</button>
        
        }    {
          friends.accepted.includes(user._id) && <button className='button3' onClick={()=>(userId)}><IoPersonRemove/> &nbsp; Remove Friend</button>
        }
            {/* <button className='button2' onClick={()=>seeProfile(userId)}> &nbsp; See Profile</button> */}
            <Link to={`/user-profile/${userId}`} className="button2 link">
            <BiSolidShow/> &nbsp; See Profile
                    </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchedUser
