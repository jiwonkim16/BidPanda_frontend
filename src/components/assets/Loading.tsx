import spinner from "../../imgs/spinner.gif";

const Loading = () => {
  return (
    <div className="w-full h-[95%] flex flex-col justify-center items-center">
      <img src={spinner} alt="로딩중" width="25%" />
    </div>
  );
};

export default Loading;
