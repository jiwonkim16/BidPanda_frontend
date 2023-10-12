import axios from "axios";

// 상품 수정
export const auctionModifier = async (id: any, data: any) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_API_KEY}/api/items/${id}`,
      data,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Authorization_Refresh: localStorage.getItem("authorization_refresh"),
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
