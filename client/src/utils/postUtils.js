import { toast } from "react-toastify";
import customFetch from "./customFetch";

export const deletePostUtil = async(postId,token)=>{
    try {
      const response = await customFetch.delete(`/post/delete/${postId}`,{
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

  