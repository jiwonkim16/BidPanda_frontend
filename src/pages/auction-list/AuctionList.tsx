import { useRecoilState, useRecoilValue } from "recoil";
import { category, categoryList } from "../../atoms/category";
import CountdownTimer from "./CountdownTimer";
import { Link, useNavigate } from "react-router-dom";
import { auctionStatus } from "../../atoms/auctionStatus";
import jwtDecode from "jwt-decode";
import { Tab } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import { auctionList } from "./../../apis/auction-list/AuctionList";


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
  const target = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const page = useRef(1);
  const [auctionItem, setAuctionItem] = useState<IAuction[]>([]);

  useEffect(() => {
    if (target.current) {
      observer.observe(target.current);
    }
  }, []);

  const getItems = async () => {
    setLoading(true);
    const response = await auctionList(page.current);
    if (!(response.totalElement >= auctionItem.length)) {
      setAuctionItem((prev) => [...prev, ...response.content]);
      setLoading(false);
    } else {
      // 페이지가 끝났으면 observer를 disconnect하여 더 이상 호출되지 않도록 함
      observer.disconnect();
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (loading) return;

      getItems();
      page.current += 1;
    });
  });

  const onClickCategory = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const select = event.currentTarget.value;
    setSelectCategory(select);
    navigate(`/items/list/${select}`);
  };

  return (
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

      {auctionItem.map((item, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col justify-center ml-2.5 mt-2 w-[370px] bg-white border border-gray-200 rounded-lg shadow ">
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
        </React.Fragment>
      ))}
      <div ref={target} className="text-white">
        dddd
      </div>
    </div>
  );
}

export default AuctionList;
