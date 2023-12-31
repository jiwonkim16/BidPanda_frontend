import { memo, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { isReadState } from "../../atoms/isReadState";
import { useQuery, useMutation } from "react-query";
import {
  NotificationListApi,
  checkNotificationApi,
} from "../../apis/user-mylists/NotificationListApi";

interface notiList {
  notificationId: number;
  content: string;
  notificationType: string;
  isRead: boolean;
  url: string;
}

/**
 * @author : Goya Gim
 * @returns : 알림 리스트, 개별적 알림 읽음 체크 기능, 모든 알림 확인 시 Nav의 알림 아이콘 점멸 기능 구현
 */

const Notification = () => {
  const [, setIsRead] = useRecoilState<boolean>(isReadState);
  const { data } = useQuery("notification", NotificationListApi);
  const notifications = data?.data || [];

  useEffect(() => {
    setIsRead(false);
  }, []);

  /**
   * @includes : RQ의 useMutation을 사용하여 useQuery로 받아온 데이터의 수정 사항을 적용.
   *             checkNotificationApi로 읽음 상태를 수정하는 통신을 마치고, notification이라는 query key
   *             의 데이터를 map()으로 돌려서, 해당 알림 데이터의 ID에 해당하는 값만 필요한 데이터를 수정하고 있다.
   */

  const markAsRead = useMutation((notificationId: number) => {
    const editData = async (notificationId: number) => {
      try {
        await checkNotificationApi(notificationId);
        const updatedNotifications = notifications.map((noti: any) => {
          if (noti.notificationId === notificationId) {
            return { ...noti, isRead: true };
          }
          return noti;
        });
        const hasUnreadNotifications = updatedNotifications.some(
          (noti: any) => !noti.isRead
        );
        if (hasUnreadNotifications === true) {
          setIsRead(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    return editData(notificationId);
  });

  const checkNotiHandler = (notificationId: number) => {
    markAsRead.mutate(notificationId);
  };

  return (
    <div className="h-[100%]">
      <div style={{ fontFamily: "pretendard-bold" }}>
        <div className="flex flex-col justify-center items-center mt-1">
          {notifications
            .sort((a: any, b: any) => b.timestamp - a.timestamp)
            .map((noti: notiList) => (
              <div
                key={noti.notificationId}
                onClick={() => checkNotiHandler(noti.notificationId)}
                className="w-[370px] h-[60px] p-2 items-center my-1 bg-gray-50 rounded-lg shadow font-bold text-gray-800"
              >
                <div className="flex flex-row justify-start items-center">
                  <div className=" px-1 mr-3 bg-[#278374] text-white rounded-lg">
                    {noti.notificationType}
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <Link to={noti.url}>
                      <div className="text-gray-800 text-sm">
                        {noti.content}
                      </div>
                    </Link>
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
