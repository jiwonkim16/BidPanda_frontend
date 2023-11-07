import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isReadState } from "../../atoms/isReadState";
import { getUserInfoApi } from "../../apis/user-mypage/UserInfoApi";
import { toast } from "react-toastify";

/**
 * @author : Goya Gim
 * @returns : 클라이언트 네비게이션 바 구현. 로그인/ 로그아웃에 따른 화면 분기, 알림 수신 상태에 따른 분기.
 */

function Header() {
  const [profileImage, setProfileImage] = useState("");
  const [readData, setReadData] = useRecoilState(isReadState);
  const navigate = useNavigate();
  const removeToken = () => {
    localStorage.removeItem("authorization");
    localStorage.removeItem("authorization_refresh");
  };
  const isToken = localStorage.getItem("authorization");

  useEffect(() => {
    if (isToken) {
      getUserInfoApi().then((data) => {
        const imageData = data.data.profileImageUrl;
        setProfileImage(imageData);
        setReadData(false);
      });
    }
  }, [profileImage]);

  const LogoutHandler = () => {
    try {
      if (isToken) {
        removeToken();
        toast.success("로그아웃 되었습니다.");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!isToken ? (
        <nav className="items-center bg-white w-[390px] h-[105%] flex justify-between border-b-2 rounded-b-[15px]">
          <Link to={"/"}>
            <h4 className="text-xl text-gray-800 ml-2">BID PANDA</h4>
          </Link>
          <button className="text-gray-600 mt-6 -mr-2 text-lg">
            <Link to={"/login"} className="mr-[40px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.3em"
                viewBox="0 0 448 512"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
            </Link>
          </button>
        </nav>
      ) : (
        <nav className="items-center bg-white w-[390px] h-[105%] flex py-1 justify-between border-b-2 rounded-b-[15px]">
          <div className="flex justify-start">
            <Link to={"/"}>
              <h4 className="text-xl text-gray-800 ml-2">BID PANDA</h4>
            </Link>
          </div>
          <div className="flex flex-row items-center justify-between gap-[15px]">
            <Link to={"/notification"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.4em"
                viewBox="0 0 448 512"
                onClick={() => setReadData(false)}
              >
                <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
              </svg>
              {readData ? (
                <>
                  <div className="rounded-full w-2.5 h-2.5 bg-red-500 absolute right-[93px] top-[10px]" />
                </>
              ) : (
                <></>
              )}
            </Link>
            <button onClick={LogoutHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.4em"
                viewBox="0 0 512 512"
              >
                <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
              </svg>
            </button>
            <img
              className="w-[35px] h-[35px] mr-2 mb-1 cursor-pointer rounded-full object-cover shadow-md"
              src={profileImage}
              alt="mypage&profile"
              onClick={() => navigate("/mypage")}
            />
          </div>
        </nav>
      )}
    </>
  );
}
export default Header;
