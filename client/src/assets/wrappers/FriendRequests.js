import styled from "styled-components";


const Wrapper = styled.div`
  padding: 1rem 2rem;
  display: flex;
  background-color: #eee;
  min-height: 100vh;
  .search{
    width: 100%;
    margin-bottom: 1.5rem;
    input{
        width: 85%;
        border: none;
        padding: 12px;
        &:focus, &:active{
            outline: none;
        }
    }
    button{
        width: 10%;
        padding: 12px;
        border: none;
        background-color: var(--main-theme-background);
        color: var(--white);
    }
  }
  h2{
    margin: 20px 0px;
  }
  .marginTop{
    margin-top: 20px;
  }
`


export default Wrapper