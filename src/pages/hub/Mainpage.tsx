import { useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";
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
 * @returns : 메인페이지. 데이터 중복 요청을 방지하기 위해 useQuery 사용.
 */

const Main = () => {
  const { data } = useQuery("topTen", getTopTenListApi);
  const [topItems, setTopItems] = useState<TopItemType[]>([]);
  const [showSplash, setShowSplash] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isIn = sessionStorage.getItem("isIn");

  useEffect(() => {
    /**
     * @includes : 스플래쉬 화면을 첫 1회에만 노출하기 위해, isIn이라는 key value를 세션 스토리지에 삽입.
     */

    sessionStorage.setItem("isIn", "true");
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3000);
      clearTimeout(timer);
    }

    /**
     * @includes : 배너 비디오를 재생하기 위한 useRef.
     */

    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  /**
   * @includes : useQuery를 이용해 요청한 데이터를 state에 적용.
   */

  useEffect(() => {
    if (data) {
      setTopItems(data as TopItemType[]);
    }
  }, [data]);

  return (
    <>
      <>
        {showSplash && !isIn ? (
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
            <div className="flex items-center justify-start mt-1 font-bold text-gray-800">
              <ItemCards topItems={topItems} />
            </div>
          </>
        )}
      </>
    </>
  );
};
export default Main;
