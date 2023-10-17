import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { chattingList, enterChattingRoom } from "../../apis/chat/ChattingList";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

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
interface IDecodeToken {
  nickname: string;
}

function ChattingList() {
  // jwt 디코딩
  const token: string | null = localStorage.getItem("authorization");
  const decodedToken: IDecodeToken | null = token ? jwtDecode(token) : null;
  const userNickname: string = decodedToken ? decodedToken.nickname : "";

  const navigate = useNavigate();

  const { data, isLoading } = useQuery("chattingRoom", () =>
    chattingList(userNickname)
  );
  const item_id = data.not_opened.item_id;

  // 채팅방 입장
  const enterChat = async () => {
    const response = await enterChattingRoom(item_id);
    if (response === 200) {
      localStorage.setItem("record_id", response.record_id);
      toast.success("채팅방 입장");
      navigate(`/chattingRoom/${item_id}`);
    }
  };
  return (
    <div>
      {isLoading ? (
        <div>Loading.....</div>
      ) : (
        <>
          <div>
            <h3>채팅방 리스트</h3>
          </div>
          <div>
            {/* 1. 진행 중인 채팅방 : 아이템 title, 파트너
        2. 비활 채팅방 : 아이템 title, 파트너(파트너가 없음..ㅠ) */}
            {/* 활성 / 비활성 따로 배열을 map으로.. */}

            <div onClick={enterChat}>
              <div>{data?.opened[0].title}</div>
              <div>{data?.opened[0].partner}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ChattingList;
