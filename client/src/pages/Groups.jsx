import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Aside, Image, Modal, Navigation } from "../components";
import { useAuth } from "../utils/AuthContext";
import Wrapper from "../assets/wrappers/Groups";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { addGroup, fetchAllGroups, joinGroup } from "../utils/groupUtils";
import { toast } from "react-toastify";
import dummy from "../assets/images/group dummy.png";
import { Avatar, AvatarGroup } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { MdVisibility } from "react-icons/md";

const Groups = () => {
  const [openModal, setOpenModal] = useState(false);
  const { token, user } = useAuth();
  const [media, setMedia] = useState(null);
  const [groupDetails, setGroupDetails] = useState({
    name: "",
    description: "",
    groupImg: null,
  });

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [memberStatus, setMemberStatus] = useState({});

  const onClose = () => {
    setOpenModal(false);
  };
  const onOpen = () => {
    setOpenModal(true);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setGroupDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setGroupDetails((prev) => ({
      ...prev,
      groupImg: file,
    }));
    const reader = new FileReader();
    reader.onload = (e) => {
      setMedia(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await addGroup(groupDetails, token);
      if (response) {
        toast.success(response?.data?.msg);
        setGroupDetails({
          name: "",
          description: "",
          groupImg: null,
        });
        onClose();
        getGroups();
      }
    } catch (error) {
      const msg = await error?.response?.data?.msg;
      toast.error(msg);
    }
  };

  const getGroups = async () => {
    try {
      const response = await fetchAllGroups(token);
      if (response.status === 200) {
        const fetchedGroups = response.data.groups;
        setGroups(fetchedGroups);

        const status = fetchedGroups.reduce((acc, group) => {
          if (group && Array.isArray(group.members)) {
            acc[group._id] = group.members.some(
              (member) => member && member._id === user._id
            );
          }
          return acc;
        }, {});

        setMemberStatus(status);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch groups:", error);
      toast.error("Failed to fetch groups.");
      setLoading(false);
    }
  };

  const handleJoinGroup = async (groupId) => {
    try {
      const response = await joinGroup(groupId, token);
      if (response.status === 200) {
        toast.success(response?.data?.msg);
        const { group } = response.data;
        let updatedGroups = groups.map((prevGroup) =>
          prevGroup._id === groupId
            ? { ...prevGroup, members: group.members }
            : prevGroup
        );
        setGroups(updatedGroups);
        setMemberStatus((prevStatus) => ({
          ...prevStatus,
          [groupId]: true,
        }));
      }
    } catch (error) {
      toast.error("Failed to join group.");
    }
  };

  const handleLeaveGroup = (groupId) => {
    // Add the leave group functionality here
  };

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openModal]);

  useEffect(() => {
    getGroups();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navigation />
      <Wrapper>
        {openModal && (
          <Modal onClose={onClose} title="Create New Group">
            <input
              type="text"
              name="name"
              value={groupDetails.name}
              onChange={handleOnChange}
              placeholder="Enter group name"
              required
            />
            <textarea
              name="description"
              cols="30"
              rows="4"
              value={groupDetails.description}
              onChange={handleOnChange}
              placeholder="Enter group description"
              required
            ></textarea>
            <div>
              <label htmlFor="groupImg">Upload Group Image</label>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                className="btn"
                onChange={handleMediaChange}
                id="groupImg"
                style={{
                  margin: "1rem",
                  backgroundColor: "var(--background-secondary)",
                }}
              >
                <VisuallyHiddenInput type="file" accept="image/*" />
              </Button>
            </div>

            <div className="action-buttons">
              <button
                type="submit"
                className="button2"
                onClick={handleCreateGroup}
              >
                Add Group
              </button>
            </div>
          </Modal>
        )}
        <div className={`outlet`}>
          <div className="head-row">
            <h2>GROUPS</h2>
            <div className="action-buttons">
              <button className="button2" onClick={onOpen}>
                Create new group
              </button>
            </div>
          </div>
          <div className="line"></div>
          {groups.map((group) => {
            const { name, description, groupImg, members, _id } = group;
            const isMember = memberStatus[_id];

            return (
              <div className="group-container" key={_id}>
                <div className="group-img">
                  <Image src={groupImg || dummy} />
                </div>
                <div className="details">
                  <h4>{name}</h4>
                  <p>{description}</p>
                  {members && members.length > 3 ? (
                    <AvatarGroup max={3}>
                      {members.map((member) => {
                        if (!member) return null;
                        return <Avatar src={member.avatar} key={member._id} />;
                      })}
                    </AvatarGroup>
                  ) : (
                    <p>{members.length} member(s) in the group</p>
                  )}
                  <div className="action-buttons marginTop">
                    {isMember ? (
                      <button
                        className="button3"
                        onClick={() => handleLeaveGroup(_id)}
                      >
                        <ExitToAppIcon /> &nbsp; Exit Group
                      </button>
                    ) : (
                      <button
                        className="button1"
                        onClick={() => handleJoinGroup(_id)}
                      >
                        <GroupAddIcon /> &nbsp; Join Group
                      </button>
                    )}
                    <button className="button2">
                      <MdVisibility /> &nbsp; See Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="aside">
          <Aside />
        </div>
      </Wrapper>
    </>
  );
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default Groups;
