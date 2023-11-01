import { Link } from "react-router-dom";
import ListTimer from "../auction-list/ListTimer";

function SearchResult({ data }: any) {
  const onClick = (result: any) => {
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
            <h5 className="font-pretendard text-2xl font-extrabold text-gray-800 flex justify-start mb-2">
              {data.title}
            </h5>
            <div>
              <span className="font-pretendard text-xl font-extrabold overflow-hidden text-ellipsis text-gray-500 whitespace-nowrap">
                {data.content}
              </span>
            </div>
            <div className="relative">
              <div className="absolute -top-[65px] left-[270px]">
                <ListTimer
                  endTime={data.auctionEndTime}
                  bidCount={data.bidCount}
                />
              </div>
            </div>
          </button>
          <div className="flex flex-row w-full justify-between items-center mt-3">
            <span className="font-pretendard text-xl font-extrabold text-gray-800 ">
              현재 입찰가 : {data.presentPrice.toLocaleString()}
            </span>
            <span className="font-pretendard text-lg font-extrabold text-gray-800">
              {data.bidCount}명 입찰 중
            </span>
          </div>
          <div className="mt-2">
            <span className="font-pretendard text-xl font-extrabold text-gray-800">
              최소 입찰 단위 : {data.minBidPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
