import axios from "axios";
import { toast } from "react-toastify";

// 검색결과 조회
export const searchAuction = async (keyword: string) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_REACT_API_KEY
      }/api/items/public-search?keyword=${keyword}&size=100`
    );

    return response.data;
  } catch (error: any) {
    toast.warning(error.response.data.message);
  }
};
