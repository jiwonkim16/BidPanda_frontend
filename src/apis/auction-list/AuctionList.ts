import axios from "axios";

// 상품 전체 리스트 조회
export const auctionList = async (pageParam: number, order: string | null) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_REACT_API_KEY
      }/api/items/public-search?auctionIng=true&order=${order}&page=${pageParam}&size=6`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 카테고리 별 상품 조회
export const auctionCategory = async (
  category: string,
  pageParam: number,
  order: string | null
) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_REACT_API_KEY
    }/api/items/public-search?auctionIng=true&category=${category}&order=${order}&page=${pageParam}&size=6`
  );
  return response.data;
};
