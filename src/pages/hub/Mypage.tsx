import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { AiOutlineEdit } from "react-icons/ai";
import { profileImageApi } from "../../apis/user-mypage/UserImageApi";
import { getUserInfoApi } from "../../apis/user-mypage/UserInfoApi";
import Mylists from "../../components/modules/Mylists";
import {
  BsFillChatHeartFill,
  BsFillLightningFill,
  BsFillPatchPlusFill,
} from "react-icons/bs";

interface UserData {
  data: {
    nickname: string;
    profileImageUrl: string;
    intro: string;
  };
}

/**
 * @author : Goya Gim
 * @returns : 마이페이지. useRef를 이용한 프로필 이미지 등록, useQuery를 이용한 유저 정보 요청.
 */

const Mypage = () => {
  const { data } = useQuery<UserData | undefined>("userData", getUserInfoApi);
  const imageRef = useRef<HTMLInputElement>(null);
  const [selectedTab, setSelectedTab] = useState("interest");
  const isToken = localStorage.getItem("authorization");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isToken) {
      toast.error("로그인이 필요합니다.");
      navigate("/login");
    }
  }, []);

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
            window.location.href = `/mypage`;
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
        <div className="flex justify-center items-center font-extralight">
          <div>
            <div className="bg-white rounded-[15px] w-[370px] h-[180px] flex flex-row justify-center items-center">
              {data && (
                <>
                  <img
                    className="w-[100px] h-[100px] mr-3 cursor-pointer rounded-full object-cover"
                    src={data.data.profileImageUrl}
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
                <div className="ml-[5px] text-gray-700">
                  {data && (
                    <div className="flex flex-col mx-1">
                      <div className="flex items-center ml-2">
                        <p>{data ? data.data.nickname : null}</p>
                        <Link to="/mypage/edit" style={{ marginLeft: "5px" }}>
                          <AiOutlineEdit />
                        </Link>
                      </div>
                      <>
                        <p className="ml-2 text-sm">
                          {data ? data.data.intro : null}
                        </p>
                      </>
                      <div>
                        <button className=" bg-gray-700 text-white text-xs shadow-md rounded-md m-1 p-1">
                          <Link to="/mypage/password">회원 정보 설정</Link>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-gray-700 font-semibold w-[380px] flex justify-center flex-row">
        <div
          onClick={() => setSelectedTab("liked")}
          className={`flex flex-col mx-2 p-1 rounded-lg text-sm font-extralight ${
            selectedTab === "liked" ? "bg-gray-800 text-white " : ""
          }`}
        >
          <div className="flex justify-center items-center text-2xl mb-1">
            <BsFillChatHeartFill />
          </div>
          <p>관심 상품</p>
        </div>
        <div
          onClick={() => setSelectedTab("bid")}
          className={`flex flex-col mx-2 p-1 rounded-lg text-sm font-extralight ${
            selectedTab === "bid" ? "bg-gray-800 text-white " : ""
          }`}
        >
          <div className="flex justify-center items-center text-2xl mb-1">
            <BsFillLightningFill />
          </div>
          <p>참여 상품</p>
        </div>
        <div
          onClick={() => setSelectedTab("posted")}
          className={`flex flex-col mx-2 p-1 rounded-lg text-sm font-extralight ${
            selectedTab === "posted" ? "bg-gray-800 text-white " : ""
          }`}
        >
          <div className="flex justify-center items-center text-2xl mb-1">
            <BsFillPatchPlusFill />
          </div>
          <p>등록 상품</p>
        </div>
      </div>
      <div className="h-[500px] flex flex-col">
        <Mylists selectedTab={selectedTab} />
      </div>
    </div>
  );
};
export default Mypage;
