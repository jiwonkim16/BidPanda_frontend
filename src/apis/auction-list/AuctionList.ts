import axios from "axios";

// 상품 리스트 조회
export const auctionList = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_REACT_API_KEY}/api/items?page=1&size=20`
  );
  return response.data;
};

// 카테고리 별 상품 조회
export const auctionCategory = async (category: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_REACT_API_KEY}/api/items/category/${category}`
  );
  return response.data;
};
