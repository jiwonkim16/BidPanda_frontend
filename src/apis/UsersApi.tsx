import axios from "axios";

interface FormData {
  username: string;
  password: string;
}

export const LoginAPi = async (data: FormData) => {
  try {
    const res = await axios.post("", data);
    if (res.status === 200) {
      console.log("로그인 성공");
    }
  } catch (error) {
    console.error(error);
  }
};
