import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Account, FriendRequests, FriendsList, Groups, Home, LoginRegister, Page404, Profile } from './pages';
import customFetch from './utils/customFetch';
import { toast } from 'react-toastify';
import { useAuth } from './utils/AuthContext';


const App = () => {
  
  const {loggedIn, login,logout} = useAuth()
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    let storedUser = localStorage.getItem('user')
    storedUser = storedUser && JSON.parse(storedUser)

    if (storedToken){
      login(storedToken,storedUser)
    }
  },[])

  const handleLogin = async(email,password)=>{
    try {
      const response = await customFetch.post('/auth/login',{
          email,password
      },{
          withCredentials: true
      })
      const {token,user} = response.data;
      
      login(token,user)

      toast.success(response.data.msg)
      setTimeout(()=>{
        window.location.href = '/home';
      },1500)
 
    }
    catch (error) {
      const msg = await error?.response?.data?.msg
      toast.error(msg)
    }
  }


  return (
   
      <Router>
      <Routes>
      <Route path="/login" element={<LoginRegister onlogin={handleLogin} />} />
        {
          loggedIn&&<>
            <Route path='/home' element={<Home />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/friends-list" element={<FriendsList />} />
            <Route path="/friend-requests" element={<FriendRequests />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/account" element={<Account />} />
          </>
        }
        
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  
  )
}

export default App;
