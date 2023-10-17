import axios from "axios";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import * as Stomp from "stompjs";

/**
 * @author : Jiwon Kim, Goya Gim
 * @returns :
 */

function ChattingRoom() {
  const [record_id, setRecord_id] = useState("");
  const [message, setMessage] = useState("");
  const [receive, setRecive] = useState([]);

  let sock;
  let ws: any;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.currentTarget.value);
  };

  const sendMessage = () => {
    ws.send(
      "/app/chat/message",
      {},
      JSON.stringify({ type: "TEXT", record_id, message })
    );
    setMessage("");
  };

  const receiveMessage = (recv: any) => {
    setRecive(recv);
  };

  useEffect(() => {
    setRecord_id(localStorage.getItem("record_id") || "");
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
        connectWebSocket();
      } catch (error) {
        console.log(error);
      }
    };
    chatHistory();
  }, []);

  const connectWebSocket = () => {
    sock = new SockJS("/ws/chat");
    ws = Stomp.over(sock);

    ws.connect({}, () => {
      ws.subscribe(`/topic/chat/room/${record_id}`, (message: any) => {
        console.log("구독 후 콜백함수 실행", message);
        const recv = JSON.parse(message.body);
        receiveMessage(recv);
      });

      ws.send(
        `/app/chat/message`,
        {},
        JSON.stringify({ type: "ENTER", record_id, message })
      );
    });
  };
  return (
    <>
      <div>
        {/* 말풍선 */}
        <div>{/* {receive.map(()=><li></li>)} 받은 메세지*/}</div>
        <div>{/* 내가 보낸 메세지*/}</div>
        <div>
          <input
            type="text"
            placeholder="내용을 입력하세요"
            value={message}
            onChange={onChange}
          />
          <button onClick={sendMessage}>보내기</button>
        </div>
      </div>
    </>
  );
}

export default ChattingRoom;
