/**
 * @author : Jiwon Kim
 * @returns : 페이지에서 에러 발생 시 표시되는 에러 컴포넌트로, 라우터에서 각 페이지 별 설정
 */

function NotFound() {
  return (
    <div className="h-[100vh] font-pretendard flex flex-col items-center justify-center">
      <span>⚠️</span>
      <span className="text-xl font-bold">해당 페이지를 찾을 수 없습니다.</span>
    </div>
  );
}
export default NotFound;
