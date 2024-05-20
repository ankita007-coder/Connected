import { StatusCodes } from "http-status-codes";
import { NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
import Post from "../models/Post.js"

export const addComment = async(req,res)=>{
    try {
        const user = req.user;
        const post = await Post.findById(req.params.postId);
        if(!post){
            throw new NotFoundError('Post not found')
        }
        const comment = {
            content: req.body.content,
            authorId: user._id
        }
        post.comments.push(comment);
        const updatedPost = await post.save();
        const populatedPost = await Post.populate(updatedPost,{
            path: 'comments.authorId',
            select: 'name avatar email'
        })
        return res.status(StatusCodes.OK).json({msg:'Comment added successfully',post:populatedPost});
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error.message});
    }
}

export const removeComment = async(req,res)=>{
    try {
        const user = req.user;
        const post = await Post.findById(req.params.postId);
        if(!post){
            throw new NotFoundError('Post not found');
        }
        console.log(req.body.commId);
        const comment = post.comments.id(req.body.commId);
        if (!comment){
            throw new NotFoundError('Comment not found');
        }
       
        if (comment.authorId.toString() !== user._id.toString() && post.authorId.toString() !== user._id.toString()) {
            throw new UnauthorizedError('Not authorized to delete comment')
        }

        post.comments.pull(req.body.commId) 
        const updatedPost = await post.save();
        const populatedPost = await Post.populate(updatedPost,{
            path: 'comments.authorId',
            select: 'name avatar email'
        })
        return res.status(StatusCodes.OK).json({msg:'Comment deleted successfully',post:populatedPost})
    } catch (error) {
        console.log(error)
    }
}

export const editComment = async(req,res)=>{}