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
  .search-results{
    width: 100%;
    .container{
        width: 90%;
        background-color: var(--white);
        display: flex;
        align-items: center;
        margin: 12px;
        border: 1px solid var(--border);
        padding: 4px;
        border-radius: var(--border-radius-1);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        .profile-img{
            width: 30%;
            border-radius: var(--border-radius-1);
            img{
                width: 100%;
                border-radius: var(--border-radius-1);
            }
        }
        .details{
            margin: 8px;
            width: 70%;
            .action-buttons{
                display: flex;
                button{
                    font-size: 0.75rem;
                    padding: 4px 12px;
                    display: flex;
                    margin-right: 8px;
                    align-items: center;
                    border: none;
                    border-radius: var(--border-radius-1);
                    color: var(--white);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                    transition: ease-in-out 0.5s;
                    &:hover{
                        box-shadow: none;
                    }
                }
                .button1{
                    background-color: green;
                    &:hover{
                        color: green;
                        background: transparent;
                        border: 2px solid green;
                    }
                }
                .button2{
                    background-color:var(--background-secondary);
                    &:hover{
                        color: var(--background-secondary);
                        background: transparent;
                        border: 2px solid var(--background-secondary);
                    }
                }
                .button3{
                    background-color:var(--error);
                    &:hover{
                        color: var(--error);
                        background: transparent;
                        border: 2px solid var(--error);
                    }
                }
            }
        }
    }
  }
`


export default Wrapper