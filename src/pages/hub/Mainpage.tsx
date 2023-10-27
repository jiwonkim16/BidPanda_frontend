import { useEffect, useState, useRef } from "react";
import { getTopTenListApi } from "../../apis/auction-list/TopTenList";
import ItemCards from "../../components/modules/ItemCards";
import Categories from "../../components/modules/Categories";
import Splash from "./Splash";

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
  const [showSplash, setShowSplash] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }

    const fetchData = async () => {
      const data: TopItemType[] = await getTopTenListApi();
      if (data) {
        setTopItems(data);
      }
    };
    fetchData();
  }, [!showSplash]);

  return (
    <>
      <>
        {showSplash ? (
          <Splash />
        ) : (
          <>
            <div className="py-1">
              <nav
                id="banner"
                className=" w-[390px] h-[210px] -mt-3 overflow-hidden"
              >
                <video
                  src="/banner.mp4"
                  ref={videoRef}
                  className="max-w-md -mx-4 -mt-2"
                  autoPlay
                  muted
                  playsInline
                />
              </nav>
              <div className="flex justify-center mt-[13px] flex-wrap">
                <Categories />
              </div>
            </div>
            <div className="ml-5 mt-5 font-bold">최고 낙찰가 상품 TOP 10</div>
            <div className="flex items-center justify-start flex-wrap mt-1 ml-4 font-bold text-gray-700">
              <ItemCards topItems={topItems} />
            </div>
          </>
        )}
      </>
    </>
  );
};

export default Main;
