import { memo } from "react";
import { useQuery } from "react-query";
import { NotificationListApi } from "../../apis/user-mylists/NotificationListApi";

interface notiList {
  notificationId: number;
  content: string;
  notificationType: string;
  isRead: boolean;
}

const Notification = () => {
  const { data } = useQuery("notification", NotificationListApi);
  const notifications = data?.data || [];
  console.log(data);

  return (
    <div className="h-[100%]">
      <div>
        <div className="flex flex-col justify-center items-center mt-1">
          {notifications?.map((noti: notiList) => (
            <div
              key={noti.notificationId}
              className="w-[370px] h-[60px] p-2 py-[17px] my-1 bg-white rounded-lg shadow-md"
            >
              <div className="flex flex-row justify-start items-center">
                <div className="font-semibold text-lg px-1 mr-3 bg-gray-800 text-gray-100 rounded-lg">
                  {noti.notificationType}
                </div>
                <div className="w-full flex justify-between">
                  <div className="text-gray-800 font-semibold">
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
