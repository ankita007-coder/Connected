import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Aside, Navigation } from '../components';
import { useAuth } from '../utils/AuthContext';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import SingleFriend from '../components/SingleFriend';
import { removeFriend } from '../utils/postUtils';
import { useNavigate } from 'react-router-dom';

const FriendsList = () => {
  
  const [acceptedFriends, setAcceptedFriends]= useState([]);
  const [count,setCount]=useState(10);
  const {token} = useAuth();
  const navigate = useNavigate();
  const getFriends =async()=>{
    try {
      const response = await customFetch.get('/user/get-friends',{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      const list = await response.data.acceptedFriends;
      setAcceptedFriends(list);
    } catch (error) {
      toast.error('Error while displaying friend list')
    }
  }

  const deleteFriend = async(userId)=>{
    await removeFriend(userId,token);
    const updatedList = acceptedFriends.filter((friend)=>{
      return friend._id!==userId
    })
    setAcceptedFriends(updatedList)
  }
  const redirect = ()=>{
    setTimeout(()=>{
      if (count>1){
        setCount(count-1)
      }  
      else{
        navigate('/friend-requests')
      }    
    },1000)
  }
  useEffect(()=>{
    getFriends()
  },[])
  useEffect(()=>{
    redirect()
  },[count])
  return (
    <>
      <Navigation />
      <Wrapper>
        <div className='outlet'>
          {
            acceptedFriends.length > 0 ? (<div className="search-results">
            {
              acceptedFriends.map((acceptedFriend)=>{
                return <SingleFriend key={acceptedFriend._id} 
                                      {...acceptedFriend}
                                      removeFriend={deleteFriend}
                                      userId={acceptedFriend._id}
                                      />
              })
            }
            </div>):(

              <p>Add people you know by searching them...<br/>
                Redirect you to friend requests page in {count} seconds...
              </p>
            )
          }
        </div>
        <div className='aside'>
          <Aside />
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  padding: 1rem 2rem;
  display: flex;
  background-color: #eee;
  min-height: 100vh;
`;

export default FriendsList;
