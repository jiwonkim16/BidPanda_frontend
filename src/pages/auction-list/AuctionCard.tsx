import { useEffect, useRef, useState } from "react";
import { auctionCategory } from "../../apis/auction-list/AuctionList";
import CountdownTimer from "./CountdownTimer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { category, categoryList } from "../../atoms/category";
import { Tab } from "@headlessui/react";
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

  const target = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const page = useRef(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await auctionCategory(categoryIcon, page.current);
      if (response.length >= auctionData.length) {
        setAuctionData((prev) => [...prev, ...response]);
      } else {
        // 페이지가 끝나면, observer 연결 해제
        observer.disconnect();
      }
    } catch (error) {
      console.error("Error fetching auction data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryIcon === "전체") {
      navigate(`/items/list`);
    }
  }, [categoryIcon]);

  useEffect(() => {
    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      // 컴포넌트 언마운트시 observer disconnect
      observer.disconnect();
    };
  }, [categoryIcon]);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (loading) return;

      setLoading(true);
      fetchData();
      page.current += 1;
      setLoading(false);
    });
  });

  const onClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const select = event.currentTarget.value;
    setSelectCategory(select);
    page.current = 1;
    setAuctionData([]);
    navigate(`/items/list/${select}`);
  };

  return (
    <>
      <div className="flex justify-center">
        <Tab.Group>
          <Tab.List className="flex space-x-5 rounded-xl bg-blue-900/20 p-1">
            {categoryLi.map((item, index) => (
              <Tab
                type="button"
                key={index}
                value={item}
                onClick={onClickCategory}
                className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
                  selectCategory === item
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                }`}
              >
                {item}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>
      {auctionData.map((item: IAuction, index) => (
        <div
          key={index}
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
              <h5 className="text-xl font-semibold tracking-tight text-gray-900">
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
              <span className="text-md font-bold text-gray-900">
                {item.presentPrice} 원
              </span>
            </div>
          </div>
        </div>
      ))}
      <div ref={target} className="text-white">
        dddd
      </div>
    </>
  );
}

export default AuctionCard;
