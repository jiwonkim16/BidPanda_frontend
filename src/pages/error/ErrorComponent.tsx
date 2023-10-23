function ErrorComponent() {
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center">
      <span className="font-bold text-xl">네트워크 오류!</span>
      <br />
      <span className="font-bold text-xl">다시 접속해주세요</span>
    </div>
  );
}

export default ErrorComponent;
