import User from "../models/User.js"
import {formatPicture} from '../middlewares/multerMiddleware.js'
import cloudinary from 'cloudinary';
import { StatusCodes } from "http-status-codes";


export const updateProfilePic = async(req,res)=>{
    
    const newUser = await req.user

    delete newUser.password;

    if (req.file){
        const file = formatPicture(req.file);
        const response = await cloudinary.v2.uploader.upload(file);

        newUser.avatar = response.secure_url
        newUser.avatarPublicId = response.public_id
    }
   
    const updatedUser = await User.findByIdAndUpdate(req.user._id, newUser);

    if (req.file && updatedUser.avatarPublicId){
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }

    return res.status(StatusCodes.OK).json({msg: "User updated successfully"});
}


export const profile = async(req, res) => {
    const user = await req.user
    return res.status(StatusCodes.OK).json({msg: "User fetched successfully",user})
}


