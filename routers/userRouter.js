import { Router } from "express";
import { profile, updateProfilePic } from "../controllers/userController.js";
import { userAuthentication } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
import { 
         addFriend, 
         fetchFriendRequest, 
         searchUsers 
        } from "../controllers/friendsController.js";

const router = Router()

router.use(userAuthentication)

router.get('/profile', profile)
router.post('/profilePic',upload.single('avatar'), updateProfilePic)

//friend controller routes
router.post('/search-users',searchUsers);
router.get('/get-friend-requests',fetchFriendRequest)
router.post('/add-friend',addFriend);

export default router