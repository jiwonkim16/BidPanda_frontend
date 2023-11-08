import axios from "axios";

interface EditUserData {
  nickname: string;
  intro: string;
}
interface EditPasswordData {
  password: string;
  newpassword: string;
}

/**
 * @author : Goya Gim
 * @returns : 회원정보 수정 api.
 */

export const editUserInfoApi = async (data: EditUserData) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members`,
      data,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Refresh: localStorage.getItem("authorization_refresh"),
        },
      }
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const editUserPasswordApi = async (data: EditPasswordData) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members/update-password`,
      data,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Refresh: localStorage.getItem("authorization_refresh"),
        },
      }
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
