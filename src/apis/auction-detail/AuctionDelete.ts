import axios from "axios";
import { toast } from "react-toastify";
// 상품 삭제
export const auctionDelete = async (id: string) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_REACT_API_KEY}/api/items/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Refresh: localStorage.getItem("authorization_refresh"),
        },
      }
    );
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};
