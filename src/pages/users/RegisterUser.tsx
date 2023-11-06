import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { throttle } from "lodash";
import { toast } from "react-toastify";
import {
  userRegisterApi,
  checkValidateCodeApi,
  sendValidateEmailApi,
  checkMembernameApi,
  checkNicknameApi,
} from "../../apis/user-log/UserRegisterApi";

interface registeredData {
  membername: string;
  nickname: string;
  email: string;
  password: string;
  checkPassword: string;
}

/**
 * @author : Goya Gim
 * @returns : React Hook Form을 사용하여 formData를 Post.
 *            아이디, 닉네임의 중복확인 기능과, 이메일 인증코드 인증 기능 구현.
 */

const RegisterUser = () => {
  const [isMembernameCheck, setIsMembernameCheck] = useState(false);
  const [isNicknameCheck, setIsNicknameCheck] = useState(false);
  const [isValidEmailSent, setIsValidEmailSent] = useState(false);
  const [isValCodeSent, setIsValCodeSent] = useState(false);
  const [checkedPw, setCheckedPw] = useState("");
  const [validateCode, setValidateCode] = useState("");
  const navigate = useNavigate();

  /**
   * @includes : 중복 확인을 위한 이벤트 핸들러들의 모음
   */

  const checkMembernameHandler = async () => {
    const valMembername = getValues("membername");
    const res = await checkMembernameApi(valMembername);
    if (!valMembername) {
      toast.error("아이디를 입력해 주세요.");
      if (res?.status === 200) {
        setIsMembernameCheck(true);
        toast.success("사용 가능한 아이디 입니다.");
      } else {
        toast.error("이미 존재하는 아이디 입니다.");
      }
    }
  };
  const checkNicknameHandler = async () => {
    const valNickname = getValues("nickname");
    const res = await checkNicknameApi(valNickname);
    if (!valNickname) {
      toast.error("닉네임을 입력해 주세요.");
      if (res?.status === 200) {
        setIsNicknameCheck(true);
      } else {
        toast.error("이미 존재하는 닉네임 입니다.");
      }
    }
  };

  const throttledEmailHandler = throttle(async () => {
    toast.success("인증번호가 전송 되었습니다. 메일함을 확인해주세요.");
    const valEmail = getValues("email");
    const res = await sendValidateEmailApi(valEmail);
    if (res?.status === 200) {
      setIsValidEmailSent(true);
    } else {
      toast.error("이미 존재하는 이메일 이거나, 잘못된 형식입니다.");
    }
  }, 5000);

  const onValCodeHandler = async () => {
    const valCode = validateCode;
    const valEmail = getValues("email");
    const codeData = { code: valCode, email: valEmail };
    const res = await checkValidateCodeApi(codeData);
    if (res?.status === 200) {
      setIsValCodeSent(true);
      toast.success("이메일 인증에 성공하였습니다.");
    } else {
      toast.error("인증코드가 맞지 않습니다.");
    }
  };

  /**
   * @includes : Hook Form 사용을 위한 useForm 선언과 서브밋 핸들러.
   */

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<registeredData>({ mode: "onBlur" });

  const formToRegister = async (data: registeredData) => {
    const password = data.password;
    const checkPassword = checkedPw;

    if (password !== checkPassword) {
      toast.error("비밀번호가 서로 다릅니다.");
      return;
    }
    if (
      isValCodeSent &&
      isMembernameCheck &&
      isNicknameCheck &&
      isValidEmailSent
    ) {
      await userRegisterApi(data);
      if (data) {
        toast.success("회원가입에 성공하였습니다.");
        navigate("/login");
      } else {
        toast.error("회원가입에 실패 했습니다.");
      }
    } else {
      return;
    }
  };

  return (
    <div
      style={{ fontFamily: "pretendard-bold" }}
      className="flex flex-col h-[650px] justify-center"
    >
      <form
        className="flex flex-col items-center text-md font-semibold text-gray-800"
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
            placeholder=" 4자 이상, 숫자를 하나 이상 포함"
            className="w-[215px] h-[35px] border-2 rounded-lg rounded-r-none mt-2 mb-2 text-sm"
          />
          {!isMembernameCheck ? (
            <button
              onClick={checkMembernameHandler}
              className="bg-gray-100 w-[35px] h-[35px] rounded-l-none rounded-lg"
            >
              ✔︎
            </button>
          ) : (
            <button
              className={`w-[35px] h-[35px] rounded-l-none rounded-lg ${
                errors.membername ? "bg-red-500 " : "bg-[#278374]"
              }`}
            >
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
            placeholder=" 10자 이하 입니다"
            className="w-[215px] h-[35px] border-2 rounded-r-none rounded-lg text-sm mt-2 mb-2"
          />
          {!isNicknameCheck ? (
            <button
              onClick={checkNicknameHandler}
              className="bg-gray-100 w-[35px] h-[35px] rounded-l-none rounded-lg"
            >
              ✔︎
            </button>
          ) : (
            <button
              className={`w-[35px] h-[35px] rounded-l-none rounded-lg ${
                errors.nickname ? "bg-red-500 " : "bg-[#278374] "
              }`}
            >
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
                placeholder=" example@gmail.com"
                className="w-[215px] h-[35px] border-2 rounded-r-none rounded-lg text-sm mt-2 mb-2"
              />
              <button
                onClick={throttledEmailHandler}
                className="bg-gray-100 w-[35px] h-[35px] rounded-l-none rounded-lg"
              >
                ✔
              </button>
            </div>
          </>
        ) : (
          <>
            <label htmlFor="email">이메일 주소</label>
            <div>
              <input
                type="text"
                id="email"
                className="w-[215px] h-[35px] border-2 rounded-r-none rounded-lg mt-2 mb-2"
              />
              <button
                className={`w-[35px] h-[35px] rounded-l-none rounded-lg ${
                  errors.email ? "bg-red-500" : "bg-[#278374]"
                }`}
              >
                ✔︎
              </button>
            </div>
            <label htmlFor="validateCode">이메일 인증코드</label>
            <div>
              <input
                value={validateCode}
                onChange={(e) => setValidateCode(e.target.value)}
                type="text"
                id="validateCode"
                placeholder=" 인증코드를 정확히 입력해 주세요"
                className="w-[215px] h-[35px] border-2 rounded-r-none rounded-lg text-sm mt-2 mb-2"
              />
              {!isValCodeSent ? (
                <button
                  onClick={onValCodeHandler}
                  className="bg-gray-100 w-[35px] h-[35px] rounded-l-none rounded-lg"
                >
                  ✔︎
                </button>
              ) : (
                <button className="bg-[#278374] w-[35px] h-[35px] rounded-l-none rounded-lg">
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
          placeholder=" 6자 이상, 영문 대문자 1개 포함"
          className="w-[250px] h-[35px] border-2  rounded-lg text-sm mt-2 mb-2"
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
          value={checkedPw}
          onChange={(e) => setCheckedPw(e.target.value)}
          placeholder=" 비밀번호가 서로 같아야 합니다"
          className="w-[250px] h-[35px] border-2  rounded-lg text-sm mt-2 mb-2"
        />
        {errors.checkPassword && (
          <p className="text-sm w-[250px] text-red-500 mb-2">
            비밀번호가 서로 같지 않습니다.
          </p>
        )}
        <div>
          {!isMembernameCheck ||
          !isNicknameCheck ||
          !isValidEmailSent ||
          !isValCodeSent ? (
            <>
              <button className="w-[250px] h-[40px] bg-gray-200 text-white text-md rounded-lg mt-10 mr-2 ">
                회원가입
              </button>
            </>
          ) : (
            <>
              <button className="w-[250px] h-[40px] bg-[#278374] text-white text-md rounded-lg mt-10 mr-2 ">
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
