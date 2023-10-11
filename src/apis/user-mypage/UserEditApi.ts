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
    const token = localStorage.getItem("authorization");
    const res = await axios.put(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members`,
      data,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
