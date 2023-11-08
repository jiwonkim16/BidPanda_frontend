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
      {remainingTime !== 0 ? (
        <div>
          {days === 0 ? (
            <div className="bg-red-500 font-extralight text-white px-3 w-16 h-16 flex items-center justify-center text-xs rounded-full shadow-md ">
              {format}
            </div>
          ) : (
            <div className="bg-[#71eab9] font-extralight text-gray-800 px-[10px] w-16 h-16 flex items-center justify-center text-xs rounded-full shadow-md ">
              {format}
            </div>
          )}
        </div>
      ) : bidCount === 0 ? (
        <div className="bg-red-500 text-white font-extralight px-[10px] w-16 h-16 flex items-center justify-center text-xs rounded-full shadow-md ">
          유찰
        </div>
      ) : (
        <div className="bg-[#278374] text-white font-extralight px-[10px] w-16 h-16 flex items-center justify-center text-xs rounded-full shadow-md ">
          낙찰
        </div>
      )}
    </>
  );
}

export default CountdownTimer;
