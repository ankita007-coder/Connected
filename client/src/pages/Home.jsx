import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Aside, DisplayPost, Loading, Navigation, Post } from '../components';
import { useAuth } from '../utils/AuthContext';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

const Home = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [media, setMedia] = useState(null);
  const [comment, setComment] = useState('');
  const [saved, setSaved] = useState(false);
  const [category, setCategory] = useState('public');
  const [loading,setLoading] = useState(false);
  const createPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
      formData.append('content', content);
      if (postImage) {
        formData.append('postImage', postImage);
      }
      formData.append('category', category);
      const response = await customFetch.post('/post/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        toast.success(response?.data?.msg);
        setContent('');
        setPostImage(null);
        setMedia(null);
        displayPost();
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const displayPost = async () => {
    try {
      setLoading(true);
      const response = await customFetch.get('/post', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        setLoading(false)
        setPosts(response.data.posts);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateLikes = async (postId) => {
    try {
      const response = await customFetch.post(`/post/like/${postId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const post = await response.data.post;
        let pre = posts.map((prevPost) =>
          prevPost._id === postId ? { ...prevPost, likes: post.likes } : prevPost
        );
        setPosts(pre);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComments = async (postId) => {
    try {
      if (comment !== '') {
        const response = await customFetch.post(`/post/comment/${postId}`, {
          content: comment,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setComment('');
          const post = await response.data.post;
          let pre = posts.map((prevPost) =>
            prevPost._id === postId ? { ...prevPost, comments: post.comments } : prevPost
          );
          setPosts(pre);
        } else {
          toast.error(response.data.msg);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  useEffect(() => {
    if(token){
      displayPost();
    }
  }, []);

  if(loading){
    return <Loading/>;
  }
  return (
    <>
      <Navigation />
      <Wrapper>
        <div className='outlet'>
          <Post
            createPost={createPost}
            setContent={setContent}
            setPostImage={setPostImage}
            media={media}
            content={content}
            setMedia={setMedia}
            setCategory={setCategory}
            category={category}
          />
          <DisplayPost
            posts={posts}
            comment={comment}
            saved={saved}
            setPosts={setPosts}
            setComment={setComment}
            setSaved={setSaved}
            updateLikes={updateLikes}
            addComments={addComments}
            category="public"
          />
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
`;

export default Home;
