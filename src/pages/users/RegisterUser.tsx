import MobileLayout from "../../components/layouts/MobileLayout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserRegisterApi } from "../../apis/UsersApi";

const RegisterUser = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formToRegister = (data: any) => {
    UserRegisterApi(data);
    toast.success("회원가입에 성공하였습니다.");
    navigate("/login");
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-[759px] justify-center">
        <form
          className="flex flex-col items-center font-bold"
          onSubmit={handleSubmit(formToRegister)}
        >
          <label htmlFor="username">아이디</label>
          <input
            {...register("username", { required: true })}
            type="text"
            id="username"
            className="w-[250px] h-[35px] border-2 rounded-md mt-2 mb-2"
          />
          {errors.username && (
            <p className="text-sm text-red-500 mb-2">아이디를 입력해주세요.</p>
          )}
          <label htmlFor="nickname">닉네임</label>
          <input
            {...register("nickname", { required: true })}
            type="text"
            id="nickname"
            className="w-[250px] h-[35px] border-2 rounded-md mt-2 mb-2"
          />
          {errors.nickname && (
            <p className="text-sm text-red-500 mb-2">닉네임을 입력해주세요.</p>
          )}
          <label htmlFor="password">비밀번호</label>
          <input
            {...register("password", { required: true })}
            type="password"
            id="password"
            className="w-[250px] h-[35px] border-2 rounded-md mt-2 mb-2"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mb-2">
              비밀번호를 입력해주세요.
            </p>
          )}
          <label htmlFor="checkPassword">비밀번호 확인</label>
          <input
            {...register("checkPassword", { required: true })}
            type="password"
            id="checkPassword"
            className="w-[250px] h-[35px] border-2 rounded-md mt-2 mb-2"
          />
          {errors.checkPassword && (
            <p className="text-sm text-red-500 mb-2">
              비밀번호가 서로 같지 않습니다.
            </p>
          )}
          <label htmlFor="email">이메일 주소</label>
          <input
            {...register("email", { required: true })}
            type="text"
            id="email"
            className="w-[250px] h-[35px] border-2 rounded-md mt-2 mb-2"
          />
          {errors.email && (
            <p className="text-sm text-red-500">이메일 주소를 입력해주세요.</p>
          )}
          <div>
            <button className="w-[250px] h-[40px] bg-black text-white rounded-md mt-10 mr-2 ">
              회원가입
            </button>
          </div>
        </form>
      </div>
    </MobileLayout>
  );
};
export default RegisterUser;
