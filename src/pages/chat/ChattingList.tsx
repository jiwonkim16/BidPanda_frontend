import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  chattingListApi,
  enterChattingRoom,
} from "../../apis/chat/ChattingListApi";
import { toast } from "react-toastify";

/**
 * @author : Jiwon Kim
 * @returns : 사용자의 채팅방 목록 페이지, 채팅방 목록 조회 및 각 채팅방의 아이템 아이디를 기준으로 입장 시 recordId 저장
 */

interface IChatList {
  itemId: number;
  partner: string;
  recordId: string;
  title: string;
  partnerProfileUrl: string;
  item_image: string;
}

function ChattingList() {
  const navigate = useNavigate();

  // 리액트 쿼리 사용해서 채팅방에 대한 데이터를 fetching
  const { data } = useQuery("chattingRoom", chattingListApi);

  // 채팅방 입장 시 실행되는 함수로 해당 채팅방의 아이템 아이디를 가지고 api 요청을 보내서
  // recordId 값을 받아서 로컬 스토리지에 저장한 후 페이지 이동.
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
        {data && data.length === 0 ? (
          <div className="flex items-center justify-center h-[80vh]">
            상품을 낙찰받으시면 채팅방이 자동 생성됩니다!
          </div>
        ) : (
          data?.map((item: IChatList) => (
            <div
              key={item.itemId}
              className="w-[100%] h-[100px] p-3 flex items-center justify-between bg-white rounded-lg border-b-4 border-r-4 shadow-lg mt-3"
            >
              <img
                className="rounded-full w-[60px] h-[60px]"
                src={item.partnerProfileUrl}
              />
              <div className="flex flex-col items-start justify-center mr-[30px]">
                <div>
                  <span className="font-pretendard text-xl font-extrabold">
                    {item.partner}
                  </span>
                  <br />
                  <span className="font-pretendard text-lg font-extrabold">
                    {item.title}
                  </span>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="flex items-center justify-center rounded-full w-[60px] h-[60px] mr-2">
                  <img
                    className="object-cover rounded-full w-full h-full"
                    src={item.item_image}
                  />
                </div>
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
          ))
        )}
      </div>
    </div>
  );
}

export default ChattingList;
