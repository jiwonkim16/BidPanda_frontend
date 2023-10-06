import axios from "axios";
import { setToken } from "../utils/tokens";

interface UserLoginData {
  username: string;
  password: string;
}

export const LoginApi = async (data: UserLoginData) => {
  try {
    const res = await axios.post("/api/users/login", data);
    if (res.status === 200) {
      console.log("로그인 성공");
      setToken(res.headers.authorization);
    }
  } catch (error) {
    console.error(error);
  }
};

interface UserRegisterData {
  username: string;
  nickname: string;
  password: string;
  email: string;
}

export const UserRegisterApi = async (data: UserRegisterData) => {
  try {
    const res = await axios.post(
      `${import.meta.env.REACT_APP_API_KEY}/api/users/signup`,
      data
    );
    if (res.status === 200) {
      console.log("회원가입 성공");
    }
  } catch (error) {
    console.error(error);
  }
};

export const CheckUsernameApi = async (data: string) => {
  try {
    const res = await axios.post("/api/users/idcheck/{username}", data);
    if (res.status === 200) {
      console.log("회원가입 성공");
    }
  } catch (error) {
    console.error(error);
  }
};

export const CheckNicknameApi = async (data: string) => {
  try {
    const res = await axios.post("/api/users/nicknamecheck/{nickname}", data);
    if (res.status === 200) {
      console.log("회원가입 성공");
    }
  } catch (error) {
    console.error(error);
  }
};
