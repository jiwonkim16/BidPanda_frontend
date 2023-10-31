import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { editUserInfoApi } from "../../apis/user-mypage/UserEditApi";
import { toast } from "react-toastify";

interface EditInfoType {
  nickname: string;
  intro: string;
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
              required: "닉네임은 필수 입니다.",
              minLength: {
                value: 2,
                message: "닉네임은 2자 이상으로 작성해주세요.",
              },
              maxLength: {
                value: 10,
                message: "닉네임은 10자 이하로 짧게 작성해주세요.",
              },
            })}
            type="text"
            id="nickname"
            className="w-[250px] h-[35px] border-2 rounded-lg mt-1 mb-4"
          />
          {errors.nickname && (
            <p className="text-sm w-[250px] text-red-500 mb-2">
              {errors.nickname.message as ReactNode}
            </p>
          )}
        </div>
        <label htmlFor="intro">사용자 소개</label>
        <div>
          <textarea
            {...register("intro", {
              required: false,
              minLength: {
                value: 2,
                message: "자기소개는 2자 이상으로 작성해주세요.",
              },
              maxLength: {
                value: 30,
                message: "자기소개는 30자 이하로 짧게 작성해주세요.",
              },
            })}
            id="intro"
            className="w-[250px] h-[115px] border-2 rounded-lg mt-1 mb-2"
          />
          {errors.intro && (
            <p className="text-sm w-[250px] text-red-500 mb-2">
              {errors.intro.message as ReactNode}
            </p>
          )}
        </div>
        <button className="w-[250px] h-[40px]  bg-[#278374] text-white rounded-lg mt-6 mr-2 ">
          수정 완료
        </button>
      </form>
    </div>
  );
};

export default EditUserInfo;
