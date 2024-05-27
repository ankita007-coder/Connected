import { Router } from "express";
import { profile, updateProfilePic } from "../controllers/userController.js";
import { userAuthentication } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
import { 
        acceptFriendRequest,
         addFriend, 
         fetchFriendRequest, 
         getAllFriends, 
         removeFriend, 
         removeFriendRequest, 
         searchUsers, 
         unsendRequest
        } from "../controllers/friendsController.js";

const router = Router()

router.use(userAuthentication)

router.get('/profile', profile)
router.post('/profilePic',upload.single('avatar'), updateProfilePic)

//friend controller routes
router.post('/search-users',searchUsers);
router.get('/get-friend-requests',fetchFriendRequest)
router.post('/send-request',addFriend);
router.post('/unsend-request',unsendRequest);
router.post('/accept-request',acceptFriendRequest);
router.post('/reject-request',removeFriendRequest);
router.get('/get-friends',getAllFriends);
router.post('/remove-friend',removeFriend);


export default router