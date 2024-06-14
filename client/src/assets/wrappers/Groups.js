import styled from "styled-components";



const Wrapper = styled.div`

    padding: 1rem 2rem;
    display: flex;
    background-color: #eee;
    min-height: 100vh;
    .outlet{
        .head-row{
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
        }
    }
    h2,h3{
        color: var(--main-theme-background);
    }
    input,textarea{
        width: 100%;
        margin: 8px;
        border: none;
        padding: 4px 12px;
        background: transparent;
    }
`

export default Wrapper