import { toast } from "react-toastify";
import axios from "axios";

export const UserDeleteApi = async () => {
  try {
    await axios.delete(`${import.meta.env.VITE_REACT_API_KEY}/api/members`, {
      headers: {
        Authorization: localStorage.getItem("authorization"),
        Authorization_Refresh: localStorage.getItem("authorization_refresh"),
      },
    });
    toast.success("탈퇴 되었습니다. 다시 만나길 바랍니다.");
  } catch (error) {
    toast.error("잠시 후 다시 시도해 주세요.");
  }
};
