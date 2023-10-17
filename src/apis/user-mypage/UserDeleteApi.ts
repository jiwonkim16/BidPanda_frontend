import axios from "axios";

/**
 * @author : Goya Gim
 * @returns :
 */

export const userDeleteApi = async () => {
  try {
    await axios.delete(`${import.meta.env.VITE_REACT_API_KEY}/api/members`, {
      headers: {
        Authorization: localStorage.getItem("authorization"),
        Authorization_Refresh: localStorage.getItem("authorization_refresh"),
      },
    });
  } catch (error) {
    console.error(error);
  }
};
