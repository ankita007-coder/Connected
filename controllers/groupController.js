import { StatusCodes } from "http-status-codes";
import { formatPicture } from "../middlewares/multerMiddleware.js";
import Groups from "../models/Groups.js"
import cloudinary from "cloudinary"

export const createGroup= async(req,res)=>{
    try {
        const user = req.user;
        console.log(user)
        let groupImage = '';
        let groupImageId='';
        if(req.file){
            const file = await formatPicture(req.file);
            const response  = await cloudinary.v2.uploader.upload(file);
            groupImage = response.secure_url;
            groupImageId = response.public_id;
        }
        const group = await Groups.create({
            name: req.body.name,
            description: req.body.description,
            groupImg: groupImage,
            groupPublicId: groupImageId,
            members: [user._id],
            admin: [user._id]
        });
        return res.status(StatusCodes.CREATED).json({msg:'Group created successfully'})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error.message})
    }
}

export const displayGroups=()=>{}


export const deleteGroup= ()=>{}


export const joinGroup= ()=>{}


export const leaveGroup= ()=>{}


export const addToGroup= ()=>{}

export const removeFromGroup= ()=>{}


export const makeAdmin = ()=>{}