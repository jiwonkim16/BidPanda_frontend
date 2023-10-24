import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { editUserInfoApi } from "../../apis/user-mypage/UserEditApi";
import { toast } from "react-toastify";

interface EditInfoType {
  nickname: string;
  intro: string;
  password: string;
  newPassword: string;
}

/**
 * @author : Goya Gim
 * @returns : 회원정보 수정 페이지.
 */

const EditUserInfo = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditInfoType>({ mode: "onBlur" });

  const formToRegister = async (data: EditInfoType) => {
    try {
      await editUserInfoApi(data);
      toast.success("회원정보가 정상적으로 수정 되었습니다.");
      navigate("/mypage");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-[650px] justify-center">
      <form
        className="flex flex-col items-center font-bold"
        onSubmit={handleSubmit(formToRegister)}
      >
        <label htmlFor="nickname">닉네임</label>
        <div>
          <input
            {...register("nickname", {
              required: true,
              minLength: 1,
              pattern: {
                value: /^[A-za-z0-9가-힣]{1,10}$/,
                message: "닉네임은 10자 이하로 만들어 주세요.",
              },
            })}
            type="text"
            id="nickname"
            className="w-[250px] h-[35px] border-2 rounded-lg mt-2 mb-2"
          />
          {errors.nickname && (
            <p className="text-sm w-[250px] text-red-500 mb-2">
              {errors.nickname.message as ReactNode}
            </p>
          )}
        </div>
        <label htmlFor="intro">사용자 소개</label>
        <div>
          <input
            {...register("intro", {
              pattern: {
                value: /^[A-za-z0-9가-힣]{1,30}$/,
                message: "자기소개는 30자 이하로 짧게 작성해주세요.",
              },
            })}
            type="text"
            id="intro"
            className="w-[250px] h-[35px] border-2 rounded-lg mt-2 mb-2"
          />
          {errors.intro && (
            <p className="text-sm w-[250px] text-red-500 mb-2">
              {errors.intro.message as ReactNode}
            </p>
          )}
        </div>
        <label htmlFor="newPassword">새 비밀번호</label>
        <div>
          <input
            {...register("newPassword", {
              pattern: {
                value: /^(?=.*[A-Z]).{6,}$/,
                message: `비밀번호 변경을 원치 않으시면 비워두세요.`,
              },
            })}
            type="password"
            id="newPassword"
            className="w-[250px] h-[35px] border-2 rounded-lg mt-2 mb-2"
          />
        </div>
        <label htmlFor="password">비밀번호</label>
        <div>
          <input
            {...register("password", {
              required: true,
              minLength: 1,
              pattern: {
                value: /^(?=.*[A-Z]).{6,}$/,
                message: `회원정보 변경을 위해 꼭 입력해주세요.`,
              },
            })}
            type="password"
            id="password"
            className="w-[250px] h-[35px] border-2 rounded-lg mt-2 mb-2"
          />
          {errors.password && (
            <p className="text-sm w-[250px] text-red-500 mb-2">
              {errors.password.message as ReactNode}
            </p>
          )}
        </div>
        <button className="w-[250px] h-[40px] bg-green-500 text-gray-800 rounded-lg mt-10 mr-2 ">
          수정 완료
        </button>
      </form>
    </div>
  );
};

export default EditUserInfo;
