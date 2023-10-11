import { toast } from "react-toastify";
import axios from "axios";

export const getUserInfoApi = async () => {
  try {
    const token = localStorage.getItem("authorization");
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    toast.error("회원정보를 가져오지 못 했습니다.");
  }
};
