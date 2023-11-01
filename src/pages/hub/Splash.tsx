const Splash = () => {
  return (
    <div
      style={{ backgroundImage: "url(/splash-bg.webp)" }}
      className="w-full h-[100%] flex mt-1 p-1 absolute items-center justify-center"
    >
      <div className="flex flex-col text-white items-center">
        <h4 className="text-4xl">BID PANDA</h4>
        <span className="mt-1 text-md font-pretendard font-extrabold">
          가치있게, 보내주자 !
        </span>
      </div>
    </div>
  );
};

export default Splash;
