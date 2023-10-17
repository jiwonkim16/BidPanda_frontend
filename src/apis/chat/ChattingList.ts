import axios from "axios";

// interface IChattingList {
//   my: {
//     nickname: string;
//   };
//   opened: {
//     title: string;
//     item_id: number;
//     partner: string;
//     record_id: string;
//   }[];
//   not_opened: {
//     title: string;
//     item_id: number;
//   }[];
// }

// /api/chat/rooms?user={seller|winner}
// 채팅방 조회
export const chattingList = async (nickname: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_API_KEY}/api/chat/rooms?user=${nickname}`,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Authorization_Refresh: localStorage.getItem("authorization_refresh"),
        },
      }
    );
    return response.data;
  } catch (error) {
    // console.log(error)
  }
};

// /api/chat/room
// 채팅방 입장
export const enterChattingRoom = async (item_id: any) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_KEY}/api/chat/room`,
      item_id,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Authorization_Refresh: localStorage.getItem("authorization_refresh"),
        },
      }
    );
    return response.data;
  } catch (error) {
    // console.log(error)
  }
};
