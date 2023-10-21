import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  chattingListApi,
  enterChattingRoom,
} from "../../apis/chat/ChattingListApi";
import { toast } from "react-toastify";

interface IChatList {
  itemId: number;
  partner: string;
  recordId: string;
  title: string;
}

/**
 * @author : Jiwon Kim, Goya Gim
 * @returns :
 */

function ChattingList() {
  const navigate = useNavigate();
  const { data } = useQuery("chattingRoom", chattingListApi);

  // 채팅방 입장
  const enterChat = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const itemId = Number(event.currentTarget.value);
    const response = await enterChattingRoom(itemId);

    if (response?.status === 200) {
      localStorage.setItem("record_id", response?.data.recordId);
      toast.success("채팅방 입장");
      navigate(`/chattingRoom/${itemId}`);
    } else {
      toast.error("해당 상품이 존재하지 않습니다..");
    }
  };
  return (
    <div className="h-[100%]">
      <div>
        <div className="flex flex-col justify-center items-center">
          {data?.map((item: IChatList) => (
            <div
              key={item.itemId}
              className="w-[370px] h-[100px] p-3 py-7 mb-2 bg-white rounded-lg shadow-md"
            >
              <div>
                <span>{item.partner}</span>
                <span className="font-bold text-lg ml-2">{item.title}</span>
              </div>
              <button onClick={enterChat} value={item.itemId}>
                ▶︎ Enter
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChattingList;
