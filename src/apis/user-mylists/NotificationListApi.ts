import axios from "axios";

export const NotificationListApi = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_API_KEY}/api/notification`,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Authorization_Refresh: localStorage.getItem("authorization_refresh"),
        },
      }
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const checkNotificationApi = async (notificationId: number) => {
  try {
    const res = await axios.put(
      `${
        import.meta.env.VITE_REACT_API_KEY
      }/api/notification/read-notification/${notificationId}`,
      notificationId,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
        },
      }
    );
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};
