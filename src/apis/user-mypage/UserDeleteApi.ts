import axios from "axios";

/**
 * @author : Goya Gim
 * @returns :
 */

export const userDeleteApi = async () => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members`,
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
