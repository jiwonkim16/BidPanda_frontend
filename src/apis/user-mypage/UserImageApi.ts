import axios from "axios";

// interface profileImageType {
//   profileURL: string;
// }

/**
 * @author : Goya Gim
 * @returns :
 */

export const profileImageApi = async (data: any) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members/profile-image`,
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
