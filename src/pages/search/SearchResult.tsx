import ListTimer from "../auction-list/ListTimer";
import { Link } from "react-router-dom";

function SearchResult({ data }: any) {
  const onClick = (result: any) => {
    window.location.href = `/items/detail/${result.id}`;
  };

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
        <div className="px-5 pb-5">
          <button onClick={() => onClick(data)}>
            <h5 className="text-xl font-semibold tracking-tight text-gray-800 ">
              {data.title}
            </h5>
            <div className="flex items-center mt-2 mb-2">
              <span>
                <ListTimer endTime={data.auctionEndTime} />
              </span>
            </div>
          </button>
          <div className="flex items-center justify-between">
            <span className="text-md font-bold text-gray-800 ">
              {data.presentPrice}원
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
