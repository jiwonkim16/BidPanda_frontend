import { Link } from "react-router-dom";
import CountdownTimer from "./../../components/modules/CountdownTimer";

function SearchResult({ data }: any) {
  const onClick = (result: any) => {
    window.location.href = `/items/detail/${result.id}`;
  };
  console.log(data);

  return (
    <>
      <div
        key={data.id}
        className="flex flex-col justify-center ml-2.5 mt-2 w-[370px] bg-white border border-gray-200 rounded-lg shadow "
      >
        <Link to={`/items/detail/${data.id}`}>
          <img
            className="p-4 ml-[10px] rounded-lg w-[360px] h-[200px] object-cover"
            src={data.itemImages[0]}
            alt="product image"
          />
        </Link>
        <div className="px-5 pb-5 flex flex-col items-start">
          <button onClick={() => onClick(data)}>
            <h5 className="text-xl font-semibold text-gray-800 ">
              {data.title}
            </h5>
            <div>
              <span>{data.content}</span>
            </div>
            <div className="flex items-center mt-2 mb-2">
              <span>
                <CountdownTimer
                  bidCount={data.bidCount}
                  endTime={data.auctionEndTime}
                />
              </span>
            </div>
          </button>
          <div className="flex items-center justify-between">
            <span className="text-md font-bold text-gray-800 ">
              현재 입찰가 : {data.presentPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
