import { Link } from "react-router-dom";
import CountdownTimer from "../../pages/auction-list/CountdownTimer";

interface Items {
  auctionEndTime: string;
  auctionStatus: string;
  bidCount: number;
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
              className="p-2 rounded-lg w-[170px] h-[120px] object-cover"
              src={item.itemImages[0]}
              alt="product image"
            />
          </Link>
          <div className="px-3">
            <Link to={`/items/detail/${item.id}`}>
              <h5 className="text-lg font-bold text-gray-900 dark:text-white">
                {item.title}
              </h5>
            </Link>
            <div className="flex">
              <span>
                <CountdownTimer
                  endTime={item.auctionEndTime}
                  bidCount={item.bidCount}
                />
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className=" font-semibold text-gray-900 dark:text-white">
                {item.presentPrice}원
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemCards;
