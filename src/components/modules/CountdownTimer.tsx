import { useState, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { auctionStatus } from "../../atoms/auctionStatus";
import moment from "moment";

function CountdownTimer({ endTime, bidCount }: any) {
  // 진행 여부에 관한 Recoil state
  const [progress, setProgress] = useRecoilState(auctionStatus);
  const end = useMemo(() => moment(endTime), [endTime]);
  const [remainingTime, setRemainingTime] = useState(
    Math.max(end.diff(moment()), 0)
  );

  // 1초마다 남은 시간 업데이트
  // 1chakek 인터벌 함수를 실행하는데 이 함수는 현재 시간과 마감시간 간의 차이를 계산해서 남은시간state를 업뎃.
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newRemainingTime = Math.max(end.diff(moment()), 0);
      setRemainingTime(newRemainingTime);

      if (newRemainingTime === 0) {
        setProgress(false);
        // closeAlarm(itemId);
      }
    }, 1000);

    // 클린업 함수 -> 컴포넌트가 언마운트 되거나 end가 변경될 때 clearInterval 호출
    // clearInterval 함수를 사용해서 컴포넌트가 소멸되거나 마감시간이 변경됬을 경우 불필요한 인터벌이 일어나지 않도록 함.
    // interval 시 인터벌의 id를 반환하는데 이를 정리함으로서 불필요한 메모리 누수를 방지.
    return () => clearInterval(intervalId);
  }, [end, progress]);

  // milliseconds를 duration 객체로 변환 -> moment.duration은 모먼트 객체로부터 지속시간을 생성한다.
  const duration = moment.duration(remainingTime);
  const days = duration.days();
  // 00days hh:mm:ss 형식으로 포맷팅
  const format = `${days}days 
  ${duration.hours()}:${duration.minutes()}:${duration.seconds()}`;

  return (
    <>
      <div>
        {remainingTime !== 0 ? (
          <div className="flex justify-center items-center w-36">
            <div className="flex text-sm items-center w-full justify-center bg-gray-100 text-gray-800 p-1 rounded-xl shadow-md font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.25em"
                viewBox="0 0 448 512"
              >
                <path d="M176 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h16V98.4C92.3 113.8 16 200 16 304c0 114.9 93.1 208 208 208s208-93.1 208-208c0-41.8-12.3-80.7-33.5-113.2l24.1-24.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L355.7 143c-28.1-23-62.2-38.8-99.7-44.6V64h16c17.7 0 32-14.3 32-32s-14.3-32-32-32H224 176zm72 192V320c0 13.3-10.7 24-24 24s-24-10.7-24-24V192c0-13.3 10.7-24 24-24s24 10.7 24 24z" />
              </svg>
              <span className="ml-2">{format}</span>
            </div>
          </div>
        ) : bidCount === 0 ? (
          <div className="flex flex-row w-fit text-md font-extrabold items-center px-2 bg-gray-100 text-gray-800  p-1 rounded-xl shadow-md ">
            <div className="bg-red-500 w-[10px] h-[10px] shadow rounded-full mr-1" />
            <span>유찰</span>
          </div>
        ) : (
          <div className="flex flex-row w-fit text-md font-extrabold items-center px-2 bg-gray-100 text-gray-800  p-1 rounded-xl shadow-md ">
            <div className="bg-[#278374] w-[10px] h-[10px] shadow rounded-full mr-1" />
            <span>낙찰</span>
          </div>
        )}
      </div>
    </>
  );
}

export default CountdownTimer;
