import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    groupImg: {
        type: String
    },
    groupPublicId:{
        type: String
    },
    members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    admin:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},{
    timestamps:true
})

export default mongoose.model('Groups',GroupSchema);