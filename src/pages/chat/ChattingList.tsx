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
  partnerProfileUrl: string;
  item_image: string;
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
        <div>
          {data?.map((item: IChatList) => (
            <div className="flex justify-center items-center">
              <div className="rounded-full w-[50px] h-[50px]">
                <img src={item.partnerProfileUrl} />
              </div>
              <div
                key={item.itemId}
                className="w-[370px] h-[100px] mt-2 p-3 py-7 mb-2 bg-white rounded-lg shadow"
              >
                <div>
                  <span>{item.partner}</span>
                  <span className="font-bold text-lg ml-2">{item.title}</span>
                </div>
                <button onClick={enterChat} value={item.itemId}>
                  ▶︎ Enter
                </button>
              </div>
              <div>
                <img src={item.item_image} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChattingList;
