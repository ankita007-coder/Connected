import React, { useEffect, useState } from 'react'
import Wrapper from '../assets/wrappers/FriendRequests';
import { Aside, FriendRequest, Navigation, SearchedUser } from '../components';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useAuth } from '../utils/AuthContext';
import { FaSearch } from "react-icons/fa";


const FriendRequests = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const {token,user} = useAuth()

  //handle search results
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if (searchTerm===''){
      return toast.error('Please enter a search term')
    }
    try {
      const response = await customFetch.post('/user/search-users',{
        searchTerm
      },{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })   
      setSearchResult(true)
      if(response.status===200){
        const {users} = await response.data;
        const updatedUsers = users.filter(u => user._id!==u._id)
        setSearchedUsers(updatedUsers);
      }   
    } catch (error) {
      setSearchResult(true)
      toast.error(error.message) 
    }
  }

  const handleSearchChange = (e)=>{
    setSearchTerm(e.target.value)
  }
  //send friend request
  const sendRequest = async(userId)=>{
    try {
      const response = await customFetch.post('/user/send-request',{
        userId: userId
      },{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      if(response.status===200){
        
        const {user} = await response.data
        console.log(user)
        const users = searchedUsers.map((res)=>
          res._id === userId ? { ...res, friends: { ...res.friends, pending: user.friends.pending } } : res
        )
        setSearchedUsers(users)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  //unsend friend request
  const unsendRequest = async(userId)=>{
    try {
      const response = await customFetch.post('/user/unsend-request',{
        userId: userId
      },{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      if(response.status===200){
        const {user} = await response.data
        const users = searchedUsers.map((res)=>
          res._id === userId ? { ...res, friends: { ...res.friends, pending: user.friends.pending } } : res
        )
        setSearchedUsers(users)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //show user profile
  const showProfile = (userId)=>{
    
  }

  //show all friend requests
  const showFriendRequests = async()=>{
    try {
      const response = await customFetch.get('/user/get-friend-requests',{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })
      if(response.status===200){
        const list = await response.data.friendRequests
        setFriendRequests(list)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  //accept friend requests
  const acceptRequest=async(userId)=>{
    try {
      const response = await customFetch.post('/user/accept-request',{
        userId: userId
      },{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      if(response.status===200){
        const {user} = await response.data
        const users = searchedUsers.map((res)=>
          res._id === userId ? { ...res, friends: { ...res.friends, accepted: user.friends.accepted } } : res
        )
        setFriendRequests(users)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //reject friend requests
  const rejectRequest = async(userId)=>{
    try {
      const response = await customFetch.post('/user/reject-request',{
        userId: userId
      },{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      if(response.status===200){
        const {user} = await response.data
        const users = searchedUsers.map((res)=>
          res._id === userId ? { ...res, friends: { ...res.friends, pending: user.friends.pending } } : res
        )
        setFriendRequests(users)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //remove friend from friends
  useEffect(()=>{
    showFriendRequests();
  },[sendRequest,unsendRequest])

  return (
    <>
      <Navigation/>
      <Wrapper>
        <div className='outlet'>
          <div className='search'>
            <input type="search" 
                    name="searchTerm" 
                    id="searchTerm"
                    onChange={handleSearchChange}
                    value={searchTerm}
                    placeholder='Search by name or email'
                />
              <button onClick={handleSubmit}><FaSearch/></button>
          </div>
          { searchResult &&
              <div>
                {
                  searchedUsers.length>0? (
                    <div className='search-results'>
                      {
                        searchedUsers.map((user)=>{
                          return <SearchedUser 
                                                key={user._id} 
                                                {...user} 
                                                userId={user._id}
                                                sendRequest={sendRequest}
                                                showProfile={showProfile}
                                                unsendRequest={unsendRequest}/>
                        })
                      }
                    </div>
                    ):(
                    <div>
                      <p>No users found</p>
                    </div>
                  )
                }
              </div>
          }
          <div>
            <h2>Friend Requests</h2>
            <div className='line' style={{width:'95%'}}></div>
            <div className='search-results marginTop'>
                {
                  friendRequests.length > 0 ?(
                    friendRequests.map((friendRequest) =>{
                      return <FriendRequest
                                              key={friendRequest._id}
                                              {...friendRequest}
                                              userId={friendRequest._id}
                                              showProfile={showProfile}
                                              acceptRequest={acceptRequest}
                                              rejectRequest={rejectRequest}
                                              />
                    })
                  ):(
                    <div><p>No pending requests</p></div>
                  )
                }
            </div>
            
          </div>
        </div>
        <div className='aside'>
          <Aside/>
        </div>
      </Wrapper>
    </>
  );
};



export default FriendRequests
