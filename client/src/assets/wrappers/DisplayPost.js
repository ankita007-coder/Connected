import styled from 'styled-components'

const Wrapper = styled.div`
    .post{
        width: 80%;
        border: 2px solid var(--color-1);
        margin: 1rem 4rem;
        border-radius: var(--border-radius-1);
        padding: 1rem;
        background-color: #fff;
        .post-head{
            display: flex;
            justify-content: space-between;
            .author{
                display: flex;
                margin: 4px 4px 20px 0;
                img{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 2rem;
                }
                h5{
                    margin:0;
                }
                p{
                    font-weight: 500;
                    font-size: 0.75rem;
                    color: #aaa;
                }
            }
            #demo-customized-button{
                color: var(--color-1);
            }
            
        }
        .post-content{
            margin-top:1rem;
            .post-image{
                width: 50%;
                display:block;
                margin: auto;
                img{
                    width: 100%;
                }
            }
        }
        .reactions{
            display: flex;
            justify-content: space-between;
            font-size: 1.2rem;
            .post-react{
                display: flex;
                align-items: center;
                .like{
                    display: flex;
                    align-items:center;
                    margin: 8px;
                    color: rgb(244, 67, 54);
                    span{
                        color: black;
                    }
                    &:hover{
                        cursor: pointer;
                    }
                }
                .comment{
                    margin: 8px;
                    display: flex;
                    align-items: center;
                    &:hover{
                        cursor: pointer;
                    }
                }
                .share{
                    &:hover{
                        cursor: pointer;
                    }
                }
            }
        }
        .add-comment{
            margin: 8px;
            input{
                width: 80%;
                border: none;
                outline: none;
                padding:4px 8px;
                &:focus, &:active{
                    outline: none;
                }
                border-bottom: 1px solid var(--border);
            }
            button{
                border: none;
                background: transparent;
                margin-left: 4px;
                padding: 4px 16px;
                background: var(--color-1);
                color: #eee;
                border-radius: var(--border-radius-1);
                transition:ease-in 0.5s;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
                &:hover{
                    background: var(--border);
                    box-shadow: none;
                }
            }
        }
        .comment-content{
            display: flex;
            align-items: center;
            margin: 8px;
            .avatar{
                width: 15%;
                border-radius: 50%;
                margin-right: 12px;
                border: 1px solid var(--border);
                img{
                    width: 100%;
                    border-radius:50%;
                }
            }
            .content{
                width: 80%;
                h5{
                    margin-top: 8px;
                    font-size: 16px;
                    margin-bottom: 2px;
                }
                p{
                    font-size: 14px;
                    margin-bottom: 2px;
                }
                button{
                    border: none;
                    background-color: transparent;
                    padding: 0;
                    font-size: 10px;
                    color: var(--color-1);
                    text-decoration: underline;
                    &:hover{
                        cursor: pointer;
                    }
                }
            }
            
        }

    }


`

export default Wrapper