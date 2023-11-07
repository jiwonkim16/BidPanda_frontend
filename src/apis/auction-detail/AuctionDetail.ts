import axios from "axios";
import { toast } from "react-toastify";

interface IBidInfo {
  bidAmount: string;
  itemId: string;
}

// 단일 상품 상세 조회
export const auctionDetail = async (id: number) => {
  const response = await axios.get(
    `${import.meta.env.VITE_REACT_API_KEY}/api/items/${id}`
  );
  return response;
};

// 입찰하기 버튼 클릭
export const bidInfo = async (data: IBidInfo) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_KEY}/api/bids`,
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
    toast.warning(error.response.data.message);
  }
};

// 찜하기 버튼 클릭
export const favoriteItem = async (itemId: any) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_KEY}/api/favorite?itemId=${itemId}`,
      null, // 바디가 없으니까... null 로 표시해주어야 함!!!
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Refresh: localStorage.getItem("authorization_refresh"),
        },
      }
    );
    return response;
  } catch (error: any) {
    toast.warning("로그인 후 이용 가능합니다.");
  }
};

// 찜하기 여부 확인
export const auctionFavorite = async (id: number) => {
  const response = await axios.get(
    `${import.meta.env.VITE_REACT_API_KEY}/api/favorite/${id}`,
    {
      headers: {
        Authorization: localStorage.getItem("authorization"),
        Refresh: localStorage.getItem("authorization_refresh"),
      },
    }
  );
  return response;
};
