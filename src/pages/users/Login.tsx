import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApi } from "../../apis/user-log/UserLoginApi";

/**
 * @author : Goya Gim
 * @returns : React Hook Form을 사용하지 않은 단순한 State - Event Handler 구조.
 *            로그인 기능 구현.
 */

const Login = () => {
  const [membername, setMembername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isToken = localStorage.getItem("authorization");
    if (isToken) {
      toast.error("이미 로그인 된 유저입니다.");
      navigate("/");
    }
  }, []);

  /**
   * @includes : 로그인, 카카오 소셜 로그인 기능
   */

  const onLoginHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await loginApi({ membername, password });
    const accessToken = res?.headers.authorization;
    const refreshToken = res?.headers.authorization_refresh;

    if (res?.status === 200) {
      localStorage.setItem("authorization", accessToken);
      localStorage.setItem("authorization_refresh", refreshToken);
      toast.success("로그인에 성공하였습니다.");
      window.location.href = "/";
    } else {
      toast.error("로그인에 실패했습니다.");
    }
  };

  const kakaoLogin: () => void = () => {
    const REST_API_KEY = "fbc4abc5fd980187c0270233cea954bc";
    const REDIRECT_URI = "https://bidpanda.app/kakao";
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoURL;
  };

  return (
    <div
      style={{ fontFamily: "Pretendard-Bold" }}
      className="flex flex-col h-[78vh] justify-center items-center font-bold"
    >
      <div className="flex flex-col items-center text-md font-bold">
        <label htmlFor="username">아이디</label>
        <input
          type="text"
          id="username"
          value={membername}
          onChange={(e) => setMembername(e.target.value)}
          className="w-[250px] h-[35px] border-gray-400 border-[1.5px] rounded-lg mt-1 mb-3"
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[250px] h-[35px] border-gray-400 border-[1.5px] rounded-lg mt-1 mb-8"
        />
        <div>
          <button
            onClick={onLoginHandler}
            className="w-[120px] h-[40px] bg-[#278374] text-white rounded-lg mr-2.5 "
          >
            로그인
          </button>
          <button className="w-[120px] h-[40px] bg-gray-100 border-gray-400 border-[1.5px] text-gray-800 rounded-lg ">
            <Link to={"/register"}>회원가입</Link>
          </button>
        </div>
      </div>
      <button
        onClick={kakaoLogin}
        className="w-[250px] h-[40px] flex items-center justify-center bg-yellow-300 text-gray-800 text-md rounded-lg mt-3"
      >
        <img
          src="/kakaoLogin.png"
          alt="kakaoLogo"
          className="w-[33px] h-[33px]"
        />
        <span>카카오 계정으로 로그인</span>
      </button>
    </div>
  );
};
export default Login;
