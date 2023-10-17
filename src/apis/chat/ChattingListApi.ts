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

/**
 * @author : Jiwon Kim
 * @returns
 */

// 채팅방 조회
export const chattingListApi = async () => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_REACT_API_KEY
      }/api/chat/rooms?user={seller|winner}`,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Authorization_Refresh: localStorage.getItem("authorization_refresh"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 채팅방 입장
export const enterChattingRoom = async (item_id: string) => {
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
    console.error(error);
  }
};
