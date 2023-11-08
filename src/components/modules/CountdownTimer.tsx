import { useState, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { auctionStatus } from "../../atoms/auctionStatus";
import moment from "moment";

/**
 * @author : Jiwon Kim
 * @returns : 실시간 남은 시간 체크을 위한 타이머 기능 구현 (moment.js 활용)
 */

// 타입 지정
interface CountdownTimerProps {
  endTime: string; // 예를 들어, 날짜와 시간을 나타내는 ISO 문자열("2023-11-08T12:00:00")
  bidCount: number;
}

function CountdownTimer({ endTime, bidCount }: CountdownTimerProps) {
  // auctionStatus 상태 업데이트
  const [progress, setProgress] = useRecoilState(auctionStatus);
  // moment를 사용해서 endTime을 가지고 Moment.js 객체 생성, useMemo를 활용해서 메모리제이션
  const end = useMemo(() => moment(endTime), [endTime]);
  // remainingTime state의 초기 값은 현재 시간과 end 사이의 차이이며, 음수일 경우 0으로 설정
  const [remainingTime, setRemainingTime] = useState(
    Math.max(end.diff(moment()), 0)
  );

  // 1초마다 현재 시간과 end 사이의 차이를 계산해서 remainingTime state를 업데이트하고
  // 만약 컴포넌트가 언마운트 되거나 end가 변경될 시 clearInterval 을 호출하여 인터벌을 정리하며,
  // interval 함수 실행 시 인터벌 id를 반환하는데 이를 정리함으로서 불필요한 메모리 누수 방지
  // 1chakek 인터벌 함수를 실행하는데 이 함수는 현재 시간과 마감시간 간의 차이를 계산해서 남은시간state를 업뎃.
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newRemainingTime = Math.max(end.diff(moment()), 0);
      setRemainingTime(newRemainingTime);

      if (newRemainingTime === 0) {
        setProgress(false);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [end, progress]);

  // milliseconds를 duration 객체로 변환 -> moment.duration은 모먼트 객체로부터 지속시간을 생성한다.
  const duration = moment.duration(remainingTime);

  // duration 객체에서 day를 가지고 옴.
  const days = duration.days();

  // 00days hh:mm:ss 형식으로 포맷팅
  const format = `${days}days 
  ${duration.hours()}:${duration.minutes()}:${duration.seconds()}`;

  return (
    <>
      <div>
        {remainingTime !== 0 ? (
          <div className="flex justify-center items-center w-36">
            <div className="flex text-sm items-center w-full justify-center bg-gray-100 text-gray-800 p-1 rounded-xl shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.15em"
                viewBox="0 0 448 512"
              >
                <path d="M176 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h16V98.4C92.3 113.8 16 200 16 304c0 114.9 93.1 208 208 208s208-93.1 208-208c0-41.8-12.3-80.7-33.5-113.2l24.1-24.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L355.7 143c-28.1-23-62.2-38.8-99.7-44.6V64h16c17.7 0 32-14.3 32-32s-14.3-32-32-32H224 176zm72 192V320c0 13.3-10.7 24-24 24s-24-10.7-24-24V192c0-13.3 10.7-24 24-24s24 10.7 24 24z" />
              </svg>
              <span className="ml-2">{format}</span>
            </div>
          </div>
        ) : bidCount === 0 ? (
          <div className="flex justify-center items-center w-20">
            <div className="flex flex-row w-fit text-md font-extrabold items-center px-2 bg-gray-100 text-gray-800  p-1 rounded-xl shadow-md ">
              <div className="bg-red-500 w-[10px] h-[10px] shadow rounded-full mr-1" />
              <span>유찰</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center w-20">
            <div className="flex flex-row w-fit text-md font-extrabold items-center px-2 bg-gray-100 text-gray-800  p-1 rounded-xl shadow-md ">
              <div className="bg-[#278374] w-[10px] h-[10px] shadow rounded-full mr-1" />
              <span>낙찰</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CountdownTimer;
