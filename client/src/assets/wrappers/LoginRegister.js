import styled from 'styled-components'


const Wrapper = styled.div`
    margin-top: 5%;
    display: flex;
    justify-content: center;
    margin-bottom: 10rem;
    input,textarea{
        background-color: transparent;
        border: none;
        outline: none;
        border-bottom: 1px solid var(--border);
        margin: 8px 8px;
        width: 90%;
        padding: 8px;
    }
    .register{
        width: 30%;
        background-color: var(--background-secondary);
        padding: 16px;
        transition: ease-in-out 0.5s;
        box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.5);
        border-top-left-radius: 16px;
        border-bottom-left-radius: 16px;
        input,textarea{
            border-bottom: 1px solid var(--white);
        }
        h3,label,input,p,textarea{
            color: var(--white);
        }
        .button-primary{   
            color: var(--white);
            border-color: var(--white);
        }
    }
    .login{
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
        width: 30%;
        background-color: var(--white);
        padding: 16px;
        transition: ease-in-out 0.5s;
        box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.5);
        h3,label,input,p{
            color: var(--background-secondary);
        }
    }
    .button-primary{
        display: block;
        margin: 8px auto;
    }

    .login.loginOn {
        transform: translateX(-100%);
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        border-top-left-radius: 16px;
        border-bottom-left-radius: 16px;
    }

    .register.loginOn {
        transform: translateX(100%);
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
    }

    h3,p{
        text-align: center;
        font-size: 2rem;
    }
    label{
        margin: 8px 8px;
        text-transform: capitalize;
        font-weight: var(--semi-bold);
    }
    .gender{
        display: flex;
    }
`


export default Wrapper