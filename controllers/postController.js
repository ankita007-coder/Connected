import cloudinary from 'cloudinary';
import Post from '../models/Post.js';
import { StatusCodes } from 'http-status-codes';
import { UnauthorizedError } from '../errors/customErrors.js';

export const createPost = async (req, res) => {
  try {
    let postImage = '';
    let publicId = '';
    
    if (req.file) {
      const file = formatPicture(req.file);
      const response = await cloudinary.v2.uploader.upload(file);   
      postImage = response.secure_url;
      publicId = response.public_id;
    }

    const user = req.user;
    const post = new Post({
      content: req.body.content,
      category: req.body.category,
      postImage: postImage,
      postImagePublicId: publicId,
      authorId: user._id,
    });

    await post.save();
    return res.status(StatusCodes.CREATED).json({
      msg: 'Post created successfully',
      post
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

export const displayPost = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort('-createdAt')
      .populate('authorId', 'name email avatar')
      .populate('likes.authorId', 'name email avatar')
      .populate('comments.authorId', 'name email avatar');
    return res.status(StatusCodes.OK).json({ posts: posts });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

export const editPost = async () => {
  // To be implemented
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'No post found' });
    }
    if (req.user._id.toString() === post.authorId._id.toString()) {
      await Post.findByIdAndDelete(req.params.postId);
      return res.status(StatusCodes.OK).json({ msg: 'Post deleted successfully' });
    } else {
      throw new UnauthorizedError('You are not allowed to delete this post');
    }
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};
