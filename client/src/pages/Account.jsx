import React, { useEffect, useState } from 'react'
import {Aside, Navigation, PrivatePosts} from '../components'
import Wrapper from '../assets/wrappers/Account'


const Account = () => {



  return (
    <>
      <Navigation/>
      <Wrapper>
        <div className="outlet"></div>
        <div className='aside'>
          <Aside/>
        </div>
      </Wrapper>
    </>
  )
}

export default Account
