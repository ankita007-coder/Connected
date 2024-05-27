import { StatusCodes } from "http-status-codes"
import { NotFoundError } from "../errors/customErrors.js"
import Post from "../models/Post.js"

export const updateLikes = async(req,res)=>{
    try {
        const id = await req.params.postId
        const post  = await Post.findById(id)
        const userId = req.user._id
        if(!post){
            throw new NotFoundError('Post not found')
        }
        const alreadyLiked  = post.likes.findIndex(like=> like.authorId.equals(userId))

        if(alreadyLiked===-1){
            post.likes.push({authorId: userId})
        }else{
            post.likes.splice(alreadyLiked, 1)
        }
        await post.save();
        return res.status(StatusCodes.OK).json({msg:'Likes updated successfully',post})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:'Internal Server Error'})
    }
}