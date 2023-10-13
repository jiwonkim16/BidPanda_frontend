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

export type KakaoLoginCode = {
  kakaoAuthCode: string | null;
};

/**
 * @author : Goya Gim
 * @returns :
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

export const kakaoLoginApi = async (data: any) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_REACT_API_KEY
      }/api/members/kakao/callback?code=${data}`,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    console.log(res);
    toast.success("카카오 로그인에 성공하였습니다.");
    return res;
  } catch (error) {
    toast.error("카카오 로그인에 실패했습니다.");
  }
};
