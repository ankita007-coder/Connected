import mongoose from "mongoose"
 

const likeSchema = new mongoose.Schema({
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

})

const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})
const PostSchema = new mongoose.Schema({
    content:String,
    postImage:String,
    postImagePublicId:String,
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [likeSchema],
    comments: [commentSchema],
    category: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Post', PostSchema);