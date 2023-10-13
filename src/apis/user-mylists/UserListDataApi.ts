import { toast } from "react-toastify";
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
    toast.error("잠시 후 다시 시도해주세요.");
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
    toast.error("잠시 후 다시 시도해주세요.");
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
    toast.error("잠시 후 다시 시도해주세요.");
  }
};
