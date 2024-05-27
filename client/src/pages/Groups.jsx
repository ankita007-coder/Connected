import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Aside, Navigation } from '../components';
import { useAuth } from '../utils/AuthContext';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/Groups';


const Groups = () => {
  
  return (
    <>
      <Navigation />
      <Wrapper>
        <div className='outlet'>
          <div className="head-row">
              <h2>GROUPS</h2>           
              <div className='action-buttons'>
                <button className='button2'>
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
