import styled from "styled-components";

const Wrapper = styled.div`
    border: 2px solid var(--border);
    padding: 8px;
    border-radius: var(--border-radius-1);
    margin-bottom: 2rem;
    textarea{
        border: none;
        outline: none;
        border-bottom: 1px solid var(--border);
        width: 100%;
        padding: 1rem;
        background-color: transparent;
    }
    .btn{
        background-color: var(--background-secondary);
    }
    .btn:hover{
        background-color: var(--color-1);
    }
    .buttons{
        display: flex;
        justify-content: space-between;
    }
    select{
        padding: 0.5rem;
        border: 1px solid var(--border);
        color: var(--color-1);
        background-color: transparent;
    }
    .media-preview{
        width: 100%;
        
        img{
            width: 40%;
            display: block;
            margin: auto;
        }
    }
`

export default Wrapper