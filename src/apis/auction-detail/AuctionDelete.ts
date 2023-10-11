import axios from "axios";

// 상품 삭제
export const auctionDelete = async (id: string) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_REACT_API_KEY}/api/items/${id}`,
    {
      headers: {
        Authorization: localStorage.getItem("authorization"),
        Authorization_Refresh: localStorage.getItem("authorization_refresh"),
      },
    }
  );
  return response;
};
