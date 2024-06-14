import { Router } from "express";
import {
  addToGroup,
  createGroup,
  deleteGroup,
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
router.delete("/", deleteGroup);
router.post("/join-group", joinGroup);
router.delete("/leave-group", leaveGroup);
router.patch("/add-to-group", addToGroup);
router.delete("/remove-from-group", removeFromGroup);
router.patch("/make-admin", makeAdmin);

export default router;
