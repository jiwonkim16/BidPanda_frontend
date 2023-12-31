import { Link } from "react-router-dom";
import ListTimer from "../auction-list/ListTimer";

/**
 * @author : Jiwon Kim
 * @returns : 검색 페이지 / 키워드를 통한 검색 기능 구현을 통해 SearchResult 컴포넌트로 데이터 전달, 쿼리 dsl 적용
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

function SearchResult({ data }: { data: IResult }) {
  // 이미지 또는 제목 클릭 시 해당 아이템의 상세페이지로 이동, 리렌더링 강제
  const onClick = (result: IResult) => {
    window.location.href = `/items/detail/${result.id}`;
  };

  return (
    <>
      <div
        key={data.id}
        className="flex flex-col justify-center mt-2 w-[370px] bg-white border border-gray-200 rounded-lg shadow "
      >
        <Link to={`/items/detail/${data.id}`}>
          <img
            className="p-4 rounded-3xl w-[370px] h-[200px] object-cover"
            src={data.itemImages[0]}
            alt="product image"
          />
        </Link>
        <div className="px-5 pb-5 flex flex-col items-start justify-center">
          <button onClick={() => onClick(data)}>
            <h5 className="font-pretendard text-xl font-bold text-gray-800 flex justify-start mb-2">
              {data.title}
            </h5>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap w-[320px] text-gray-400">
              <span className="font-pretendard font-semibold text-gray-400">
                {data.content}
              </span>
            </div>
            <div className="relative">
              <div className="absolute -top-[260px] left-[280px]">
                <ListTimer
                  endTime={data.auctionEndTime}
                  bidCount={data.bidCount}
                />
              </div>
            </div>
          </button>
          <div className="flex flex-row w-full justify-between items-center mt-3">
            <span className="font-pretendard text-md font-extrabold text-gray-800 ">
              현재 입찰가 : {data.presentPrice.toLocaleString()}
            </span>
            <span className="font-pretendard text-md font-extrabold text-red-500">
              {data.bidCount}명 입찰 중
            </span>
          </div>
          <div className="mt-2">
            <span className="font-pretendard text-md font-extrabold text-gray-800">
              최소 입찰 단위 : {data.minBidPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
