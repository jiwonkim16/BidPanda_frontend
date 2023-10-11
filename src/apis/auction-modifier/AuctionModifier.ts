import axios from "axios";

// 상품 수정
export const auctionModifier = async (id: string) => {
  const response = await axios.put(
    `${import.meta.env.VITE_REACT_API_KEY}/api/items/${id}`,
    null, // 바디가 없으니까... null 로 표시해주어야 함!!!
    {
      headers: {
        Authorization: localStorage.getItem("authorization"),
        Authorization_Refresh: localStorage.getItem("authorization_refresh"),
      },
    }
  );
  return response;
};
