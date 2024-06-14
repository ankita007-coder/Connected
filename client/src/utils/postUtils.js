import { toast } from "react-toastify";
import customFetch from "./customFetch";

export const deletePostUtil = async(postId,token)=>{
    try {
      const response = await customFetch.delete(`/post/${postId}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status===200){
        toast.success(response?.data?.msg)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  

export const removeFriend = async(userId,token)=>{
   try {
    const response = await customFetch.post(`/user/remove-friend`,{
      userId
    },{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    if (response.status===200){
      toast.success(response?.data?.msg)
    }
    else{
      toast.error(response?.data?.msg)
    }
   } catch (error) {
    toast.error(error.message)
   }
}


export const getUser = async(token)=>{
  try {
    const response = await customFetch.get(`/user/profile`,{
      headers: { 
        'Authorization': `Bearer ${token}`
    }
  })
  //console.log(response)
  return response
  } catch (error) {
    //console.log(error)
    const msg = await error.response.data.msg;
    toast.error(msg) 
  }
}