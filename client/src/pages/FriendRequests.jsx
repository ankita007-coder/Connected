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
  const [requestSent, setRequestSent] = useState(false);
  const {token,user} = useAuth()

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

  const addFriend = async(userId)=>{
    try {
      const response = await customFetch.post('/user/add-friend',{
        userId: userId
      },{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      if(response.status===200){
        const {user} = await response.data
        const users = searchResult.map((res)=>
          res._id === userId ? { ...res, friends: { ...res.friends, pending: user.friends.pending } } : res
        )
        setSearchResult(users)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const showProfile = (userId)=>{
    
  }
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
                                                addFriend={addFriend}
                                                showProfile={showProfile}/>
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
            <FriendRequest/>
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
