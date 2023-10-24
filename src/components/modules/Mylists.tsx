import { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "../../pages/auction-list/CountdownTimer";
import {
  getLikedListApi,
  getBidListApi,
  getPostedListApi,
} from "../../apis/user-mylists/UserListDataApi";

interface MypageProps {
  selectedTab: string;
}

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

/**
 * @author : Goya Gim
 * @returns : 마이페이지에서 버튼으로 분기되는 리스트를 구현하기 위한 컴포넌트.
 *            Mypage에서 selectedTab이라는 state를 만들어, 버튼마다 각기
 *            다른 state value를 지정하고, selectedTab을 props로 가져와
 *            서로 다른 get api를 호출하기 위한 조건으로 사용하였다.
 *            React memo를 사용하여 불필요한 렌더링을 예방하였다.
 */

const Mylists: React.FC<MypageProps> = ({ selectedTab }) => {
  const [itemsData, setItemsData] = useState<Items[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data: Items[] | any = [];
        if (selectedTab === "liked") {
          data = await getLikedListApi();
        } else if (selectedTab === "bid") {
          data = await getBidListApi();
        } else if (selectedTab === "posted") {
          data = await getPostedListApi();
        }
        setItemsData(data);
      } catch (error) {
        console.error("Error fetching auction data:", error);
      }
    };
    fetchData();
  }, [selectedTab]);

  return (
    <>
      <div className="rounded-[15px] mt-4 ml-2 flex flex-wrap">
        {itemsData.map((item: Items) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 m-2 rounded-lg shadow"
          >
            <Link to={`/items/detail/${item.id}`}>
              <img
                className="p-3 rounded-lg w-[170px] h-[130px] object-cover"
                src={item.itemImages[0]}
                alt="product image"
              />
            </Link>
            <div className="px-4">
              <Link to={`/items/detail/${item.id}`}>
                <h5 className="text-lg font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h5>
              </Link>
              <div className="flex items-center mt-1 mb-1">
                <span>
                  <CountdownTimer
                    endTime={item.auctionEndTime}
                    bidCount={item.bidCount}
                  />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {item.presentPrice}원
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default memo(Mylists);
