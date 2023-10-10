import axios from "axios";

// 상품 등록
export const auctionRegister = async (data: any) => {
  try {
    const response = await axios.post("url", data);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
