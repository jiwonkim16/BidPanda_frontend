import { useState } from "react";

import { searchAuction } from "../../apis/search/SearchAuction";
import SearchResult from "./SearchResult";
import { toast } from "react-toastify";

interface IResult {
  auctionEndTime: string;
  content: string;
  id: number;
  itemImages: string[];
  minBidPrice: number;
  presentPrice: number;
  title: string;
}

function SearchAution() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<IResult[]>();
  const searchInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    // state에 검색어 저장
    setSearch(event.target.value);
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 서버로 search state 보내는 역할
    const response = await searchAuction(search);
    if (response.length > 0) {
      setResult(response);
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
            className="block w-full p-4 pl-10 text-sm font-extralight text-gray-800 border border-gray-300 rounded-lg bg-gray-50 focus:ring-white focus:border-white"
            placeholder="검색어를 입력하세요"
            required
          />
          <button className="text-white absolute right-5 bottom-5 bg-[#278374] focus:ring-4 focus:outline-none focus:ring-white font-extralight rounded-lg text-sm px-4 py-2">
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
