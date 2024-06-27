import { toast } from "react-toastify";
import customFetch from "./customFetch"

export const addGroup = async(group)=>{
    //console.log(group)
    const formData = new FormData();
    formData.append('name', group.name);
    formData.append('description', group.description);
    if(group.groupImg!==null){
        formData.append('groupImg', group.groupImg);
    }
    try {
        const response = await customFetch.post('/group',formData,{
            headers:{
                'Content-Type':'multipart/form-data',
            }
        });
        if (response.status===201){
            return response
        }
        
    }
     catch (error) {
        const msg = await error.response.data.msg;
        toast.error(msg)
    }
}

export const fetchAllGroups = async()=>{
    try {
        const response = await customFetch.get('/group');
        return response;
    } catch (error) {
        const msg = await error.response.data.msg;
        toast.error(msg)
    }
}

export const joinGroup = async(groupId)=>{
    try {
        const response = await customFetch.post(`/group/join-group/${groupId}`,{})
        return response
    } catch (error) {
        const msg = await error.response.data.msg;
        toast.error(msg)
    }
}

export const exitGroup = async(groupId,token)=>{
    try {
        const response = await customFetch.delete(`group/leave-group/${groupId}`)
        return response
    } catch (error) {
        const msg = await error.response.data.msg;
        toast.error(msg)
    }
}