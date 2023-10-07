const Mypage = () => {
  return (
    <div className="flex flex-col h-[650px] mt-[50px] justify-center items-center ">
      <div className="mt-[-50px]">
        <div className="flex justify-center items-center font-bold">
          <div className="flex flex-row mt-1">
            <div className="bg-white rounded-[15px] mt-4 w-[360px] h-[160px] p-4 flex flex-row items-center">
              <img
                className="w-[100px] h-[100px]"
                src="https://us.123rf.com/450wm/martialred/martialred1608/martialred160800018/61263271-%EC%95%B1-%EB%B0%8F-%EC%9B%B9-%EC%82%AC%EC%9D%B4%ED%8A%B8%EC%9D%98-%EC%82%AC%EC%9A%A9%EC%9E%90-%EA%B3%84%EC%A0%95-%ED%94%84%EB%A1%9C%ED%95%84-%EC%9B%90%ED%98%95-%EC%95%84%EC%9D%B4%EC%BD%98.jpg"
                alt=""
              />
              <div>
                <div className="ml-2">
                  <p>닉네임</p>
                  <p>회원 소개 내용</p>
                </div>
                <div className="mt-1 ">
                  <button className="w-[95px] h-[30px] bg-black text-white rounded-md mt-2 mr-2 ">
                    회원정보 수정
                  </button>
                  <button className="w-[95px] h-[30px] bg-red-400 text-white rounded-md mt-2 mr-2 ">
                    회원 탈퇴
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white text-gray-600 font-bold w-[390px] flex justify-center flex-row">
        <p className="m-1">등록 상품</p>
        <p className="m-1">찜한 상품</p>
        <p className="m-1">참여 상품</p>
        <p className="m-1">낙찰 상품</p>
      </div>
      <div className="h-[500px] flex justify-center p-4">
        <div className="bg-gray-300 rounded-[15px] w-[170px] h-[200px] mt-5 mx-2" />
        <div className="bg-gray-300 rounded-[15px] w-[170px] h-[200px] mt-5 mx-2" />
      </div>
    </div>
  );
};

export default Mypage;
