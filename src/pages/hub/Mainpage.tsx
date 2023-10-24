import { useEffect, useState } from "react";
import { getTopTenListApi } from "../../apis/auction-list/TopTenList";
import ItemCards from "../../components/modules/ItemCards";
import Categories from "../../components/modules/Categories";

export interface TopItemType {
  auctionEndTime: string;
  bidCount: number;
  content: string;
  id: number;
  itemImages: string[];
  minBidPrice: number;
  nickname: string;
  presentPrice: number;
  title: string;
}

/**
 * @author : Goya Gim
 * @returns : 메인페이지.
 */

const Main = () => {
  const [topItems, setTopItems] = useState<TopItemType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: TopItemType[] = await getTopTenListApi();
      if (data) {
        setTopItems(data);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="py-1">
        <nav id="banner" className=" w-[390px] h-[210px] -mt-3">
          <img
            src="../../../public/sampleBann.jpeg"
            className="h-full max-w-fit -ml-2"
            alt="banner"
          />
        </nav>
        <div className="flex justify-center mt-[13px] flex-wrap">
          <Categories />
        </div>
      </div>
      <div className="ml-4 mt-4 font-semibold">최고 낙찰가 상품</div>
      <div className="flex items-center justify-start flex-wrap mt-1 ml-4 font-bold text-gray-700">
        <ItemCards topItems={topItems} />
      </div>
    </>
  );
};

export default Main;
