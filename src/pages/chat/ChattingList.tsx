import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { chattingList, enterChattingRoom } from "../../apis/chat/ChattingList";
import { toast } from "react-toastify";

interface IChatList {
  itemId: number;
  partner: string;
  recordId: string;
  title: string;
}

function ChattingList() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery("chattingRoom", chattingList);
  console.log(data);

  // 채팅방 입장
  const enterChat = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const itemId = Number(event.currentTarget.value);
    console.log(itemId);

    const response = await enterChattingRoom(itemId);
    console.log(response);

    if (response?.status === 200) {
      localStorage.setItem("record_id", response?.data.recordId);
      toast.success("채팅방 입장");
      navigate(`/chattingRoom/${itemId}`);
    } else {
      toast.error("해당 상품이 존재하지 않습니다..");
    }
  };
  return (
    <>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div className="h-[100%]">
          <div>
            <h3>채팅방 리스트</h3>
          </div>
          <div>
            <div>
              {data?.map((item: IChatList) => (
                <div key={item.itemId}>
                  <span>{item.title}</span>
                  <span>{item.partner}</span>
                  <button onClick={enterChat} value={item.itemId}>
                    입장하기
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChattingList;
