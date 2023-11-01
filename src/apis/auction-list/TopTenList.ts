import axios from "axios";

export const getTopTenListApi = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_API_KEY}/api/items/top-price`,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Authorization_Refresh: localStorage.getItem("authorization_refresh"),
        },
      }
    );
    return res.data;
  } catch (error) {
    localStorage.removeItem("authorization");
    localStorage.removeItem("authorization_refresh");
    toast.error("다시 로그인 해주세요");
  }
};
