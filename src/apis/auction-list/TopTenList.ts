import { toast } from "react-toastify";
import axios from "axios";

export const getTopTenListApi = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_API_KEY}/api/items/top-price`,
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
