const Modal = ({ handleUserDelete }: any) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white text-gray-600 rounded-[20px] flex flex-col justify-center items-center p-[20px] w-[80%] h-[30%] font-bold">
        <p className="text-red-500 text-sm">⚠︎ 5초 후 알림창이 닫힙니다.</p>
        <div>탈퇴하실 경우, 복구할 수 없습니다.</div>
        <div className="mb-[10px]">그래도 탈퇴 하시겠습니까?</div>
        <div>
          <button
            onClick={handleUserDelete}
            className="w-[95px] h-[30px] bg-red-500 text-white rounded-md mt-2 mx-1"
          >
            탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;