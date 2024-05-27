import styled from "styled-components";


const Wrapper = styled.div`
    border: 2px solid var(--border);
    border-radius: var(--border-radius-1);
    
    .container{
        display: flex;
        padding: 12px;
        font-weight: 600;
        font-size: 0.9rem; 
        .box{
            width: 30%;
            border: 2px solid var(--border);
            background-color: var(--white);
            border-radius: var(--border-radius-1);
            .friend-pic{
                width: 100%;
                border-top-left-radius: var(--border-radius-1);
                border-top-right-radius: var(--border-radius-1);
                img{
                    width: 100%;
                    border-top-left-radius: var(--border-radius-1);
                    border-top-right-radius: var(--border-radius-1);
                }
            }
            p{
                text-align: center;
                margin-bottom: 4px;
            }
        }
    }
    .link-btn{
        color: var(--white);
        background-color: var(--border);
        margin: 8px;
        transition: ease-in-out 0.5s;
        font-weight: 600;
        font-size: 0.9rem;
        &:hover{
            color: var(--border);
            background-color: transparent;
            border: 2px solid var(--border)
        }
    }
`


export default Wrapper;