import {
  UserRegisterApi,
  CheckValidateCodeApi,
  CheckUsernameApi,
  CheckNicknameApi,
} from "../../apis/UsersApi";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * @author : Goya Gim
 * @returns : React Hook Form을 사용하여 formData를 Post.
 *            아이디, 닉네임의 중복확인 기능과, 이메일 인증코드 인증 기능 구현.
 */

const RegisterUser = () => {
  const [isUsernameCheck, setIsUsernameCheck] = useState(false);
  const [isNicknameCheck, setIsNicknameCheck] = useState(false);
  const [isValidEmailSent, setIsValidEmailSent] = useState(false);
  const [isValCodeSent, setIsValCodeSent] = useState(false);
  const [validateCode, setValidateCode] = useState("");
  const navigate = useNavigate();

  /**
   * @includes : 중복 확인을 위한 이벤트 핸들러들의 모음
   */

  const checkUsernameHandler = async (data: any) => {
    await CheckUsernameApi(data.membername);
    setIsUsernameCheck(true);
  };
  const checkNicknameHandler = async (data: any) => {
    await CheckNicknameApi(data.nickname);
    setIsNicknameCheck(true);
  };
  const onValidEmailHandler = async (data: any) => {
    await CheckValidateCodeApi(data);
    setIsValidEmailSent(true);
  };
  const onValCodeHandler = async (e: any) => {
    e.preventDefault();
    await CheckValidateCodeApi(e.target.value);
    setIsValCodeSent(true);
  };

  /**
   * @includes : Hook Form 사용을 위한 useForm 선언과 서브밋 핸들러.
   */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const formToRegister = async (data: any) => {
    const password = data.password;
    const checkPassword = data.checkPassword;
    if (password !== checkPassword) {
      toast.error("비밀번호가 서로 다릅니다.");
      return;
    }
    await UserRegisterApi(data);
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-[650px] justify-center">
      <form
        className="flex flex-col items-center font-bold"
        onSubmit={handleSubmit(formToRegister)}
      >
        <label htmlFor="membername">아이디</label>
        <div>
          <input
            {...register("membername", {
              required: true,
              minLength: 1,
              pattern: {
                value: /^(?=.*\d)[A-Za-z\d]{4,}$/,
                message:
                  "아이디는 4글자 이상이며, 숫자를 하나 이상 포함한 영문입니다.",
              },
            })}
            type="text"
            id="membername"
            className="w-[215px] h-[35px] border-2 rounded-md mt-2 mb-2"
          />
          {!isUsernameCheck ? (
            <button
              onClick={checkUsernameHandler}
              className="bg-gray-100 w-[35px] h-[35px] rounded-md"
            >
              ✔︎
            </button>
          ) : (
            <button className="bg-green-400 w-[35px] h-[35px] rounded-md">
              ✔︎
            </button>
          )}
        </div>
        {errors.membername && (
          <p className="text-sm w-[250px] text-red-500 mb-2">
            {errors.membername.message as ReactNode}
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
          {!isNicknameCheck ? (
            <button
              onClick={checkNicknameHandler}
              className="bg-gray-100 w-[35px] h-[35px] rounded-md"
            >
              ✔︎
            </button>
          ) : (
            <button className="bg-green-400 w-[35px] h-[35px] rounded-md">
              ✔︎
            </button>
          )}
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
                onClick={onValidEmailHandler}
                className="bg-gray-100 w-[35px] h-[35px] rounded-md"
              >
                ✔︎
              </button>
            </div>
          </>
        ) : (
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
              <button className="bg-green-400 w-[35px] h-[35px] rounded-md">
                ✔︎
              </button>
            </div>
            <label htmlFor="email">이메일 인증코드</label>
            <div>
              <input
                value={validateCode}
                onChange={(e) => setValidateCode(e.target.value)}
                type="text"
                id="code"
                className="w-[215px] h-[35px] border-2 rounded-md mt-2 mb-2"
              />
              {!isValCodeSent ? (
                <button
                  onClick={onValCodeHandler}
                  className="bg-gray-100 w-[35px] h-[35px] rounded-md"
                >
                  ✔︎
                </button>
              ) : (
                <button className="bg-green-400 w-[35px] h-[35px] rounded-md">
                  ✔︎
                </button>
              )}
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
          {!isValCodeSent || !isUsernameCheck || !isNicknameCheck ? (
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
