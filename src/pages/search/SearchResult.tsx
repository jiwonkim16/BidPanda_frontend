import CountdownTimer from "../auction-list/CountdownTimer";
import { useRecoilValue } from "recoil";
import { auctionStatus } from "../../atoms/auctionStatus";

function SearchResult({ data }: any) {
  console.log("SearchResult 컴포넌트 렌더링 진행중...");

  const status = useRecoilValue(auctionStatus);
  console.log(status);

  const onClick = (result: any) => {
    window.location.href = `/items/detail/${result.id}`;
  };

  return (
    <>
      <div
        key={data.id}
        className="w-[93%] max-w-sm bg-white border border-gray-300 rounded-lg shadow"
      >
        <button onClick={() => onClick(data)}>
          <img
            className="p-4 ml-[10px] rounded-lg w-[360px] h-[200px] object-cover"
            src={data.itemImages[0]}
            alt="product image"
          />
        </button>
        <div className="px-5 pb-5">
          <button onClick={() => onClick(data)}>
            <h5 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
              {data.title}
            </h5>
          </button>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              {data.presentPrice}원
            </span>
          </div>
          <div className="flex items-center mt-2 mb-2">
            <span>{<CountdownTimer endTime={data.auctionEndTime} />}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
