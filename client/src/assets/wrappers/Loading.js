import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: rgba(0,0,0,0.1);

    .loading {
        height: 200px;
        width: 200px;
        border-bottom: 10px solid var(--main-theme-background);
        border-top: 10px solid var( --background-secondary);
        border-radius: 50%;
        animation: spin 1s linear infinite; /* Increased duration and set to linear */
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;


export default Wrapper
