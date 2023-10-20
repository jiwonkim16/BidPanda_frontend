import { useRecoilState, useRecoilValue } from "recoil";
import { category, categoryList } from "../../atoms/category";
import { useQuery } from "react-query";
import { auctionList } from "../../apis/auction-list/AuctionList";
import CountdownTimer from "./CountdownTimer";
import { Link, useNavigate } from "react-router-dom";
import { auctionStatus } from "../../atoms/auctionStatus";
import jwtDecode from "jwt-decode";
import Loading from "../../components/assets/Loading";
import { Tab } from "@headlessui/react";

interface IAuction {
  auctionEndTime: string;
  bidCount: number;
  content: string;
  id: number;
  nickname: string;
  itemImages: string[];
  minBidPrice: number;
  presentPrice: number;
  title: string;
}

interface IDecodeToken {
  nickname: string;
}

function AuctionList() {
  const categoryLi = useRecoilValue(categoryList);
  const [selectCategory, setSelectCategory] = useRecoilState(category);
  const navigate = useNavigate();
  const status = useRecoilValue(auctionStatus);
  // jwt 디코딩
  const token: string | null = localStorage.getItem("authorization");
  const decodedToken: IDecodeToken | null = token ? jwtDecode(token) : null;
  const userNickname: string = decodedToken ? decodedToken.nickname : "";
  // -----------------------------------
  const { data, isLoading } = useQuery("auctionList", auctionList);
  const auctionItem: IAuction[] = data?.content;

  const onClickCategory = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const select = event.currentTarget.value;
    setSelectCategory(select);
    navigate(`/items/list/${select}`);
  };

  return (
    <>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : null}

      <div>
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
        {/* 데이터가 로드되기 전에 렌더링을 막기 위해 아래와 같은 조건문을 사용. auctionItem이 존재하는 경우에만 map 함수 호출. */}

        {auctionItem &&
          auctionItem.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-center ml-2.5 mt-2 w-[370px] bg-white border border-gray-200 rounded-lg shadow "
            >
              <Link
                to={
                  item.nickname === userNickname
                    ? status
                      ? `/items/detail/${item.id}`
                      : `/items/modifier/${item.id}`
                    : `/items/detail/${item.id}`
                }
              >
                <img
                  className="p-4 ml-[10px] rounded-lg w-[360px] h-[200px] object-cover"
                  src={item.itemImages[0]}
                  alt="product image"
                />
              </Link>
              <div className="px-5 pb-5">
                <Link
                  to={
                    item.nickname === userNickname
                      ? status
                        ? `/items/detail/${item.id}`
                        : `/items/modifier/${item.id}`
                      : `/items/detail/${item.id}`
                  }
                >
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
                  <span className="text-md font-bold text-gray-900">
                    {item.presentPrice} 원
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default AuctionList;
