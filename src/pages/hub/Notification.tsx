import { memo } from "react";
import { useQuery } from "react-query";
import { NotificationListApi } from "../../apis/user-mylists/NotificationListApi";
import { useSetRecoilState } from "recoil";
import { isReadState } from "../../atoms/isReadState";

interface notiList {
  notificationId: number;
  content: string;
  notificationType: string;
  isRead: boolean;
}

const Notification = () => {
  const setReadData = useSetRecoilState<boolean>(isReadState);
  const { data } = useQuery("notification", NotificationListApi);
  const notifications = data?.data || [];

  for (let i = 0; i < data?.data.length; i++) {
    // console.log(data?.data[i].isRead);
    if (data?.data[i].isRead === true) {
      setReadData(true);
    } else {
      setReadData(false);
    }
  }

  return (
    <div className="h-[100%]">
      <div>
        <div className="flex flex-col justify-center items-center mt-1">
          {notifications?.map((noti: notiList) => (
            <div
              key={noti.notificationId}
              className="w-[370px] h-[60px] p-2 items-center my-1 bg-gray-100 rounded-lg shadow-md"
            >
              <div className="flex flex-row justify-start items-center">
                <div className="font-semibold text-lg px-1 mr-3 bg-gray-800 text-gray-100 rounded-lg">
                  {noti.notificationType}
                </div>
                <div className="w-full flex justify-between items-center">
                  <div className="text-gray-800 font-semibold text-sm">
                    {noti.content}
                  </div>
                  {!noti.isRead ? (
                    <>
                      <div className="text-red-500 text-sm">●</div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default memo(Notification);
