import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { profileImageApi } from "../../apis/user-mypage/UserImageApi";
import { userDeleteApi } from "../../apis/user-mypage/UserDeleteApi";
import { getUserInfoApi } from "../../apis/user-mypage/UserInfoApi";
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
  const [userData, setUserData] = useState<UserData | null>(null);
  const [profileImage, setProfileImage] = useState("");
  const [forSureDelete, setForSureDelete] = useState(false);
  const [selectedTab, setSelectedTab] = useState("interest");
  const imageRef = useRef<HTMLInputElement>(null);
  const isToken = localStorage.getItem("authorization");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isToken) {
      toast.error("로그인이 필요합니다.");
      navigate("/login");
    }
    return;
  }, []);

  /**
   * @includes : 유저 정보 Get.
   */

  useEffect(() => {
    getUserInfoApi().then((data) => {
      setUserData(data.data);
      const imageData = data.data.profileImageUrl;
      setProfileImage(imageData);
    });
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
            window.location.href = `/`;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <div className="flex justify-center items-center font-bold">
          <div>
            <div className="bg-white rounded-[15px] mt-4 w-[370px] h-[200px] flex flex-row justify-center  items-center">
              {userData && (
                <>
                  <img
                    className="w-[100px] h-[100px] mr-3 cursor-pointer rounded-full object-cover"
                    src={profileImage}
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
                <div className="ml-[5px] text-gray-800">
                  {userData && (
                    <>
                      <p>{userData ? userData.nickname : null}</p>
                      <p>{userData ? userData.intro : null}</p>
                    </>
                  )}
                </div>
                <div>
                  <button className="w-[95px] h-[30px] bg-gray-200 text-gray-800 shadow-sm rounded-lg mt-2 mx-1 ">
                    <Link to="/mypage/edit">프로필 수정</Link>
                  </button>
                  <button
                    onClick={askUserDelete}
                    className="w-[95px] h-[30px] bg-red-500 text-white shadow-sm rounded-lg mt-2 mx-1 "
                  >
                    회원 탈퇴
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-gray-800 font-semibold w-[390px] flex justify-center flex-row">
        <p
          className={`m-1 bg-gray-100 shadow-md rounded-sm p-1 ${
            selectedTab === "liked" ? "bg-gray-800 text-white" : ""
          }`}
          onClick={() => setSelectedTab("liked")}
        >
          찜한 상품
        </p>
        <p
          className={`m-1 bg-gray-100 shadow-md rounded-sm p-1  ${
            selectedTab === "bid" ? "bg-gray-800 text-white" : ""
          }`}
          onClick={() => setSelectedTab("bid")}
        >
          참여 상품
        </p>
        <p
          className={`m-1 bg-gray-100 shadow-md rounded-sm p-1  ${
            selectedTab === "posted" ? "bg-gray-800 text-white" : ""
          }`}
          onClick={() => setSelectedTab("posted")}
        >
          등록 상품
        </p>
      </div>
      <div className="h-[500px] flex flex-col">
        <Mylists selectedTab={selectedTab} />
      </div>
      {forSureDelete && (
        <>
          <Modal handleUserDelete={handleUserDelete} />
        </>
      )}
    </div>
  );
};

export default Mypage;
