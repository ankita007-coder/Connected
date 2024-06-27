import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    border-radius: var(--border-radius-1);
    .image{
        img{
            max-height: 100px;
            width: 100%;
            border-radius: var(--border-radius-1);
        }
    }
    .background{
        width: 100%;
        img{
            width: 100%;
            min-height: 200px;
        }
    }
`

export default Wrapper