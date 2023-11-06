import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { editUserPasswordApi } from "../../apis/user-mypage/UserEditApi";
import { toast } from "react-toastify";
import { userDeleteApi } from "../../apis/user-mypage/UserDeleteApi";
import Modal from "../../components/assets/Modal";

interface EditPasswordData {
  password: string;
  newpassword: string;
}

/**
 * @author : Goya Gim
 * @returns : 회원정보 수정 페이지.
 */

const EditPassword = () => {
  const [forSureDelete, setForSureDelete] = useState(false);
  const navigate = useNavigate();
  const isToken = localStorage.getItem("authorization");

  /**
   * @includes : 회원 정보 수정. React-hook-form.
   */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPasswordData>({ mode: "onBlur" });

  const formToRegister = async (data: EditPasswordData) => {
    try {
      await editUserPasswordApi(data);
      toast.success("회원정보가 정상적으로 수정 되었습니다.");
      navigate("/mypage");
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * @includes : 회원 탈퇴 관련 코드.
   */

  const removeToken = () => {
    localStorage.removeItem("authorization");
    localStorage.removeItem("authorization_refresh");
  };

  const askUserDelete = () => {
    setForSureDelete(true);
    setTimeout(() => {
      setForSureDelete(false);
    }, 4500);
  };

  const handleUserDelete = async () => {
    if (isToken) {
      await userDeleteApi();
      toast.success("탈퇴 되었습니다. 다시 만나길 바랍니다.");
      navigate("/");
      removeToken();
    }
  };
  return (
    <div
      style={{ fontFamily: "Pretendard-Bold" }}
      className="flex flex-col h-[650px] font-bold justify-center items-center"
    >
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit(formToRegister)}
      >
        <label htmlFor="newPassword">새 비밀번호</label>
        <div>
          <input
            {...register("newpassword", {
              pattern: {
                value: /^(?=.*[A-Z]).{6,}$/,
                message: `비밀번호 변경을 원치 않으시면 비워두세요.`,
              },
            })}
            type="password"
            id="newPassword"
            className="w-[250px] h-[35px] border-2 rounded-lg mt-1 mb-3"
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
            className="w-[250px] h-[35px] border-2 rounded-lg mt-1"
          />
          {errors.password && (
            <p className="text-sm w-[250px] text-red-500 mb-2">
              {errors.password.message as ReactNode}
            </p>
          )}
        </div>
        <button className="w-[250px] h-[40px] bg-[#278374] text-white rounded-lg mt-10 ">
          수정 완료
        </button>
      </form>
      <button className="w-[250px] h-[40px] bg-gray-800 text-white rounded-lg mt-2 ">
        뒤로 가기
      </button>
      <span className="text-red-500 text-sm mt-6 text-center">
        회원 탈퇴는 신중하게 진행 해 주시길 부탁드립니다.
      </span>
      <button
        onClick={askUserDelete}
        className="w-[250px] h-[40px] font-semibold bg-white text-red-500 border-[1.5px] border-red-500 shadow-md rounded-md m-1 p-1"
      >
        회원 탈퇴
      </button>
      {forSureDelete && (
        <>
          <Modal handleUserDelete={handleUserDelete} />
        </>
      )}
    </div>
  );
};

export default EditPassword;
