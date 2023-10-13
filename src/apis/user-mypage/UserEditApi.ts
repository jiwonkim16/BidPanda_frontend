import axios from "axios";

interface EditUserData {
  nickname: string;
  intro: string;
  password: string;
  newPassword: string;
}

/**
 * @author : Goya Gim
 * @returns :
 */

export const editUserInfoApi = async (data: EditUserData) => {
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
