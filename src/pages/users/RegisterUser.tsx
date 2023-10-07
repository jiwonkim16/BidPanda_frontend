import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserRegisterApi, CheckValidateCodeApi } from "../../apis/UsersApi";
import { ReactNode, useState } from "react";

const RegisterUser = () => {
  const [isValidEmailSent, setIsValidEmailSent] = useState(false);
  const [validateCode, setValidateCode] = useState("");
  const navigate = useNavigate();

  const onValidEmailHandler = async (data: any) => {
    try {
      await CheckValidateCodeApi(data);
      setIsValidEmailSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const formToRegister = async (data: any) => {
    try {
      await UserRegisterApi(data);
      toast.success("회원가입에 성공하였습니다.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("회원가입에 실패하였습니다.");
    }
  };

  return (
    <div className="flex flex-col h-[650px] mt-[50px] justify-center">
      <form
        className="flex flex-col items-center font-bold"
        onSubmit={handleSubmit(formToRegister)}
      >
        <label htmlFor="username">아이디</label>
        <div>
          <input
            {...register("username", {
              required: true,
              minLength: 1,
              pattern: {
                value: /^(?=.*\d)[A-Za-z\d]{4,}$/,
                message:
                  "아이디는 4글자 이상이며, 숫자를 하나 이상 포함한 영문입니다.",
              },
            })}
            type="text"
            id="username"
            className="w-[215px] h-[35px] border-2 rounded-md mt-2 mb-2"
          />
          <button className="bg-gray-100 w-[35px] h-[35px] rounded-md">
            ✔︎
          </button>
        </div>
        {errors.username && (
          <p className="text-sm w-[250px] text-red-500 mb-2">
            {errors.username.message as ReactNode}
          </p>
        )}
        <label htmlFor="nickname">닉네임</label>
        <div>
          <input
            {...register("nickname", {
              required: true,
              minLength: 1,
              pattern: {
                value: /^[A-za-z0-9가-힣]{1,10}$/,
                message: "닉네임은 10자 이하으로 만들어 주세요.",
              },
            })}
            type="text"
            id="nickname"
            className="w-[215px] h-[35px] border-2 rounded-md mt-2 mb-2"
          />
          <button className="bg-gray-100 w-[35px] h-[35px] rounded-md">
            ✔︎
          </button>
        </div>
        {errors.nickname && (
          <p className="text-sm w-[250px] text-red-500 mb-2">
            {errors.nickname.message as ReactNode}
          </p>
        )}
        {!isValidEmailSent ? (
          <>
            <label htmlFor="email">이메일 주소</label>
            <div>
              <input
                {...register("email", {
                  required: true,
                  minLength: 1,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "올바른 형식의 이메일 주소를 사용해주세요.",
                  },
                })}
                type="text"
                id="email"
                className="w-[215px] h-[35px] border-2 rounded-md mt-2 mb-2"
              />
              <button
                onClick={() => onValidEmailHandler}
                className="bg-gray-100 w-[35px] h-[35px] rounded-md"
              >
                ✔︎
              </button>
            </div>
          </>
        ) : (
          <>
            <label htmlFor="email">이메일 인증코드</label>
            <div>
              <input
                value={validateCode}
                onChange={() => setValidateCode}
                type="text"
                id="code"
                className="w-[215px] h-[35px] border-2 rounded-md mt-2 mb-2"
              />
              <button className="bg-green-400 w-[35px] h-[35px] rounded-md">
                ✔︎
              </button>
            </div>
          </>
        )}

        {errors.email && (
          <p className="text-sm w-[250px] text-red-500">
            {errors.email.message as ReactNode}
          </p>
        )}
        <label htmlFor="password">비밀번호</label>
        <input
          {...register("password", {
            required: true,
            minLength: 1,
            pattern: {
              value: /^(?=.*[A-Z]).{6,}$/,
              message: `비밀번호는 6글자 이상이며, 영문 대문자 1개를 꼭 포함 합니다.`,
            },
          })}
          type="password"
          id="password"
          className="w-[250px] h-[35px] border-2 rounded-md mt-2 mb-2"
        />
        {errors.password && (
          <p className="text-sm w-[250px] text-red-500 mb-2">
            {errors.password.message as ReactNode}
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
          <p className="text-sm w-[250px] text-red-500 mb-2">
            비밀번호가 서로 같지 않습니다.
          </p>
        )}

        <div>
          {!isValidEmailSent ? (
            <></>
          ) : (
            <>
              <button className="w-[250px] h-[40px] bg-green-500 text-white rounded-md mt-10 mr-2 ">
                회원가입
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
export default RegisterUser;
