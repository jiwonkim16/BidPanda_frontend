import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import SockJS from "sockjs-client";
import { profileImageState } from "./../../atoms/profileImage";
import { Stomp } from "@stomp/stompjs";

interface IDecodeToken {
  nickname: string;
}

function ChattingRoom() {
  const [inputMessage, setInputMessage] = useState("");
  // const [record_id, setRecordId] = useState<string | null>("");
  const [history, setHistory] = useState<any[]>([]);
  const profileImage = useRecoilValue(profileImageState);
  const [partnersURL, setPartnersURL] = useState("");
  const [stompClient, setStompClient] = useState<any>(null);
  // jwt 디코딩
  const token: string | null = localStorage.getItem("authorization");
  const decodedToken: IDecodeToken | null = token ? jwtDecode(token) : null;
  const userNickname: string = decodedToken ? decodedToken.nickname : "";
  const record_id = localStorage.getItem("record_id");

  useEffect(() => {
    // setRecordId(recordId);
    const chatHistory = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_API_KEY
          }/api/chat/rooms/${record_id}/messages`,
          {
            headers: {
              Authorization: localStorage.getItem("authorization"),
              Authorization_Refresh: localStorage.getItem(
                "authorization_refresh"
              ),
            },
          }
        );

        setHistory(response.data);
        connectWebSocket();
      } catch (error) {
        console.log(error);
      }
    };
    chatHistory();
    return () => {
      // 컴포넌트 언마운트 시 stompClient 연결 해제
      if (stompClient) {
        stompClient.disconnect();
        localStorage.removeItem("record_id");
      }
    };
  }, []);

  // subscribe 프레임 2번째 인자......
  const getMessageCallback = (message: any) => {
    try {
      const recv = JSON.parse(message.body);
      receiveMessage(recv);
    } catch (error) {
      console.log(error);
    }
  };

  const connectWebSocket = () => {
    const socket = new SockJS(`${import.meta.env.VITE_REACT_API_KEY}/ws/chat`);
    const newStompClient = Stomp.over(() => socket);
    newStompClient.onStompError = (frame: any) => {
      console.error("웹소켓 오류:", frame);
      // 오류 처리, 예를 들어 다시 연결 시도
    };
    newStompClient.connect({}, (frame: any) => {
      console.log("연결 성공", frame);
      newStompClient.subscribe(
        `/topic/chat/room/${record_id}`,
        getMessageCallback
      );

      newStompClient.send(
        `/app/chat/message/${record_id}`,
        {},
        JSON.stringify({
          type: "ENTER",
          record_id: record_id,
          nickname: userNickname,
          profileURL: profileImage,
        })
      );

      setStompClient(newStompClient);
    });
  };

  const receiveMessage = (recv: any) => {
    setHistory((prev) => [...prev, recv]);
    console.log(recv);
    // api 수정 대기중 : 상대방 유저의 프로필 이미지를 Enter 메소드에서 넘겨받을 예정
    // if (userNickname !== recv.sender) {
    //   setPartnersURL(recv.profileURL);
    // }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.currentTarget.value);
  };

  const sendMessage = () => {
    stompClient.onStompError = (frame: any) => {
      console.error("웹소켓 오류:", frame);
    };
    stompClient.send(
      `/app/chat/message/${record_id}`,
      {},
      JSON.stringify({
        type: "TEXT",
        record_id: record_id,
        content: inputMessage,
        sender: userNickname,
      })
    );
    setInputMessage("");
  };

  return (
    <>
      <div>
        <div className="h-[619px] mt-4 mx-3 overflow-y-auto">
          {history?.map((item: any, index: number) => (
            <div key={index}>
              {item.type === "ENTER" ? (
                <div className="text-xs text-gray-400 text-center py-1">
                  {item.sender} 님이 입장했습니다.
                </div>
              ) : item.type === "TEXT" && item.sender === userNickname ? (
                <div className="text-sm flex flex-row-reverse">
                  <div className="flex flex-col items-end">
                    <div className="mb-1 font-semibold text-end">
                      {userNickname}
                    </div>
                    <div className="py-1.5 px-2 rounded-lg bg-gray-700 text-white shadow mb-2 w-fit ">
                      {item.content}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm flex flex-row">
                  <div className="flex flex-col items-start">
                    <div className="text-right mb-1 font-semibold">
                      {item.sender}
                    </div>
                    <div className="flex flex-row-reverse">
                      <div className="py-1 px-2 rounded-lg bg-gray-200 shadow mb-2 ml-2 w-fit">
                        {item.content}
                      </div>
                      <img
                        className="w-[35px] h-[35px] cursor-pointer rounded-full object-cover shadow-md"
                        src={partnersURL}
                        alt="partnersURL"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="border-t-2 border-b-none py-2 flex items-center font-semibold">
          <input
            type="text"
            id="chat"
            className="border-2 rounded-lg mx-3 w-[300px] h-[37px]"
            placeholder=" 내용을 입력하세요"
            value={inputMessage}
            onChange={onChange}
          />
          <button
            className="w-[55px] h-[35px] bg-gray-800 text-white rounded-lg"
            onClick={sendMessage}
          >
            보내기
          </button>
        </div>
      </div>
    </>
  );
}

export default ChattingRoom;
