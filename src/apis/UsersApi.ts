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

type KakaoLoginCode = {
  kakaoAuthCode: string | null;
};

interface UserRegisterData {
  membername: string;
  nickname: string;
  password: string;
  email: string;
}
interface EditUserData {
  nickname: string;
  password: string;
}

export const LoginApi = async (data: UserLoginData) => {
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

export const KakaoLoginApi = async (data: KakaoLoginCode) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members/kakao/callback`,
      {
        params: {
          kakaoAuthCode: data.kakaoAuthCode,
        },
      }
    );
    console.log(res);
    toast.success("로그인에 성공하였습니다.");
    return res;
  } catch (error) {
    toast.error("로그인에 실패했습니다.");
  }
};

export const UserRegisterApi = async (data: UserRegisterData) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members/signup`,
      data
    );
    toast.success("회원가입에 성공하였습니다.");
    return res;
  } catch (error) {
    toast.error("회원가입 기능에 문제가 있습니다. 잠시 후 다시 시도해주세요.");
  }
};

export const CheckUsernameApi = async (membername: string) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members/${membername}/exists`,
      membername,
      config
    );
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

export const CheckNicknameApi = async (nickname: string) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members/${nickname}/exists`,
      nickname,
      config
    );
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

export const CheckValidateCodeApi = async (code: string) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members/email/verify`,
      code,
      config
    );
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

export const EditUserInfoApi = async (data: EditUserData) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members/{membersId}/mypage`,
      data
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
