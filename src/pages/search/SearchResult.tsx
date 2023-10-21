import CountdownTimer from "../auction-list/CountdownTimer";
import { useRecoilValue } from "recoil";
import { auctionStatus } from "../../atoms/auctionStatus";

function SearchResult({ data }: any) {
  const status = useRecoilValue(auctionStatus);
  const onClick = (result: any) => {
    window.location.href = `/items/detail/${result.id}`;
  };

  return (
    <>
      <div
        key={data.id}
        className="w-[93%] max-w-sm bg-white border border-gray-300 rounded-lg shadow mb-2"
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
            <h5 className="text-xl font-bold tracking-tight text-gray-800 dark:text-white">
              {data.title}
            </h5>
            <div className="flex items-center mt-2 mb-2">
              <span>{<CountdownTimer endTime={data.auctionEndTime} />}</span>
            </div>
          </button>
          <div className="flex items-center justify-between mt-1">
            <span className="text-md font-bold text-gray-800 dark:text-white">
              {data.presentPrice}원
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
