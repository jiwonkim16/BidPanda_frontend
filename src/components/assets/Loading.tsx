import { memo } from "react";
import spinner from "/spinner.gif";

/**
 * @author : Goya Gim
 * @returns : 브라우저 isLoading 처리를 위한 스피너 이미지
 */

const Loading = () => {
  return (
    <div className="w-full h-[95%] flex flex-col justify-center items-center">
      <img src={spinner} alt="로딩중" width="25%" />
    </div>
  );
};
export default memo(Loading);
