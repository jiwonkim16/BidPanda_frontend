import axios from "axios";
import { toast } from "react-toastify";

export const ProfileImageApi = async (data: string) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_API_KEY}/api/members/profile-image`,
      { file: data },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          withCredentials: true,
          mode: "cors",
        },
      }
    );
    toast.success("프로필 이미지가 변경 되었습니다.");
    return res;
  } catch (error) {
    toast.error("잠시 후 다시 시도해주세요.");
  }
};
