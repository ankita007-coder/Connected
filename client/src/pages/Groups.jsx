import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Aside, Modal, Navigation } from '../components';
import { useAuth } from '../utils/AuthContext';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/Groups';


const Groups = () => {
  
  const [openModal,setOpenModal] = useState(false);

  const onClose = ()=>{
    setOpenModal(false);
  }
  const onOpen = ()=>{
    console.log('button clicked');
    setOpenModal(true);
  }

  const handleCreateGroup = async()=>{
    try {
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    if(openModal){
      document.body.style.overflow= 'hidden';
    }
  },[openModal])
  return (
    <>
      <Navigation />
      <Wrapper>
      {
        openModal && <Modal onClose={onClose} title="Create New Group">
          <input type="text" name="" id="" placeholder='Enter group name' required/>
          <textarea name="description" id="" cols="30" rows="4" placeholder='Enter group description'></textarea>

        </Modal>
      }
        <div className={`outlet`}>
          <div className="head-row">
              <h2>GROUPS</h2>           
              <div className='action-buttons'>
                <button className='button2' onClick={onOpen}>
                  Create new group
                </button>
              </div>
          </div>
          <div className="line"></div>
        </div>
        <div className='aside'>
          <Aside />
        </div>
      </Wrapper>
    </>
  );
};

export default Groups;
