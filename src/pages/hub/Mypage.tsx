import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { profileImageState } from "../../atoms/profileImage";
import { useSetRecoilState } from "recoil";
import { toast } from "react-toastify";
import { profileImageApi } from "../../apis/user-mypage/UserImageApi";
import { userDeleteApi } from "../../apis/user-mypage/UserDeleteApi";
import { getUserInfoApi } from "../../apis/user-mypage/UserInfoApi";
import Loading from "../../components/assets/Loading";
import Modal from "../../components/assets/Modal";
import Mylists from "../../components/modules/Mylists";

interface UserData {
  nickname: string;
  profileImageUrl: string;
  intro: string;
}

/**
 * @author : Goya Gim
 * @returns : 마이페이지. useRef를 이용한 프로필 이미지 등록,
 */

const Mypage = () => {
  const setProfileImages = useSetRecoilState(profileImageState);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [forSureDelete, setForSureDelete] = useState(false);
  const [selectedTab, setSelectedTab] = useState("interest");
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef<HTMLInputElement>(null);
  const isToken = localStorage.getItem("authorization");
  const navigate = useNavigate();

  /**
   * @includes : 유저 정보 Get.
   */

  useEffect(() => {
    setIsLoading(true);
    getUserInfoApi().then((data) => {
      setUserData(data.data);
      setProfileImages(data.profileImageUrl);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isToken) {
      toast.error("로그인이 필요합니다.");
      navigate("/login");
    }
    return;
  }, []);

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

  /**
   * @includes : 프로필 이미지 변경 관련 코드.
   */

  const handleImageClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFiles: FileList | null = e.target.files;

    if (imageFiles) {
      const formData = new FormData();
      formData.append("file", imageFiles[0]);
      profileImageApi(formData)
        .then((res) => {
          if (res && res.status === 200) {
            toast.success("프로필 이미지가 변경되었습니다.");
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error(error);
        });
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
                        className="w-[100px] h-[100px] cursor-pointer rounded-full object-cover"
                        src={userData?.profileImageUrl}
                        alt=""
                        onClick={handleImageClick}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        ref={imageRef}
                        onChange={handleImageChange}
                      />
                    </>
                  )}
                  <div>
                    <div className="ml-[10px]">
                      {userData && (
                        <>
                          <p>{userData ? userData.nickname : null}</p>
                          <p>{userData ? userData.intro : null}</p>
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
            <p
              className={`m-2 ${selectedTab === "liked" ? "text-black" : ""}`}
              onClick={() => setSelectedTab("liked")}
            >
              찜한 상품
            </p>
            <p
              className={`m-2 ${selectedTab === "bid" ? "text-black" : ""}`}
              onClick={() => setSelectedTab("bid")}
            >
              참여 상품
            </p>
            <p
              className={`m-2 ${selectedTab === "posted" ? "text-black" : ""}`}
              onClick={() => setSelectedTab("posted")}
            >
              등록 상품
            </p>
          </div>
          <div className="h-[500px] flex justify-center p-1">
            <Mylists selectedTab={selectedTab} />
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
