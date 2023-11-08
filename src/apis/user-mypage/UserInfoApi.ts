import axios from "axios";

/**
 * @author : Goya Gim
 * @returns : 프로필 이미지, 유저 정보 api.
 */

export const getUserInfoApi = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members`,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Refresh: localStorage.getItem("authorization_refresh"),
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
