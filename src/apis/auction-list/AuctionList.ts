import axios from "axios";

// 상품 리스트 조회
export const auctionList = async (pageParam: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_API_KEY}/api/items?page=${pageParam}&size=4`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 카테고리 별 상품 조회
export const auctionCategory = async (category: string, pageParam: number) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_REACT_API_KEY
    }/api/items/category/${category}?page=${pageParam}&size=4`
  );
  return response.data;
};
