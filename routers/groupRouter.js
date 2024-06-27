import { Router } from "express";
import {
  addToGroup,
  createGroup,
  deleteGroup,
  displayGroupById,
  displayGroups,
  joinGroup,
  leaveGroup,
  makeAdmin,
  removeFromGroup,
} from "../controllers/groupController.js";
import { userAuthentication } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
import { validateAddGroup } from "../middlewares/validationMiddleware.js";

const router = Router();

router.use(userAuthentication);
router.post("/" ,upload.single("groupImg"),validateAddGroup, createGroup);
router.get("/", displayGroups);
router.get("/:groupId",displayGroupById);
router.delete("/:groupId", deleteGroup);
router.post("/join-group/:groupId", joinGroup);
router.delete("/leave-group/:groupId", leaveGroup);
router.patch("/add-to-group/:groupId", addToGroup);
router.delete("/remove-from-group/:groupId", removeFromGroup);
router.patch("/make-admin/:groupId", makeAdmin);

export default router;
