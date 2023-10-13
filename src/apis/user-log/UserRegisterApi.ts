import { toast } from "react-toastify";
import axios from "axios";

const config = {
  withCredentials: true,
  mode: "cors",
};

interface UserRegisterData {
  membername: string;
  nickname: string;
  password: string;
  email: string;
}

/**
 * @author : Goya Gim
 * @returns :
 */

export const userRegisterApi = async (data: UserRegisterData) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members`,
      data
    );
    toast.success("회원가입에 성공하였습니다.");
    return res;
  } catch (error) {
    toast.error("회원가입 기능에 문제가 있습니다. 잠시 후 다시 시도해주세요.");
  }
};

export const checkMembernameApi = async (membername: any) => {
  try {
    await axios.get(
      `${
        import.meta.env.VITE_REACT_API_KEY
      }/api/members/membername/${membername}`
    );
  } catch (error) {
    console.error(error);
  }
};

export const checkNicknameApi = async (nickname: any) => {
  try {
    await axios.get(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members/nickname/${nickname}`
    );
  } catch (error) {
    console.error(error);
  }
};

export const sendValidateEmailApi = async (data: string) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members/email`,
      { email: data },
      config
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const checkValidateCodeApi = async (data: {
  code: string;
  email: any;
}) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members/email/verify`,
      { authKey: data.code, email: data.email }
    );
    toast.success("이메일 인증에 성공하였습니다.");
  } catch (error) {
    console.error(error);
  }
};
