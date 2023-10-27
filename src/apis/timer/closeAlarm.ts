import axios from "axios";
// 상품 수정
export const closeAlarm = async (itemId: any) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_API_KEY}/api/items/${itemId}/close-alarm`,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Authorization_Refresh: localStorage.getItem("authorization_refresh"),
        },
      }
    );
    return response;
  } catch (error: any) {
    console.log(error);
  }
};
