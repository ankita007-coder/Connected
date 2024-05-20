import React from 'react'
import { useAuth } from '../utils/AuthContext'

const Comments = ({comm,postAuthorId,postId,deleteComment}) => {

    const {user} = useAuth()
 
  return (
    <div className='comment-content' key={comm._id}>
        <div className='avatar'>
            <img src={comm?.authorId?.avatar}/>
        </div>
        <div className='content'>
            <h5>{comm?.authorId?.name}</h5>
            <p>{comm?.content}</p>
            <p>
         
            {
                (user._id===comm.authorId._id)?
                (<><button>Edit</button> &nbsp;</>):null
            }
            {
                (user._id===comm.authorId._id || user._id===postAuthorId._id)?
                (<button style={{color:'rgb(244, 67, 54)'}}
                          onClick={()=>deleteComment(comm._id,postId)}>Delete</button>):null
            }
            </p>
        </div>
    </div>
  )
}

export default Comments



