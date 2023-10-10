import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { EditUserInfoApi } from "../../apis/UsersApi";

const EditUserInfo = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const formToRegister = async (data: any) => {
    try {
      await EditUserInfoApi(data);
      toast.success("회원정보가 수정 되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("서버와의 통신에 문제가 있습니다.");
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
                message: "닉네임은 10자 이하으로 만들어 주세요.",
              },
            })}
            type="text"
            id="nickname"
            className="w-[250px] h-[35px] border-2 rounded-md mt-2 mb-2"
          />
          {errors.nickname && (
            <p className="text-sm w-[250px] text-red-500 mb-2">
              {errors.nickname.message as ReactNode}
            </p>
          )}
        </div>
        <label htmlFor="password">비밀번호</label>
        <div>
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
        </div>
        <label htmlFor="checkPassword">비밀번호 확인</label>
        <div>
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
        </div>
        <button className="w-[250px] h-[40px] bg-gray-600 text-white rounded-md mt-10 mr-2 ">
          수정 완료
        </button>
      </form>
    </div>
  );
};

export default EditUserInfo;
