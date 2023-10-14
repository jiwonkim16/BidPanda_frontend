import axios from "axios";
import { toast } from "react-toastify";

const config = {
  withCredentials: true,
  mode: "cors",
};

interface UserLoginData {
  membername: string;
  password: string;
}

/**
 * @author : Goya Gim
 * @returns : 로그인 Api.
 */

export const loginApi = async (data: UserLoginData) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members/login`,
      data,
      config
    );
    toast.success("로그인에 성공하였습니다.");
    return res;
  } catch (error) {
    toast.error("로그인에 실패했습니다.");
  }
};
