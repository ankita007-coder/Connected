import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DisplayPost, Post } from '../components'
import { useAuth } from '../utils/AuthContext'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'



const PrivatePosts = () => {
 
  const {user,token}= useAuth();
  const [posts,setPosts] = useState([]);
  const [content,setContent] = useState('');
  const [postImage,setPostImage] = useState(null)
  const [media,setMedia] = useState(null);
  const [category,setCategory] = useState('public')

  
  
  const createPost = async(e)=>{
      e.preventDefault();
      const formData = new FormData();
      try {
        console.log(category)
        formData.append('content',content)
        formData.append('authorId',user._id)
        formData.append('postImage',postImage)
        formData.append('category',category)
        const response = await customFetch.post('/post/add',formData,{
          headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        
        if(response.status===201){
          toast.success(response?.data?.msg)
          setContent('')
          setPostImage(null)
          setMedia(null)
          displayPost()
        }
        else{
          toast.error(response?.data?.msg)
        }
      } catch (error) {
        toast.error(error.message)
      }
  }

  const displayPost = async()=>{
    try {
      const response = await customFetch.get('/post',{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response.status===200){
        //console.log(response.data)
        setPosts(response.data.posts)
      }
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(()=>{
    displayPost();
  },[])
  return (
        <>
          <Post createPost={createPost} 
                setContent={setContent} 
                setPostImage={setPostImage} 
                media={media}
                content = {content}
                setMedia={setMedia}
                setCategory={setCategory}
                category={category}
                />
          <DisplayPost posts={posts}
                        setPosts={setPosts}
                        category="private"
                        />
      
    </>
    
  )
}

export default PrivatePosts

