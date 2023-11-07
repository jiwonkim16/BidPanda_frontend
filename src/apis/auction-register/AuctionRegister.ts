import axios from "axios";
// import { toast } from "react-toastify";

// 상품 등록
export const auctionRegister = async (data: any) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_KEY}/api/items`,
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
    console.log(error);
  }
};
