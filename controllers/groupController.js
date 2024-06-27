import { StatusCodes } from "http-status-codes";
import { formatPicture } from "../middlewares/multerMiddleware.js";
import Groups from "../models/Groups.js";
import cloudinary from "cloudinary";

export const createGroup = async (req, res) => {
  try {
    const user = req.user;
    //console.log(user)
    let groupImage = "";
    let groupImageId = "";
    if (req.file) {
      const file = await formatPicture(req.file);
      const response = await cloudinary.v2.uploader.upload(file);
      groupImage = response.secure_url;
      groupImageId = response.public_id;
    }
    const group = await Groups.create({
      name: req.body.name,
      description: req.body.description,
      groupImg: groupImage,
      groupPublicId: groupImageId,
      members: [user._id],
      admin: [user._id],
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Group created successfully" });
  } catch (error) {
    //console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
};

export const displayGroups = async (req, res) => {
  try {
    const groups = await Groups.find({})
      .sort({ createdAt: -1 })
      .populate("admin", "name email avatar")
      .populate("members", "name email avatar");
    return res.status(StatusCodes.OK).json({
      msg: "Successful",
      groups,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
};

export const displayGroupById = async () => {
  try {
    const { groupId } = req.params;
    const group = await Groups.findById(groupId)
      .populate("admin", "name email avatar")
      .populate("members", "name email avatar");
    return res.status(StatusCodes.OK).json({msg:"success",group});
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message});
  }
};


export const deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;
    const group = await Groups.findById(groupId);
    if (!group) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Group not found" });
    }

    const isAdmin = group.admin.some((ad) => ad._id === userId);
    if (!isAdmin) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "You are not authorized to delete this group" });
    }

    const response = await Groups.findByIdAndDelete(groupId);
    return res
      .status(StatusCodes.OK)
      .json({ msg: "Group deleted successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
};

export const joinGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const user = req.user;
    const group = await Groups.findById(groupId);
    group.members.push(user._id);
    await group.save();
    return res.status(StatusCodes.OK).json({ msg: "Joined group", group });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
};

export const leaveGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const user = req.user;
    const group = await Groups.findById(groupId);

    const isAdmin = group.admin.includes(user._id);

    if (isAdmin) {
      if (group.admin.length > 1) {
        const oldestMember = group.members[0];
        group.admin.push(oldestMember);
        group.members.pull(user._id);
        await group.save();
        return res.status(StatusCodes.OK).json({ msg: "Left group", group });
      } else {
        await Groups.findByIdAndDelete(groupId);
        return res
          .status(StatusCodes.OK)
          .json({
            msg: "Group deleted as there are no members left",
            group: groupId,
          });
      }
    } else {
      group.members.pull(user._id);
      await group.save();
      return res.status(StatusCodes.OK).json({ msg: "Left group", group });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
};

export const addToGroup = () => {};

export const removeFromGroup = () => {};

export const makeAdmin = () => {};
