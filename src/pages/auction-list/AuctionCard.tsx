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
      <div className="flex justify-center py-2">
        {categoryLi.map((item, index) => (
          <button
            type="button"
            key={index}
            value={item}
            onClick={onClickCategory}
            className={`${
              selectCategory === item
                ? "flex-row rounded-md m-0.5 mt-3 p-1 bg-blue-600 w-[40px] font-semibold cursor-pointer text-white"
                : "flex-row rounded-md m-0.5 mt-3 p-1 bg-gray-700 w-[40px] font-semibold cursor-pointer text-white"
            } text-white`}
          >
            {item}
          </button>
        ))}
      </div>
      {auctionData.map((item: IAuction) => (
        <div
          key={item.id}
          className="flex flex-col justify-center ml-2.5 mt-2 w-[370px] bg-white border border-gray-200 rounded-lg shadow "
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
                {item.title}
              </h5>
            </Link>
            <div className="flex items-center mt-2 mb-2">
              <span>
                {
                  <CountdownTimer
                    endTime={item.auctionEndTime}
                    bidCount={item.bidCount}
                  />
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-md font-bold text-gray-900 dark:text-white">
                {item.presentPrice} 원
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default AuctionCard;
