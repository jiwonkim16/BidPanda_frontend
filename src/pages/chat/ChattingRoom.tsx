import { useEffect, useState } from "react";

function ChattingRoom() {
  const [record_id, setRecord_id] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

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

  const receiveMessage = (recv) => {
    setData(recv);
  };

  useEffect(() => {
    setRecord_id(localStorage.getItem("record_id"));
    connectWebSocket();
  }, []);

  const connectWebSocket = () => {
    sock = new SockJS("/ws/chat");
    ws = Stomp.over(sock);

    ws.connect({}, (frame) => {
      ws.subscribe(`/topic/chat/room/${record_id}`, (data) => {
        const recv = JSON.parse(data.body);
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
        <div>{/* {data.map(()=><li></li>)}*/}</div>
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
