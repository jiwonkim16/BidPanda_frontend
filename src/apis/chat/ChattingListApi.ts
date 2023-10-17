import axios from "axios";

// 채팅방 조회
export const chattingListApi = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_API_KEY}/api/chat/rooms`,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Authorization_Refresh: localStorage.getItem("authorization_refresh"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 채팅방 입장
export const enterChattingRoom = async (item_id: number) => {
  console.log(item_id);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_KEY}/api/chat/room`,
      { item_id },
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
