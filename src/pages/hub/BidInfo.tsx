function BidInfo() {
  return (
    <div>
      <div className="flex items-center justify-center mt-3 text-md">
        <h1>경매 진행 방식 설명</h1>
      </div>
      <div className="mt-6 ml-2">
        <details className="select-none text-md font-pretendard font-bold open:bg-gray-200 open:text-gray-800 rounded-lg mb-1 p-2">
          <summary className="cursor-pointer mb-2">상품 등록</summary>
          <ul>
            <li>
              &nbsp;&nbsp;🔥 카테고리, 사진 등 모든 정보를 입력해야 합니다. 단,
              사진은 최대 3장까지만 등록 가능합니다.
            </li>
            <br />
            <li>
              &nbsp;&nbsp;🔥 경매가 최소 단위 : 한번에 입찰할 때 증가하는 최소
              금액을 의미합니다.
            </li>
            <br />
            <li>&nbsp;&nbsp;🔥 최대 입찰금액은 1억원입니다.</li>
          </ul>
        </details>
        <details className="select-none text-md font-pretendard font-bold open:bg-gray-200  open:text-gray-800 rounded-lg mb-1 p-2">
          <summary className="cursor-pointer mb-2">경매 진행 방식</summary>
          <ul>
            <li>
              &nbsp;&nbsp;🔥 회원만 입찰이 가능하며, 입찰 횟수는 제한이
              없습니다.
            </li>
            <br />
            <li>&nbsp;&nbsp;🔥 기한 내 최고가를 입찰하신 분에게 낙찰됩니다.</li>
            <br />
            <li>
              &nbsp;&nbsp;🔥 낙찰받으신 분과 상품 등록하신 분은 경매 종료 시
              바로 채팅방이 생성됩니다.
            </li>
            <br />
            <li>
              &nbsp;&nbsp;🔥 경매가 최소 단위 : 한번에 입찰할 때 증가하는 최소
              금액을 의미합니다.
            </li>
            <br />
            <li>
              &nbsp;&nbsp;🔥 입찰 : 상품의 매매를 위해 각자 낙찰 희망 가격을
              제출하는 과정입니다
            </li>
            <br />
            <li>
              &nbsp;&nbsp;🔥 유찰 : 경매가 종료되었으나 입찰한 분이 없는 경우를
              의미합니다😥
            </li>
            <br />
            <li>
              &nbsp;&nbsp;🔥 낙찰 : 경매가 종료되었으며, 최고가를 제시한 분과
              판매자 간의 계약이 진행됩니다
            </li>
          </ul>
        </details>
        <details className="select-none text-md font-pretendard font-bold open:bg-gray-200 open:text-gray-800 rounded-lg mb-1 p-2">
          <summary className="cursor-pointer mb-2">회원 탈퇴</summary>
          <ul>
            <li>
              &nbsp;&nbsp;🔥 경매가 진행 중일 때 해당 상품의 판매자와 최고
              입찰자는 탈퇴가 불가능합니다
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
}

export default BidInfo;
