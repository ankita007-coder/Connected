import React, { useEffect, useState } from 'react'
import {Aside, Navigation, PrivatePosts} from '../components'
import Wrapper from '../assets/wrappers/Profile'
import dummy from "../assets/images/dummy.jpg"
import bg from "../assets/images/bg.jpg"
import { useAuth } from '../utils/AuthContext'
import customFetch from '../utils/customFetch'
import CameraIcon from '@mui/icons-material/Camera';
import { toast } from 'react-toastify'


const Profile = () => {

  const {token} = useAuth();
  const [user,setUser]= useState()
  const [display,setDisplay] = useState(false)
  const fetchProfile = async()=>{
    try {
      const response = await customFetch.get('/user/profile',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(response)
      setUser(response.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(token){
      fetchProfile()
    }
  },[])


  const handleProfilePic = async(e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('avatar',file);
    try {
      const response = await customFetch.post('/user/profilePic',formData,{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response.status=== 200) {
        toast.success('Profile picture uploaded successfully')
        fetchProfile();
      }
    } catch (error) {
      toast.error(error)
    }
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
              
               {
                display && <div className='dp' onMouseLeave={()=>setDisplay(false)}>
                <label htmlFor='dp'><CameraIcon/></label>
                <input type="file" 
                        name="avatar" 
                        id="dp" 
                        accept='image/*'
                        style={{display:'none'}}
                        onChange={handleProfilePic}
                       />
                </div> 
               }    
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
          <PrivatePosts/>
        </div>
        <div className='aside'>
          <Aside/>
        </div>
      </Wrapper>
    </>
  )
}

export default Profile
