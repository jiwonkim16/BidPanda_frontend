import axios from "axios";
import { toast } from "react-toastify";

const config = {
  withCredentials: true,
  mode: "cors",
};

interface EditUserData {
  nickname: string;
  intro: string;
  password: string;
  newPassword: string;
}

export const EditUserInfoApi = async (data: EditUserData) => {
  console.log(data);
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members`,
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
    console.error(error);
  }
};
