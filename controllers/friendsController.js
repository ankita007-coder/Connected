import { BadRequestError, NotFoundError } from "../errors/customErrors.js"
import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"

export const addFriend = async(req, res) => {
    try {
        const user = req.user
        const reqId = req.body.userId;
        const reqUser = await User.findById(reqId);
        if(!reqUser){
            throw new NotFoundError('User not found')
        }
        reqUser.friends.pending.push(user._id);
        await reqUser.save();

        return res.status(StatusCodes.OK).json({msg:'Request sent successfully',user:reqUser});
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:'Internal Server Error'});s
    }
}

export const fetchFriendRequest = async(req, res) => {}

export const removeFriendRequest = async(req, res) =>{}

export const acceptFriendRequest = async(req, res) =>{}


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
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
};
