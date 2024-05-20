import mongoose, { Mongoose } from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    friends:{
        pending : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        rejected:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        accepted: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    avatar: String,
    avatarPublicId: String,
    bio:String,
    gender: {
        type: String,
        enum: ['Female','Male']
    },
    profession: String,
    photos:[{
        photoUrl: String,
        caption: String,
        photoPublicId: String
    }],
})

export default mongoose.model('User', UserSchema)