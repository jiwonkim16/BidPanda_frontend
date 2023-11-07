import axios from "axios";
import { toast } from "react-toastify";
// 상품 수정
export const auctionModifier = async (id: any, data: any) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_API_KEY}/api/items/${id}`,
      data,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Refresh: localStorage.getItem("authorization_refresh"),
        },
      }
    );
    return response;
  } catch (error: any) {
    toast.warning(error.response.data.message);
  }
};
