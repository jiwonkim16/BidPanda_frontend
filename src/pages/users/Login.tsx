import MobileLayout from "../../components/layouts/MobileLayout";
import { LoginApi } from "../../apis/UsersApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLoginHandler = (e: any) => {
    e.preventDefault();
    LoginApi(e);
    toast.success("로그인에 성공하였습니다.");
    navigate("/");
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-[650px] mt-[50px] justify-center items-center">
        <div className="flex flex-col items-center font-bold">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button className="w-[250px] h-[40px] bg-yellow-300 text-black rounded-md mt-2 font-bold">
          카카오 계정으로 로그인 하기
        </button>
      </div>
    </MobileLayout>
  );
};
export default Login;
