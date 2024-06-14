import { toast } from "react-toastify";
import customFetch from "./customFetch"

export const addGroup = async(group,token)=>{
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
                'Authorization': `Bearer ${token}`
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