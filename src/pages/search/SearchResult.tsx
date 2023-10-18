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
        className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
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
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {data.title}😥
            </h5>
          </button>
          <div className="flex items-center mt-2.5 mb-5">
            <span>{<CountdownTimer endTime={data.auctionEndTime} />}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              현재 입찰가 : {data.presentPrice}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
