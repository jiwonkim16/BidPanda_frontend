import { useState } from "react";
import { searchAuction } from "../../apis/search/SearchAuction";
import SearchResult from "./SearchResult";
import { toast } from "react-toastify";

/**
 * @author : Jiwon Kim
 * @returns : 검색 페이지 / 키워드를 통한 검색 기능 구현을 통해 SearchResult 컴포넌트로 데이터 전달
 */

interface IResult {
  auctionEndTime: string;
  bidCount: number;
  bidderCount: number;
  bidderProfileImageUrls: string[];
  nickname: string;
  winnerNickname: string;
  content: string;
  id: number;
  itemImages: string[];
  minBidPrice: number;
  presentPrice: number;
  title: string;
}

function SearchAution() {
  // 사용자가 입력하는 검색어를 저장하는 state와 검색 결과를 저장하는 result라는 state 생성
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<IResult[]>();

  // 사용자가 검색어를 입력할 때 호출되며, 사용자가 입력한 검색어를 search state에 저장
  const searchInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // 사용자가 검색어를 제출할 때 호출되며, form의 기본 이벤트를 차단하고 검색어를 서버로 전송
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await searchAuction(search);
    if (response.content.length > 0) {
      setResult(response.content);
    } else {
      toast.error("검색 결과가 없습니다.");
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="relative p-3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400 text-sm font-extralight "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={search}
            onChange={searchInfo}
            className="block w-full p-3 pl-10 font-pretendard text-md font-semibold text-gray-800 border border-gray-300 rounded-lg bg-gray-50 focus:ring-white focus:border-white"
            placeholder="검색어를 입력하세요"
            required
          />
          <button className="text-white absolute right-5 bottom-[18px] bg-[#278374] focus:ring-4 focus:outline-none focus:ring-white font-extralight rounded-lg text-sm px-4 py-2">
            Search
          </button>
        </div>
      </form>
      <div className="overflow-hidden flex flex-col justify-center items-center">
        {result &&
          result.map((item: IResult) => {
            return <SearchResult data={item} key={item.id} />;
          })}
      </div>
    </>
  );
}

export default SearchAution;
