import styled from "styled-components";



const Wrapper = styled.div`
    padding: 1rem 2rem;
    display: flex;
    background-color: #eee;
    .profile{
        display: flex;
        flex-direction: column;
    }
    .profile-wall{
        width: 100%;
        border-radius: var(--border-radius-2) var(--border-radius-2) 0 0;
        border: 5px solid var(--border);
        img{
            width: 100%;
            border-radius: var(--border-radius-2) var(--border-radius-2) 0 0;
        }
    }
    .profile-img{
        width: 100%;
        display: flex;
        flex-direction: column;
        transform: translateY(-60%);
        img{
            
            width: 150px;
            height: 150px;
            border-radius:50%;
            border: 5px solid var(--border);
            margin:2rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
            transition: ease-in-out 0.5s;
            &:hover{
                box-shadow: none;
            }
        }
    }
    .details{
        transform: translateY(-100%);
        h2{
            margin: 0;
            line-height: 3rem;
        }
    }
    .dp{
        display: flex;
        background-color: rgba(0, 0, 0, 0.5);
        width: 150px;
        height: 150px;
        margin:2rem;
        justify-content: center;
        align-items: center;
        z-index: 7;
        position: absolute;
        border-radius: 50%;
        label{
            color: white;

        }
    }


`

export default Wrapper