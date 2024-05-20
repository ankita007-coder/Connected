import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import page404 from "../assets/images/404.png";
import { Link, useNavigate } from "react-router-dom";


const Page404 = () => {
  const [count,setCount] = useState(10);
  const navigate = useNavigate();
  useEffect(()=>{
    setTimeout(()=>{
      if (count>1){
        setCount(count-1)
      }  
      else{
        navigate('/login')
      }    
    },1000)
  },[count])
  return (
    <Wrapper>
      <img src={page404} alt="Error"/>
        <p>Redirecting to login page in {count} seconds</p>
        <Link to='/login' className='link'>Back to Login</Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p{
    color: red;
  }
  .link{
    color: var(--white);
    background-color: var(--background-secondary);
    box-shadow: 0 4px 4px 2px rgba(0, 0, 0,0.3);
    text-decoration: none;
    padding: 8px 16px;
    border-radius: var(--border-radius-1);
    text-transform: uppercase;
    transition: ease-in-out 0.5s;
    &:hover{
      border: 2px solid var( --color-1);
      color: var( --color-1);
      background-color: transparent;
      box-shadow: none;

    }
  }
`
export default Page404
