import { useState, useEffect } from "react";
import moment from "moment";

function CountdownTimer({ endTime }: any) {
  // endTime을 moment 객체로 변환
  const end = moment(endTime);

  // 남은 시간 상태 관리 (초기값은 마감시간 - 현재시간)
  const [remainingTime, setRemainingTime] = useState(
    // 값이 음수인 경우엔 0으로 설정!
    Math.max(end.diff(moment()), 0)
  );

  // 1초마다 남은 시간 업데이트
  // 1chakek 인터벌 함수를 실행하는데 이 함수는 현재 시간과 마감시간 간의 차이를 계산해서 남은시간state를 업뎃.
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(Math.max(end.diff(moment()), 0));
    }, 1000);

    // 클린업 함수 -> 컴포넌트가 언마운트 되거나 end가 변경될 때 clearInterval 호출
    // clearInterval 함수를 사용해서 컴포넌트가 소멸되거나 마감시간이 변경됬을 경우 불필요한 인터벌이 일어나지 않도록 함.
    // interval 시 인터벌의 id를 반환하는데 이를 정리함으로서 불필요한 메모리 누수를 방지.
    return () => clearInterval(intervalId);
  }, [end]);

  // milliseconds를 duration 객체로 변환 -> moment.duration은 모먼트 객체로부터 지속시간을 생성한다.
  const duration = moment.duration(remainingTime);

  // hh:mm:ss 형식으로 포맷팅
  const format = `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`;

  return (
    <div>
      {remainingTime === 0 ? (
        <div>마감되었습니다!!</div>
      ) : (
        <div>남은 시간 : {format}</div>
      )}
    </div>
  );
}

export default CountdownTimer;

// 남은 시간이 0이 되면 버튼 비활성화 등 페이지 수정 필요!
