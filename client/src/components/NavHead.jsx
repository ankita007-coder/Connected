import React from 'react'
import styled from 'styled-components'
const NavHead = () => {
  return (
    <Wrapper>
      <div className='branding'>
        <h2>&lt; Connected /&gt;</h2>
      </div>
    </Wrapper>
  )
}


const Wrapper = styled.div`
    width: 100%;
    background-color: var(--main-theme-background);
    box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.5);
    h2{
        margin-top: 0;
        padding: 16px;
        font-family: var(--brand);
        color: var(--white);
        font-size: 2rem;
        font-weight: var(--heading-1);
    }
`
export default NavHead
