import axios from "axios";

/**
 * @author : Goya Gim
 * @returns : 프로필 이미지 변경 api.
 */

export const profileImageApi = async (data: any) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members/profile-image`,
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
