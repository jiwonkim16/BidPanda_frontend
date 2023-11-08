import axios from "axios";

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
    return res;
  } catch (error) {
    console.error(error);
  }
};
