import React, { useEffect, useState } from 'react'
import customFetch from '../utils/customFetch'
import { useAuth } from '../utils/AuthContext';
import Wrapper from '../assets/wrappers/Aside';
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';

const Aside = () => {

  const [friends,setFriends] = useState([]);
  const {token} = useAuth()
  const fetchFriends = async() =>{
    try {
      const response = await customFetch.get('/user/get-friends',{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      if(response.status===200){
        const {acceptedFriends} = await response.data
        setFriends(acceptedFriends)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    fetchFriends();
  },[friends])
  return (
    <Wrapper>
      <div className="container">
        {
          friends.slice(0,9).map((friend)=>{
            return <div className='box' key={friend._id}>
                <div className='friend-pic'>
                  <img src={friend.avatar}/>
                </div>
                <p>{friend.name}</p>
              </div>
          })
        }
      </div>
      <Link to="/friends-list" className='btn link-btn'>See All Friends</Link>
    </Wrapper>
  )
}

export default Aside
