import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDeleteApi } from "../../apis/user-mypage/UserDeleteApi";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../../atoms/isLoggedIn";
import { toast } from "react-toastify";
import Modal from "../../components/assets/Modal";
import { getUserInfoApi } from "../../apis/user-mypage/UserInfoApi";
import Loading from "../../components/assets/Loading";
import { ProfileImageApi } from "../../apis/user-mypage/UserImageApi";

/**
 * @author : Goya Gim
 * @returns : 회원 페이지. useRef를 이용한 프로필 이미지 등록,
 */

const Mypage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [forSureDelete, setForSureDelete] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [profileImage, setProfileImage] = useState(
    "https://static.thenounproject.com/png/5034901-200.png"
  );
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef<any>();
  const isToken = localStorage.getItem("authorization");

  const navigate = useNavigate();
  interface UserData {
    data: {
      nickname: string;
      profileImageUrl: string;
      intro: string;
    } | null;
  }

  useEffect(() => {
    if (!isToken) {
      setIsLoggedIn(false);
      toast.error("로그인이 필요합니다.");
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getUserInfoApi().then((data) => {
      setUserData(data);
      setIsLoading(false);
    });
  }, []);

  const removeToken = () => {
    localStorage.removeItem("authorization");
    localStorage.removeItem("authorization_refresh");
  };

  const askUserDelete = () => {
    setForSureDelete(true);
    setTimeout(() => {
      setForSureDelete(false);
    }, 5000);
  };

  const handleUserDelete = () => {
    if (isToken) {
      UserDeleteApi();
      setIsLoggedIn(false);
      navigate("/");
      removeToken();
    }
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
      ProfileImageApi(uploadedImage);
      setProfileImage(uploadedImage);
    }
  };

  return (
    <div className={wrapper}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
                        onClick={askUserDelete}
                        className="w-[95px] h-[30px] bg-red-500 text-white rounded-md mt-2 mx-1 "
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
          {forSureDelete && (
            <>
              <Modal handleUserDelete={handleUserDelete} />
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Mypage;

const wrapper = "flex flex-col h-[79vh] justify-center items-center";
const profileWrap = "flex justify-center items-center font-bold";
const profileCard =
  "bg-white rounded-[15px] mt-4 w-[310px] h-[200px] flex flex-row items-center";
