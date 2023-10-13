import { useEffect, useState } from "react";
import { auctionCategory } from "../../apis/auction-list/AuctionList";
import CountdownTimer from "./CountdownTimer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { category, categoryList } from "../../atoms/category";

interface IAuction {
  auctionEndTime: string;
  bidCount: number;
  content: string;
  id: number;
  itemImages: string[];
  minBidPrice: number;
  presentPrice: number;
  title: string;
}

function AuctionCard() {
  const [auctionData, setAuctionData] = useState<IAuction[]>([]);
  const params = useParams();
  const navigate = useNavigate();
  const categoryIcon: any = params.category;
  const categoryLi = useRecoilValue(categoryList);
  const [selectCategory, setSelectCategory] = useRecoilState(category);

  useEffect(() => {
    if (categoryIcon === "전체") {
      navigate(`/items/list`);
    }
  }, [categoryIcon]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await auctionCategory(categoryIcon);
        setAuctionData(response);
      } catch (error) {
        console.error("Error fetching auction data:", error);
      }
    };

    fetchData();
  }, [categoryIcon]);

  const onClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const select = event.currentTarget.value;
    setSelectCategory(select);
    navigate(`/items/list/${select}`);
  };

  return (
    <>
      <div className="title">
        <h1 className="text-3xl font-extrabold my-[20px]">Auction Item List</h1>
      </div>
      <div className="flex justify-center">
        {categoryLi.map((item, index) => (
          <button
            type="button"
            key={index}
            value={item}
            onClick={onClickCategory}
            className={`rounded-full ${
              selectCategory === item ? " bg-blue-500" : "bg-gray-300"
            } w-11 cursor-pointer text-white`}
          >
            {item}
          </button>
        ))}
      </div>
      {auctionData.map((item: IAuction) => (
        <div
          key={item.id}
          className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <Link to={`/items/detail/${item.id}`}>
            <img
              className="p-8 rounded-t-lg"
              src={item.itemImages[0]}
              alt="product image"
            />
          </Link>
          <div className="px-5 pb-5">
            <Link to={`/items/detail/${item.id}`}>
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {item.title}😥
              </h5>
            </Link>
            <div className="flex items-center mt-2.5 mb-5">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                {
                  <CountdownTimer
                    endTime={item.auctionEndTime}
                    bidCount={item.bidCount}
                  />
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                현재 입찰가 : {item.presentPrice}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default AuctionCard;
