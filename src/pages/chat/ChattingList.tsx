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
        {data?.map((item: IChatList) => (
          <div
            key={item.itemId}
            className="w-[100%] h-[100px] p-3 flex items-center justify-between bg-white rounded-lg border-b-4 border-r-4 shadow-lg mt-3"
          >
            <img
              className="rounded-full w-[60px] h-[60px] mr-[20px]"
              src={item.partnerProfileUrl}
            />
            <div className="flex flex-col items-start justify-center mr-[100px]">
              <div>
                <span className="font-bold text-2xl">{item.partner}</span>
                <br />
                <span className="font-bold text-lg">{item.title}</span>
              </div>
            </div>
            <div className="flex justify-end m-auto">
              <img
                className="rounded-xl w-[70px] h-[60px] mr-[15px]"
                src={item.item_image}
              />
              <button onClick={enterChat} value={item.itemId}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.5em"
                  viewBox="0 0 512 512"
                >
                  <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChattingList;
