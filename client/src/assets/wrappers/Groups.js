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
        width: 80%;
        margin: 8px;
        border: none;
        padding: 4px 12px;
        background: transparent;
    }
    input,textarea{
        padding: 4px 12px;
        border-bottom: 1px solid var(--border);
    }
    .MuiButton-icon{
        margin: 0;
    }
    .group-container{
        margin-top: 1rem;
        display: flex;
        background-color:#fff;
        border-radius: var(--border-radius-1);
        padding: 8px 12px;
        align-items: center;
        border: 2px solid var(--border);
        min-height: 120px;
        .group-img{
            width: 30%;
        }
        .details{
            margin-left: 12px;
        }
    }
`

export default Wrapper