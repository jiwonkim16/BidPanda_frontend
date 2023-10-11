import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDeleteApi } from "../../apis/user-mypage/UserDeleteApi";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../../atoms/isLoggedIn";
import { toast } from "react-toastify";
import { getUserInfoApi } from "../../apis/user-mypage/UserInfoApi";

/**
 * @author : Goya Gim
 * @returns : 회원 페이지. useRef를 이용한 프로필 이미지 등록,
 */

const Mypage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [profileImage, setProfileImage] = useState(
    "https://static.thenounproject.com/png/5034901-200.png"
  );
  const imageRef = useRef<any>();
  const [userData, setUserData] = useState<UserData | null>(null);

  interface UserData {
    data: {
      nickname: string;
      profileImageUrl: string;
      intro: string;
    } | null;
  }

  useEffect(() => {
    const isToken = localStorage.getItem("authorization");
    if (!isToken) {
      toast.error("로그인이 필요합니다.");
      navigate("/login");
    } else {
      getUserInfoApi().then((data) => {
        setUserData(data);
      });
    }
  }, []);

  const removeToken = () => {
    localStorage.removeItem("authorization");
    localStorage.removeItem("authorization_refresh");
  };

  const handleUserDelete = () => {
    UserDeleteApi();
    removeToken();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleImageClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const uploadedImage = file.name;
      console.log("선택한 파일:", file);
      setProfileImage(uploadedImage);
    }
  };

  return (
    <div className={wrapper}>
      <div>
        <div className={profileWrap}>
          <div className="flex flex-row mt-1">
            <div className={profileCard}>
              {userData && (
                <>
                  <img
                    className="w-[100px] h-[100px] cursor-pointer rounded-full"
                    src={userData.data?.profileImageUrl}
                    alt=""
                    onClick={handleImageClick}
                  />
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png, .svg, .webp"
                    style={{ display: "none" }}
                    ref={imageRef}
                    onChange={handleImageChange}
                  />
                </>
              )}

              <div>
                <div className="ml-2">
                  {userData && (
                    <>
                      <p>{userData.data ? userData.data.nickname : null}</p>
                      <p>{userData.data ? userData.data.intro : null}</p>
                    </>
                  )}
                </div>
                <div>
                  <button className="w-[95px] h-[30px] bg-black text-white rounded-md mt-2 mx-1 ">
                    <Link to="/mypage/edit">회원정보 수정</Link>
                  </button>
                  <button
                    onClick={handleUserDelete}
                    className="w-[95px] h-[30px] bg-red-400 text-white rounded-md mt-2 mx-1 "
                  >
                    회원 탈퇴
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white text-gray-600 font-bold w-[390px] flex justify-center flex-row">
        <p className="m-2">등록 상품</p>
        <p className="m-2">찜한 상품</p>
        <p className="m-2">참여 상품</p>
        <p className="m-2">낙찰 상품</p>
      </div>
      <div className="h-[500px] flex justify-center p-1">
        <div className="bg-gray-300 rounded-[15px] w-[170px] h-[200px] mt-5 mx-2" />
        <div className="bg-gray-300 rounded-[15px] w-[170px] h-[200px] mt-5 mx-2" />
      </div>
    </div>
  );
};
export default Mypage;

const wrapper = "flex flex-col h-[79vh] justify-center items-center";
const profileWrap = "flex justify-center items-center font-bold";
const profileCard =
  "bg-white rounded-[15px] mt-4 w-[310px] h-[200px] flex flex-row items-center";
