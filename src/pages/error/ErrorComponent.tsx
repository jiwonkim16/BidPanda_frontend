/**
 * @author : Jiwon Kim
 * @returns : 네트워크 오류 등 페이지에서 에러 발생 시 표시되는 에러 컴포넌트로, 라우터에서 각 페이지 별 설정
 */

function ErrorComponent() {
  return (
    <div className="h-[100vh] font-pretendard flex flex-col items-center justify-center">
      <span className="font-bold text-xl">네트워크 오류!</span>
      <br />
      <span className="font-bold text-xl">다시 접속해주세요</span>
    </div>
  );
}

export default ErrorComponent;
