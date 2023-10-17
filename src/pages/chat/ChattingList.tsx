import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  chattingListApi,
  enterChattingRoom,
} from "../../apis/chat/ChattingListApi";
import { toast } from "react-toastify";
import Loading from "../../components/assets/Loading";
import jwtDecode from "jwt-decode";

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
  // jwt 디코딩
  const token: string | null = localStorage.getItem("authorization");
  const decodedToken: IDecodeToken | null = token ? jwtDecode(token) : null;
  const userNickname: string = decodedToken ? decodedToken.nickname : "";

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
        <>
          <Loading />
        </>
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
