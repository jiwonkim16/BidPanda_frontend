import MobileLayout from "./MobileLayout";
import { useForm } from "react-hook-form";
import { LoginAPi } from "../apis/UsersApi";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formToLogin = (data: any) => {
    LoginAPi(data);
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-[759px] justify-center items-center">
        <form
          className="flex flex-col items-center font-bold"
          onSubmit={handleSubmit(formToLogin)}
        >
          <label htmlFor="username">아이디</label>
          <input
            {...register("username", { required: true })}
            type="text"
            id="username"
            className="w-[250px] h-[35px] border-2 rounded-md mt-2 mb-2"
          />
          {errors.username && <p>아이디를 입력해주세요.</p>}
          <label htmlFor="password">비밀번호</label>
          <input
            {...register("password", { required: true })}
            type="password"
            id="password"
            className="w-[250px] h-[35px] border-2 rounded-md mt-2 mb-7"
          />
          {errors.password && <p>비밀번호를 입력해주세요.</p>}
          <div>
            <button className="w-[120px] h-[40px] bg-black text-white rounded-md mt-2 mr-2 ">
              로그인
            </button>
            <button className="w-[120px] h-[40px] bg-gray-200 text-black rounded-md mt-2 ">
              <Link to={"/register"}>회원가입</Link>
            </button>
          </div>
        </form>
        <button className="w-[250px] h-[40px] bg-yellow-300 text-black rounded-md mt-2 font-bold">
          카카오 계정으로 로그인 하기
        </button>
      </div>
    </MobileLayout>
  );
};
export default Login;