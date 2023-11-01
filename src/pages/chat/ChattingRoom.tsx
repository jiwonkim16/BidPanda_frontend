import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useNavigate } from "react-router";

interface IDecodeToken {
  nickname: string;
}

function ChattingRoom() {
  const [inputMessage, setInputMessage] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [partnerURL, setPartnerURL] = useState("");
  const [partnerNickname, setPartnerNickname] = useState("");
  const [stompClient, setStompClient] = useState<any>(null);
  const messagesEndRef = useRef<any>(null);
  const navigate = useNavigate();
  const token: string | null = localStorage.getItem("authorization");
  const decodedToken: IDecodeToken | null = token ? jwtDecode(token) : null;
  const userNickname: string = decodedToken ? decodedToken.nickname : "";
  const record_id = localStorage.getItem("record_id");

  // 메시지가 추가될 때마다 스크롤을 아래로 이동
  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
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
        console.log(response);
        setHistory(response.data.history);
        setPartnerNickname(response.data.partnerNickname);
        setPartnerURL(response.data.partnerProfileUrl);
        connectWebSocket();
      } catch (error) {
        console.error(error);
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
      console.error(error);
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
        })
      );

      setStompClient(newStompClient);
    });
  };

  const receiveMessage = (recv: any) => {
    setHistory((prev) => [...prev, recv]);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.currentTarget.value);
  };

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        <div className="h-[619px] mt-4 mx-3 overflow-y-auto scrollbar-hide">
          <div className="flex items-center justify-center font-semibold text-xl mb-4">
            <div className="flex items-center justify-start">
              <button onClick={() => navigate(-1)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.25em"
                  viewBox="0 0 320 512"
                >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-center w-full">
              <span>{partnerNickname}</span>
            </div>
          </div>
          <hr />
          {history?.map((item: any, index: number) => (
            <div key={index} className="mt-3">
              {item.type === "ENTER" ? (
                <div className="text-xs text-black font-semibold text-center py-1">
                  {item.sender} 님이 입장했습니다.
                </div>
              ) : item.type === "TEXT" && item.sender === userNickname ? (
                <div className="text-sm flex flex-row-reverse">
                  <div className="flex flex-col items-end">
                    <div className="mb-1 font-semibold text-end">
                      {userNickname}
                    </div>
                    <div className="py-2 px-3 rounded-lg bg-[#278374] font-semibold text-white shadow mb-2 w-fit ">
                      {item.content}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm flex flex-row">
                  <div className="flex flex-col items-start mt-4">
                    <div className="text-right mb-1 font-semibold">
                      {item.sender}
                    </div>
                    <div className="flex flex-row-reverse">
                      <div className="py-2 px-4 rounded-lg bg-gray-200 font-semibold shadow mb-2 ml-2 w-fit">
                        {item.content}
                      </div>
                      <img
                        className="w-[35px] h-[35px] cursor-pointer rounded-full object-cover shadow-md"
                        src={partnerURL}
                        alt="partnersURL"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t-2 border-b-none py-2 flex items-center font-semibold">
          <form onSubmit={sendMessage}>
            <div className="flex">
              <input
                type="text"
                id="chat"
                className="border-none bg-gray-100 rounded-lg mx-3 w-[300px] h-[37px]"
                placeholder=" 내용을 입력하세요"
                value={inputMessage}
                onChange={onChange}
              />
              <button className="w-[55px] h-[35px] bg-[#278374] flex items-center justify-center rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="0.75em"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="white"
                    d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChattingRoom;
