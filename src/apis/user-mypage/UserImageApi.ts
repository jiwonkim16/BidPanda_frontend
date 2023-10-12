import axios from "axios";
import { toast } from "react-toastify";

export const ProfileImageApi = async (data: any) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members/profile-image`,
      data,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Authorization_Refresh: localStorage.getItem("authorization_refresh"),
        },
      }
    );
    return res;
  } catch (error) {
    toast.error("잠시 후 다시 시도해주세요.");
  }
};
