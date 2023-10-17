import axios from "axios";

/**
 * @author : Goya Gim
 * @returns :
 */

export const getLikedListApi = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_API_KEY}/api/favorite/items`,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Authorization_Refresh: localStorage.getItem("authorization_refresh"),
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getBidListApi = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_API_KEY}/api/bids`,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Authorization_Refresh: localStorage.getItem("authorization_refresh"),
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPostedListApi = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_API_KEY}/api/items/my-items`,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Authorization_Refresh: localStorage.getItem("authorization_refresh"),
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
