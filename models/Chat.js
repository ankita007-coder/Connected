import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    message:{
        type: String
    }
},{
    timestamps:true
})