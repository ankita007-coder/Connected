import React, { useEffect, useState } from 'react'
import {Aside, Loading, Navigation} from '../components'
import Wrapper from '../assets/wrappers/Profile'
import dummy from "../assets/images/dummy.jpg"
import bg from "../assets/images/bg.jpg"
import { useAuth } from '../utils/AuthContext'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'


const UserProfile = () => {

  const {token} = useAuth();
  const [user,setUser]= useState()
  const {id} = useParams()
  const [loading,setLoading] = useState(true);
  const fetchProfile = async()=>{
    try {
      const response = await customFetch.get(`/user/user-profile/${id}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(response.data)
      setUser(response.data.user)
      setLoading(false)
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(()=>{
    fetchProfile()
  },[])

  if(loading){
    return <Loading/>
  }
  return (
    <>
      <Navigation/>
      <Wrapper>
        <div className='outlet'>
          <div className='profile'>
            <div className='profile-wall'>
              <img src={bg} alt="" />
              
            </div>
            <div className='profile-img'>  
              
                 
                <img src={user?.avatar||dummy} 
                      alt="" 
                      onMouseEnter={()=>setDisplay(true)}      
                  />             
            </div>
            <div className='details'>
              <h2>{user?.name}</h2>  
              <h6>{user?.gender?'She/Her':'He/Him'}</h6> 
              <p>{user?.bio}</p>
            </div>
          </div>
        </div>
        <div className='aside'>
          <Aside/>
        </div>
      </Wrapper>
    </>
  )
}

export default UserProfile
