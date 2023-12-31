import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useNavigate } from "react-router";

/**
 * @author : Jiwon Kim
 * @returns : 채팅애플리케이션 기능 구현 / StompJS 및 Sock.js 활용 실시간 채팅기능 구현, 이전 채팅기록은 HTTP프로토콜을
 * 사용했으며, 그 외 채팅과 관련된 기능은 webSocket 프로토콜 사용
 */

interface IDecodeToken {
  nickname: string;
}

function ChattingRoom() {
  // 사용자가 입력하는 메세지, 채팅기록, 프로필 정보(닉네임, 이미지), WebSocket 연결 객체를 관리하기 위한 state 생성
  const [inputMessage, setInputMessage] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [partnerURL, setPartnerURL] = useState("");
  const [partnerNickname, setPartnerNickname] = useState("");
  const [stompClient, setStompClient] = useState<any>(null);

  // 채팅방에 message가 추가될 때마다 스크롤을 아래로 이동하게끔 구현하기 위해 ref 설정
  const messagesEndRef = useRef<any>(null);
  const navigate = useNavigate();

  // JWT 토큰에 닉네임 정보 추출
  const token: string | null = localStorage.getItem("authorization");
  const decodedToken: IDecodeToken | null = token ? jwtDecode(token) : null;
  const userNickname: string = decodedToken ? decodedToken.nickname : "";

  // 로컬 스토리지에서 채팅방을 식별하기 위한 record_id 추출
  const record_id = localStorage.getItem("record_id");

  // 메시지가 추가될 때마다 스크롤을 아래로 이동
  useEffect(() => {
    scrollToBottom();
  }, [history]);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // 컴포넌트가 마운트 될 때 채팅기록을 가져오는 함수를 호출하고 WebSocket 연결을 초기화.
  // 컴포넌트가 언마운트 될 때에는 WebSocket 연결을 해제하고 record_id를 로컬스토리지에서 제거.
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
              Refresh: localStorage.getItem("authorization_refresh"),
            },
          }
        );
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
      if (stompClient) {
        stompClient.disconnect();
        localStorage.removeItem("record_id");
      }
    };
  }, []);

  // WebSocket에서 메세지를 받아와서 채팅 기록을 업데이트 하며, 받아온 메세지의 body를 receive함수를 통해
  // history에 기존 채팅 기록에 추가
  const getMessageCallback = (message: any) => {
    try {
      const recv = JSON.parse(message.body);
      receiveMessage(recv);
    } catch (error) {
      console.error(error);
    }
  };
  const receiveMessage = (recv: any) => {
    setHistory((prev) => [...prev, recv]);
  };

  // WebSocket 연결을 초기화 하고 채팅방에 참여하거나 메시지를 보내는 등의 동작을 수행
  const connectWebSocket = () => {
    // sock.js 객체를 생성하고 이를 통해 서버와의 WebSocket 연결을 설정
    const socket = new SockJS(`${import.meta.env.VITE_REACT_API_KEY}/ws/chat`);

    // Stomp 라이브러리를 사용해서 WebSocket 연결을 관리하며, 이때 stomp는 WebSocket 위에서 동작하는
    // 메시지 전달 프로토콜임.
    const newStompClient = Stomp.over(() => socket);

    // WebSocket 연결에서 오류가 발생하면 콘솔에 오류 메시지를 출력하도록 설정
    newStompClient.onStompError = (frame: any) => {
      console.error("웹소켓 오류:", frame);
    };

    // WebSocket 연결을 시작. 연결이 성공적으로 이루어지면 특정 uri를 구독하며, enter 타입의 메시지를 서버에 전송.
    // 즉 구독 및 send 관련 로직
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

      // stompClient 상태를 업데이트하며, 이후 메시지 전송 등에서 사용할 수 있게 함
      setStompClient(newStompClient);
    });
  };

  // 메시지 입력 필드의 값을 state에 업데이트
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.currentTarget.value);
  };

  // 사용자가 입력한 메시지를 WebSocket을 통해 서버로 전송하며, 이후 입력 필드 초기화
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
                    <div className="py-2 px-3 rounded-lg bg-[#278374] font-pretendard text-md font-extrabold text-white shadow mb-2 w-fit ">
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
                      <div className="py-2 px-4 rounded-lg bg-gray-200 font-pretendard text-md font-extrabold shadow mb-2 ml-2 w-fit">
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
                className="font-pretendard text-lg font-extrabold border-none bg-gray-100 rounded-lg mx-3 w-[300px] h-[37px]"
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
