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
      {remainingTime !== 0 ? (
        <div>
          {days === 0 ? (
            <div className="bg-red-500 text-white px-3 w-16 h-16 flex items-center justify-center text-xs rounded-full shadow-md font-semibold">
              {format}
            </div>
          ) : (
            <div className="bg-[#009432] text-white px-[10px] w-16 h-16 flex items-center justify-center text-xs rounded-full shadow-md font-semibold">
              {format}
            </div>
          )}
        </div>
      ) : bidCount === 0 ? (
        <div className="bg-[#6f45ee] text-white px-[10px] w-16 h-16 flex items-center justify-center text-xs rounded-full shadow-md font-semibold">
          유찰
        </div>
      ) : (
        <div className="bg-[#ed433e] text-white px-[10px] w-16 h-16 flex items-center justify-center text-xs rounded-full shadow-md font-semibold">
          낙찰
        </div>
      )}
    </>
  );
}

export default CountdownTimer;
