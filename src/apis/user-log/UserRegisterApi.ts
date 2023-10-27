import axios from "axios";

interface UserRegisterData {
  membername: string;
  nickname: string;
  password: string;
  email: string;
}

/**
 * @author : Goya Gim
 * @returns : 유저 회원가입에 필요한 2개의 중복 체크, 2개의 이메일 인증 관련 api,
 *            회원가입 api가 구현 되어있습니다.
 */

export const userRegisterApi = async (data: UserRegisterData) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members`,
      data
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const checkMembernameApi = async (membername: string) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_REACT_API_KEY
      }/api/members/membername/${membername}`
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const checkNicknameApi = async (nickname: string) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members/nickname/${nickname}`
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const sendValidateEmailApi = async (data: string) => {
  const config = {
    withCredentials: true,
    mode: "cors",
  };
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
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members/email/verify`,
      { authKey: data.code, email: data.email }
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
