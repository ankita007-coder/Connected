import { BadRequestError, NotFoundError } from "../errors/customErrors.js"
import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"

//send friend request
export const addFriend = async(req, res) => {
    try {
        const user = req.user
        const reqId = req.body.userId;
        const reqUser = await User.findById(reqId);
        if(!reqUser){
            throw new NotFoundError('User not found')
        }
        if (reqUser.friends.pending.includes(user._id)){
            throw new BadRequestError('Friend request already sent');
        }
        reqUser.friends.pending.push(user._id);
        await reqUser.save();

        return res.status(StatusCodes.OK).json({msg:'Request sent successfully',user:reqUser});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:'Internal Server Error'});s
    }
}

export const unsendRequest = async(req,res)=>{
    try {
        const user = req.user
        const reqId = req.body.userId;
        const reqUser = await User.findById(reqId);
        if(!reqUser){
            throw new NotFoundError('User not found')
        }
        reqUser.friends.pending.pull(user._id);
        await reqUser.save();

        return res.status(StatusCodes.OK).json({msg:'Request sent successfully',user:reqUser});
    } catch (error) {
        
    }
}

export const fetchFriendRequest = async(req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('friends.pending', 'name email avatar bio');
        const friendRequests = user.friends.pending;       
        return res.status(StatusCodes.OK).json({friendRequests});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error.message});
    }
}

export const acceptFriendRequest = async(req, res) =>{
    try {
        const currUser = req.user;
        const reqId = req.body.userId

        const reqUser = await User.findById(reqId)
        reqUser.friends.accepted.push(currUser._id)
        await reqUser.save()
        currUser.friends.accepted.push(reqId)
        currUser.friends.pending.pull(reqId)
        await currUser.save()
        return res.status(StatusCodes.OK).json({msg:'Request sent successfully',user:reqUser});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message})
    }
}

export const removeFriendRequest = async(req, res) =>{
    try {
        const currUser = req.user;
        const reqId = req.body.userId
        const reqUser = await User.findById(reqId)
        currUser.friends.pending.pull(reqId)
        await currUser.save()
        return res.status(StatusCodes.OK).json({msg:'Request sent successfully',user:reqUser});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message})
    }
}

export const removeFriend = async(req,res)=>{
    try {
        const currUser = req.user;
        const reqId = req.body.userId;
        const reqUser = await User.findById(reqId);
        if(!reqUser){
            throw new NotFoundError('User not found')
        }
        currUser.friends.accepted.pull(reqId);
        await currUser.save();
        reqUser.friends.accepted.pull(currUser._id);
        await reqUser.save();
        return res.status(StatusCodes.OK).json({msg:'Friend removed successfully'})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message})
    }
}

export const searchUsers = async (req, res) => {
    const { searchTerm } = req.body;
    if (!searchTerm) {
        throw new BadRequestError('Enter search term')
    }
    const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    try {
        const users = await User.find({
            $or: [
                { name: { $regex: sanitizedSearchTerm, $options: 'i' } },
                { email: { $regex: sanitizedSearchTerm, $options: 'i' } }
            ]
        }).select('-password');
        return res.status(StatusCodes.OK).json({ users });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
};


//get all friends
export const getAllFriends = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('friends.accepted','name email avatar bio');
        return res.status(StatusCodes.OK).json({acceptedFriends: user.friends.accepted});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error.message});
    }
};
