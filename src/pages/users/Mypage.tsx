import { useRef, useState } from "react";
import { Link } from "react-router-dom";
const Mypage = () => {
  const [profileImage, setProfileImage] = useState(
    "https://static.thenounproject.com/png/5034901-200.png"
  );
  const imageRef = useRef<any>();

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
    <div className="flex flex-col h-[650px]justify-center items-center ">
      <div>
        <div className="flex justify-center items-center font-bold">
          <div className="flex flex-row mt-1">
            <div className="bg-white rounded-[15px] mt-4 w-[310px] h-[200px] flex flex-row items-center">
              <img
                className="w-[100px] h-[100px] cursor-pointer overflow-hidden rounded-full"
                src={profileImage}
                alt="profileImage"
                onClick={handleImageClick}
              />
              <input
                type="file"
                accept=".jpg, .jpeg, .png, .svg, .webp"
                style={{ display: "none" }}
                ref={imageRef}
                onChange={handleImageChange}
              />
              <div>
                <div className="ml-2">
                  <p>닉네임</p>
                  <p>회원 소개 내용</p>
                </div>
                <div>
                  <button className="w-[95px] h-[30px] bg-black text-white rounded-md mt-2 mx-1 ">
                    <Link to="/mypage/edit">회원정보 수정</Link>
                  </button>
                  <button className="w-[95px] h-[30px] bg-red-400 text-white rounded-md mt-2 mx-1 ">
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
