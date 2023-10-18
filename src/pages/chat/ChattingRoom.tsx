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
  const [record_id, setRecordId] = useState<string | null>("");
  const [receive, setRecive] = useState([]);
  const [history, setHistory] = useState();
  const profileImage = useRecoilValue(profileImageState);

  // jwt 디코딩
  const token: string | null = localStorage.getItem("authorization");
  const decodedToken: IDecodeToken | null = token ? jwtDecode(token) : null;
  const userNickname: string = decodedToken ? decodedToken.nickname : "";

  let stompClient: any;

  useEffect(() => {
    const recordId = localStorage.getItem("record_id");
    setRecordId(recordId);
    const chatHistory = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_API_KEY
          }/api/chat/rooms/${recordId}/messages`,
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
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.currentTarget.value);
  };

  const sendMessage = () => {
    stompClient?.send(
      "/app/chat/message",
      {},
      JSON.stringify({ type: "TEXT", record_id, content: inputMessage })
    );
    setInputMessage("");
  };

  const receiveMessage = (recv: any) => {
    setRecive(recv);
  };

  const connectWebSocket = () => {
    const socket = new SockJS(`${import.meta.env.VITE_REACT_API_KEY}/ws/chat`);
    stompClient = Stomp.over(() => socket);

    stompClient.connect({}, (frame: any) => {
      console.log("연결 성공", frame);
      stompClient.subscribe(`/topic/chat/room/${record_id}`, (message: any) => {
        console.log("구독 후 콜백함수 실행", message);
        const recv = JSON.parse(message.body);
        receiveMessage(recv);
      });

      stompClient.send(
        `/app/chat/message`,
        {},
        JSON.stringify({
          type: "ENTER",
          record_id,
          nickname: userNickname,
          profileURL: profileImage,
        })
      );
    });
  };
  return (
    <>
      <div>
        {/* <div>과거 채팅 기록</div> */}
        {receive}
        <div>
          {receive.map((item) => (
            <li>{item}</li>
          ))}
        </div>
        <div>{/* 내가 보낸 메세지*/}</div>
        <div>
          <input
            type="text"
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
