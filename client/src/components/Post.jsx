import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/Post'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const Post = ({
                createPost,
                setContent,
                setPostImage,
                media,
                setMedia,
                content,
                setCategory,
                category
              }) => {  

  const handleChange = (e) =>{
    setContent(e.target.value)
  }
  const handleMediaChange = (e)=>{
    const file = e.target.files[0];
    setPostImage(file);
    const reader = new FileReader();
    reader.onload = (e) =>{
      setMedia(e.target.result)
    }
    reader.readAsDataURL(file);
  }
  const handleCategoryChange = (e) =>{
    setCategory(e.target.value)
   // console.log(e.target.value)
  }
  return (
    <Wrapper>
      <div>
        <select name="category" id="" value={category} onChange={handleCategoryChange}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
        <div>
        <textarea placeholder="What's on your mind?"
                  name='content'
                  value={content}
                  onChange={handleChange}></textarea>
        </div>
        {
          media && <div className='media-preview'>
            <img src={media}/>
          </div>
        }
        <div className='buttons'>
            <div>
            <Button variant="contained" endIcon={<SendRoundedIcon />} 
                    className='btn'
                    onClick={createPost}>
                Post
            </Button>
            </div>
            <div>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                className='btn'
                onChange={handleMediaChange}
                >
                Upload Image/Video
                <VisuallyHiddenInput type="file" accept='image/*,video/*'/>
            </Button>
            </div>
        </div>
    </Wrapper>
  )
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

export default Post
