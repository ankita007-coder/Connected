import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Aside, Modal, Navigation } from "../components";
import { useAuth } from "../utils/AuthContext";
import Wrapper from "../assets/wrappers/Groups";
import { Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { addGroup } from "../utils/groupUtils";
import { toast } from "react-toastify";

const Groups = () => {
  const [openModal, setOpenModal] = useState(false);
  const {token} = useAuth()
  const [media,setMedia]= useState(null)
  const [groupDetails, setGroupDetails] = useState({
    name:"",
    description:"",
    groupImg:null
  })

  const [groups,setGroups] = useState([])


  const onClose = () => {
    setOpenModal(false);
  };
  const onOpen = () => {
    //console.log("button clicked");
    setOpenModal(true);
  };

  const handleOnChange=(e)=>{
    const {name, value} = e.target
    setGroupDetails((prev)=>({
      ...prev,
      [name]:value
    }))

  }
  const handleMediaChange = (e)=>{
    const file = e.target.files[0];
    setGroupDetails((prev)=>({
      ...prev,groupImg:file
    })
  )
    const reader = new FileReader();
    reader.onload = (e) =>{
      setMedia(e.target.result)
    }
    reader.readAsDataURL(file);
  }
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {     
        const response = await addGroup(groupDetails,token);
        if(response){
          toast.success(response?.data?.msg)
          setGroupDetails({
            name:"",
            description:"",
            groupImg:null
          })
          onClose()
        }
    } catch (error) {
      const msg = await error?.response?.data?.msg;
      toast.error(msg)
    }
  }

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    }
  }, [openModal]);
  return (
    <>
      <Navigation />
      <Wrapper>
        {openModal && (
          <Modal onClose={onClose} title="Create New Group">
            <input
              type="text"
              name="name"
              id=""
              value={groupDetails.name}
              onChange={handleOnChange}
              placeholder="Enter group name"
              required
            />
            <textarea
              name="description"
              id=""
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
                className='btn'
                onChange={handleMediaChange}
                id="groupImg"
                style={{margin:'1rem',backgroundColor:'var(--background-secondary)'}}
                ><VisuallyHiddenInput type="file" accept='image/*'/></Button>
            </div>
           
            <div className="action-buttons">
              <button type="submit" className="button2" onClick={handleCreateGroup}>
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
        </div>
        <div className="aside">
          <Aside />
        </div>
      </Wrapper>
    </>
  );
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default Groups;
