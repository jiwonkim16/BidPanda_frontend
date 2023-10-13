import { Link } from "react-router-dom";

interface Items {
  auctionEndTime: string;
  auctionStatus: string;
  content: string;
  id: number;
  itemImages: string[];
  minBidPrice: number;
  presentPrice: number;
  title: string;
}
interface TopItemProps {
  topItems: Items[];
}

const ItemCards = ({ topItems }: TopItemProps) => {
  return (
    <div className="flex flex-row">
      {topItems.map((item: Items) => (
        <div
          key={item.id}
          className="w-[170px] h-[220px] bg-white border border-gray-200 mt-3 mr-2 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <Link to={`/items/detail/${item.id}`}>
            <img
              className="p-2 rounded-t-lg w-[170px]"
              src={item.itemImages[0]}
              alt="product image"
            />
          </Link>
          <div className="px-5 pb-2">
            <Link to={`/items/detail/${item.id}`}>
              <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {item.title}
              </h5>
            </Link>
            <div className="flex items-center mt-2.5 mb-5">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                {/* {<CountdownTimer endTime={item.auctionEndTime} />} */}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                현재 입찰가 : {item.presentPrice}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemCards;
