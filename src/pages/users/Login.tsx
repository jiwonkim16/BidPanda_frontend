import {
  LoginApi,
  KakaoLoginApi,
  KakaoLoginCode,
} from "../../apis/user-login/UserLoginApi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../../atoms/isLoggedIn";
import { toast } from "react-toastify";

/**
 * @author : Goya Gim
 * @returns : React Hook Form을 사용하지 않은 단순한 State - Event Handler 구조.
 *            로그인 기능 구현.
 */

const Login = () => {
  const [membername, setMembername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const navigate = useNavigate();

  useEffect(() => {
    const isToken = localStorage.getItem("authorization");
    if (isToken) {
      toast.error("이미 로그인 된 유저입니다.");
      navigate("/");
    }
  }, []);

  const onLoginHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await LoginApi({ membername, password });
    const accessToken = res?.headers.authorization;
    const refreshToken = res?.headers.authorization_refresh;

    if (res?.status === 200) {
      localStorage.setItem("authorization", accessToken);
      localStorage.setItem("authorization_refresh", refreshToken);
      setIsLoggedIn(true);
      navigate("/");
    }
  };

  const kakaoLoginHandler = async () => {
    const REST_API_KEY = "e852feeb69305f69f3f15d58bf03437d";
    const REDIRECT_URI = "http://localhost:5173/kakao";
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoURL;

    const waitForKakaoAuth = () =>
      new Promise<KakaoLoginCode>((resolve) => {
        const checkForCode = () => {
          const kakaoAuthCode = new URLSearchParams(window.location.search).get(
            "code"
          );
          if (kakaoAuthCode) {
            resolve({ kakaoAuthCode });
          } else {
            setTimeout(checkForCode, 1000); // 매 초마다 `code` 확인
          }
        };
        checkForCode();
      });

    const kakaoLoginCode: KakaoLoginCode = await waitForKakaoAuth();
    const kakaoAuthCode = kakaoLoginCode.kakaoAuthCode;
    console.log(kakaoAuthCode);
    const res = await KakaoLoginApi({ kakaoAuthCode });
    if (res?.status === 200) {
      setIsLoggedIn(true);
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col h-[78vh] justify-center items-center">
      <div className="flex flex-col items-center font-bold">
        <label htmlFor="username">아이디</label>
        <input
          type="text"
          id="username"
          value={membername}
          onChange={(e) => setMembername(e.target.value)}
          className="w-[250px] h-[35px] border-2 rounded-md mt-2 mb-2"
        />

        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[250px] h-[35px] border-2 rounded-md mt-2 mb-7"
        />
        <div>
          <button
            onClick={onLoginHandler}
            className="w-[120px] h-[40px] bg-black text-white rounded-md mt-2 mr-2 "
          >
            로그인
          </button>
          <button className="w-[120px] h-[40px] bg-gray-200 text-black rounded-md mt-2 ">
            <Link to={"/register"}>회원가입</Link>
          </button>
        </div>
      </div>
      <button
        onClick={kakaoLoginHandler}
        className="w-[250px] h-[40px] bg-yellow-300 text-black rounded-md mt-2 font-bold"
      >
        카카오 계정으로 로그인 하기
      </button>
    </div>
  );
};
export default Login;
