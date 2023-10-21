import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { enterChattingRoom } from "../../apis/chat/ChattingListApi";

const Notification = () => {
  const navigate = useNavigate();

  const checkNoti = async (e: any) => {
    const itemId = e.currentTarget.value;
    console.log(itemId);

    const res = await enterChattingRoom(itemId);
    console.log(res);

    if (res?.status === 200) {
      localStorage.setItem("record_id", res?.data.recordId);
      navigate(`/chattingRoom/${itemId}`);
    } else {
      toast.error("해당 상품이 존재하지 않습니다..");
    }
  };
  return (
    <div className="h-[100%]">
      <div>
        <div className="flex flex-col justify-center items-center">
          {/* {data?.map((item) => (
            <div
              key={item.itemId}
              onClick={}
              className="w-[370px] h-[100px] p-3 py-7 mb-2 bg-white rounded-lg shadow-md"
            >
              <div>
                <span>{item.partner}</span>
                <span className="font-bold text-lg ml-2">{item.title}</span>
              </div>
              <button>▶︎ Enter</button>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Notification;
