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
  const [history, setHistory] = useState<any[]>([]);
  const profileImage = useRecoilValue(profileImageState);
  const [stompClient, setStompClient] = useState<any>(null);
  // jwt 디코딩
  const token: string | null = localStorage.getItem("authorization");
  const decodedToken: IDecodeToken | null = token ? jwtDecode(token) : null;
  const userNickname: string = decodedToken ? decodedToken.nickname : "";

  // let stompClient: any;

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

  const connectWebSocket = () => {
    const socket = new SockJS(`${import.meta.env.VITE_REACT_API_KEY}/ws/chat`);
    const stompClient = Stomp.over(() => socket);
    setStompClient(stompClient);

    stompClient.connect({}, (frame: any) => {
      console.log("연결 성공", frame);
      stompClient.subscribe(`/topic/chat/room/${record_id}`, (message: any) => {
        try {
          console.log("구독 후 콜백함수 실행", message);
          const recv = JSON.parse(message.body);
          receiveMessage(recv);
        } catch (error) {
          console.log(error);
        }
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
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.currentTarget.value);
  };

  const sendMessage = () => {

    if (stompClient) {
      stompClient.send(
        `/app/chat/message`,
        {},
        JSON.stringify({
          type: "TEXT",
          record_id,
          content: inputMessage,
          sender: userNickname,
        })
      );
      setInputMessage("");
    } else {
      console.log("에러이러밍러ㅣㅁㄴ러ㅣㅇㅁ널");
    }
  };

  const receiveMessage = (recv: any) => {
    setHistory((prev) => [...prev, recv]);
  };
  return (
    <>
      <div>
        <div>

          {history?.map((item: any, index: number) => (
            <div key={index}>
              {item.type === "ENTER" ? (
                <div>{item.sender} 님이 입장하셨습니다.</div>
              ) : item.type === "TEXT" ? (
                <div>
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
