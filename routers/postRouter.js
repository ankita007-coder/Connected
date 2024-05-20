import { Router } from "express";
import { createPost, deletePost, displayPost } from "../controllers/postController.js";
import { userAuthentication } from "../middlewares/authMiddleware.js";
import { updateLikes } from "../controllers/likeController.js";
import { addComment, editComment, removeComment } from "../controllers/commentController.js";
import { validateComment } from "../middlewares/validationMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";


const router = Router();
router.use(userAuthentication)
router.get('/', displayPost);
router.post('/add', upload.single('postImage'), createPost); // Using multer middleware here
router.delete('/delete/:postId', deletePost);

router.post('/like/:postId', updateLikes);

router.post('/comment/:postId', validateComment, addComment);
router.delete('/comment/delete/:postId', removeComment);
router.patch('/comment/:commentId', editComment);

export default router;
