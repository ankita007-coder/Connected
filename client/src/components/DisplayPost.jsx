import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/DisplayPost'
import { FaArrowUp, FaBookmark, FaHeart, FaRegBookmark, FaRegComment, FaRegHeart } from "react-icons/fa";
import { useAuth } from '../utils/AuthContext';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deletePostUtil } from '../utils/postUtils';

import { FiSend } from "react-icons/fi";
import Comments from './Comments';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';


const DisplayPost = ({
                        posts,
                        comment,
                        saved,
                        setPosts,
                        setComment,
                        setSaved,
                        updateLikes,
                        category,
                        addComments
                      }) => {



  const formatTimestamp = (timestamp) => {

    const currentTime = new Date();
    const dateObj = new Date(timestamp);
    const diffMilliseconds = currentTime.getTime() - dateObj.getTime();
    const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));
    const diffHours = Math.floor(diffMilliseconds / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));
    
    if (diffMinutes <= 1) {
        return 'Just now';
    } else if (diffMinutes < 60) {
        return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
        const options = { month: 'short', day: 'numeric' };
        return dateObj.toLocaleDateString(undefined, options);
    }
};
  

  const {user,token} = useAuth()


  const [anchorEl, setAnchorEl] = useState(null);
  const [openComment, setOpenComment] = useState(null);

  const [boolComment, setBoolComment] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const deletePost =async (postId)=>{
    await deletePostUtil(postId,token)
    handleClose();
    const updatedPosts = posts.filter((p)=>p._id!==postId)
    console.log(updatedPosts)
    setPosts(updatedPosts)
  }

  const toggleComments =(postId)=>{
      setBoolComment(!boolComment)
      setOpenComment(postId)
    if(!boolComment){
      closeComments()
    }
  }
  const closeComments =()=>{
    setOpenComment(null)
  }

  const addComment =async(postId)=>{
    addComments(postId)
  }

  const removeComment = async (commId,postId) => {
    try {
          const response = await customFetch.delete(`/post/comment/delete/${postId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: { commId }
        });

        if (response.status === 200) {
          const post = await response.data.post;
          let pre = posts.map((prevPost) =>
            prevPost._id === postId ? { ...prevPost, comments: post.comments } : prevPost
          );
          setPosts(pre);
          toast.success(response?.data?.msg);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Wrapper>
      <div className='posts'>
        {
          posts.map((post) =>{
            if (category==='private' && post.authorId._id!==user._id){
              return null;
            }
            return post.category===category && <div key={post._id} className='post'>
            <div className='post-head'>
              <div className='author'>
                <img src={post?.authorId?.avatar}/>
                <div>
                  <h5>{post?.authorId?.name}</h5>
                  <p>{formatTimestamp(post.createdAt)}</p>
                </div>
              </div>
              {
                post?.authorId?._id===user._id && <div>
                <Button
                  id="demo-customized-button"
                  aria-controls={open ? 'demo-customized-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  disableElevation
                  onClick={handleClick}
                >
                 <MoreVertIcon />  
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} disableRipple style={{color:'var(--action)'}}>
                    <EditIcon style={{color:'var(--action)'}}/>
                    Edit
                  </MenuItem>
                  <MenuItem  
                            disableRipple 
                            style={{color:'var(--error)'}}
                            onClick={()=>deletePost(post._id)}
                            >
                    <DeleteIcon style={{color:'var(--error)'}}/>
                    Delete
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem onClick={handleClose} disableRipple style={{color:'black'}}>
                    <ArchiveIcon style={{color:'black'}}/>
                    Archive
                  </MenuItem>
                </StyledMenu>
              </div>
              }
            </div>
            <div className='line'></div>
            <div className='post-content'>
              {
                post.content!==''?
                (
                  <p>{post.content}</p>
                ):(
                  <></>
                )
              }
              {
                post.postImage!==''?
                (
                  <div className='post-image'>
                    <img src={post.postImage}/>
                  </div>
                ):(<></>)
              }
            </div>
            <div className='line'></div>
            {
              category==='public' &&
              <div className='reactions'>
              <div className='post-react'> 
                <div className='like' onClick={()=>updateLikes(post._id)}>
                {                
                    post.likes.some((like) => {
                                            return like.authorId._id === user._id || like.authorId === user._id;
                                            }) ? (
                                              <FaHeart />
                                            ) : (
                                              <FaRegHeart />
                                            
                                        )}
                  
                                  &nbsp;
                      <span>{post.likes.length}</span>           
                  </div>
                <div className='comment' onClick={()=>toggleComments(post._id)}>{<FaRegComment/>} &nbsp;
                  <span>{post.comments.length}</span>
                </div>
                <div className='share'><FiSend/></div>                 
              </div>

                <div>
                  {saved? <FaBookmark/>:<FaRegBookmark/>}
                </div>
            </div>
            }
            {
              openComment===post._id && category!=='private' && <><div className='add-comment'>
              <input type="text" 
                      name="comment" 
                      id="comment"
                      value={comment}
                      onChange={(e)=>setComment(e.target.value)} 
                      required/>
              <button type='submit' onClick={()=>addComment(post._id)}><FaArrowUp/></button>
            </div>
            <div>
              {post.comments.map((comm)=>{
                return <Comments key={comm._id} 
                                  comm={comm} 
                                  postId={post._id}
                                  postAuthorId={post.authorId}
                                  closeComments={closeComments}
                                  deleteComment={removeComment}/>
              })
              }
            </div>
            </>
            }
        </div>
          })
        }
      </div>
    </Wrapper>
  )
}

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default DisplayPost
