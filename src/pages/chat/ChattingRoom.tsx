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
  const [stompClient, setStompClient] = useState<any>(null);
  // jwt 디코딩
  const token: string | null = localStorage.getItem("authorization");
  const decodedToken: IDecodeToken | null = token ? jwtDecode(token) : null;
  const userNickname: string = decodedToken ? decodedToken.nickname : "";
  const record_id = localStorage.getItem("record_id");

  useEffect(() => {
    console.log("렌더렌더렌더");
    // setRecordId(recordId);
    const chatHistory = async () => {
      try {
        console.log("데이터 불러오기!!");
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
        console.log("에러러러러러");
      }
    };
    chatHistory();
    return () => {
      // 컴포넌트 언마운트 시 stompClient 연결 해제
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  // subscribe 프레임 2번째 인자......
  const getMessageCallback = (message: any) => {
    try {
      console.log("구독 후 콜백함수 실행", message);
      const recv = JSON.parse(message.body);
      console.log("recv", recv);
      receiveMessage(recv);
    } catch (error) {
      console.log(error);
    }
  };

  const connectWebSocket = () => {
    const socket = new SockJS(`${import.meta.env.VITE_REACT_API_KEY}/ws/chat`);
    const newStompClient = Stomp.over(() => socket);
    console.log(newStompClient);
    newStompClient.onStompError = (frame: any) => {
      console.error("웹소켓 오류:", frame);
      // 오류 처리, 예를 들어 다시 연결 시도
    };
    newStompClient.connect({}, (frame: any) => {
      console.log("연결 성공", frame);
      console.log(record_id);
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
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.currentTarget.value);
  };

  const sendMessage = () => {
    stompClient.onStompError = (frame: any) => {
      console.error("웹소켓 오류:", frame);
      // 오류 처리, 예를 들어 다시 연결 시도
    };
    console.log("레코드 아이디", record_id);
    console.log("스톰프프", stompClient);
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
        <div>
          {history?.map((item: any, index: number) => (
            <div key={index}>
              {item.type === "ENTER" ? (
                <div className="text-xs">{item.sender} 님이 입장했습니다.</div>
              ) : item.type === "TEXT" ? (
                <div className="text-xs">
                  <strong>You:</strong> {item.content}
                </div>
              ) : (
                <div>
                  <strong>{item.sender}:</strong> {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
        <div>{inputMessage}</div>
        <div>
          <input
            type="text"
            id="chat"
            placeholder="내용을 입력하세요"
            value={inputMessage}
            onChange={onChange}
          />
          <button onClick={sendMessage}>보내기</button>
        </div>
      </div>
    </>
  );
}

export default ChattingRoom;
