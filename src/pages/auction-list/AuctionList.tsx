import { useRecoilValue, useSetRecoilState } from "recoil";
import { category, categoryList } from "../../atoms/category";
import ListTimer from "./ListTimer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { auctionList } from "./../../apis/auction-list/AuctionList";
import Loading from "./../../components/assets/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css/scrollbar";
import "swiper/css";
import { useQuery, useQueryClient } from "react-query";

/**
 * @author : Jiwon Kim
 * @returns : 전체 상품 리스트 페이지로 세부 기능은 아래와 같습니다.
 * 인피니티 스크롤링, 쿼리dsl을 적용해서 쿼리스트링의 값으로 필터링 기능, 카테고리 버튼 케러셀 기능, 카테고리별 아이템 조회 구현
 */

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

function AuctionList() {
  // Recoil의 categoryList 상태를 가지고 오며, category 상태를 업데이트 하는 함수 생성
  const categoryLi = useRecoilValue(categoryList);
  const setSelectCategory = useSetRecoilState(category);

  // Intersection Observer의 대상이 될 요소를 참조하는 target을 생성
  const navigate = useNavigate();
  const target = useRef<HTMLDivElement | null>(null);

  // 페이지 번호를 관리하는 page를 참조하는 Ref를 생성하고 초기값을 1로 설정
  const page = useRef(1);

  // 상품 리스트 데이터를 저장하고 관리하기 위한 state 생성
  const [auctionItem, setAuctionItem] = useState<IAuction[]>([]);
  const queryClient = useQueryClient();

  // 현재 URL의 위치를 나타내는 location 객체를 가져오며, 이를 통해 현재 URL의 쿼리 매개변수 가져옴
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 현재 URL에서 order 쿼리 매개변수 값을 추출
  const order = queryParams.get("order");

  // 리액트 쿼리를 사용하여 getItems라는 키와 order를 의존성으로 하는 쿼리를 실행
  const { data, isLoading } = useQuery(["getItems", order], () =>
    auctionList(page.current, order)
  );

  // 필터링 버튼 클릭 시 URL을 변경하고 페이지를 새로고침 (UI 리렌더링 강제)
  const onClickOrder = (newOrder: string) => {
    navigate(`?auctionIng=true&order=${newOrder}`);
    window.location.href = `?auctionIng=true&order=${newOrder}`;
  };

  // Intersection Observer를 생성하고, 무한 스크롤을 구현하는 함수를 정의 (refetchQuery 활용 데이터 최신화)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (isLoading || data?.last) return;
      queryClient.refetchQueries("getItems");
      page.current += 1;
    });
  });

  // target이나 observer가 변경될 때마다 실행되며, Intersection Observer를 등록하고 컴포넌트 언마운트 시 observer를 해제
  useEffect(() => {
    if (target.current) {
      observer.observe(target.current);
    }
    return () => {
      if (target.current) {
        observer.disconnect();
      }
    };
  }, [target, observer]);

  // data가 변경될 때마다 실행되며, 새로운 데이터가 있으면 상태를 업데이트
  useEffect(() => {
    if (data) {
      setAuctionItem((prev) => [...prev, ...data.content]);
    }
  }, [data, setAuctionItem]);

  // 카테고리 버튼을 클릭했을 때 호출되는 함수로, 선택한 카테고리에 따라 페이지를 이동하고 상태를 업데이트
  const onClickCategory = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const select = event.currentTarget.value;
    setSelectCategory(select);
    navigate(`/items/list/${select}`);
  };

  return (
    <div>
      <div className="flex justify-center fixed w-[390px] z-20 h-11">
        <Swiper
          scrollbar={{
            hide: true,
          }}
          slidesPerView={5.5}
          centeredSlides={false}
          modules={[Scrollbar]}
          className="flex w-full mySwiper -top-[91px] mt-2 bg-white"
        >
          {categoryLi.map((item) => (
            <SwiperSlide key={item}>
              <button
                type="button"
                key={item}
                value={item}
                onClick={onClickCategory}
                className={`${
                  "전체" === item
                    ? "flex-row rounded-2xl m-0.5 p-1 border-2 w-[60px] cursor-pointer text-sm text-white bg-gray-950"
                    : "flex-row rounded-2xl m-0.5 p-1 border-2 w-[60px] cursor-pointer text-sm text-gray-950 bg-white"
                } text-bold`}
              >
                {item}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="fixed top-[88px] w-[390px] h-10 flex gap-[10px] justify-end items-center z-20 bg-white">
        <button
          onClick={() => onClickOrder("price_asc")}
          className={`${
            order === "price_asc" ? "text-blue-400" : "text-gray-800"
          } font-pretendard font-bold text-sm`}
        >
          낮은 가격순
        </button>

        <button
          onClick={() => onClickOrder("price_desc")}
          className={`${
            order === "price_desc" ? "text-blue-400" : "text-gray-800"
          } font-pretendard font-bold text-sm`}
        >
          높은 가격순
        </button>

        <button
          onClick={() => onClickOrder("date")}
          className={`${
            order === "date" ? "text-blue-400" : "text-gray-800"
          } font-pretendard font-bold text-sm`}
        >
          최신순
        </button>

        <button
          onClick={() => onClickOrder("end_time_asc")}
          className={`${
            order === "end_time_asc" ? "text-blue-400" : "text-gray-800"
          } font-pretendard font-bold text-sm`}
        >
          마감임박순
        </button>

        <button
          onClick={() => onClickOrder("bid_count_desc")}
          className={`${
            order === "bid_count_desc" ? "text-blue-400" : "text-gray-800"
          } font-pretendard font-bold text-sm`}
        >
          입찰 횟수 순
        </button>
      </div>
      <div className="item-center justify-center ml-4 mt-[85px] w-[93%] grid grid-cols-2 gap-2 font-pretendard">
        {auctionItem.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col justify-center mt-2 w-[170px] bg-white border border-gray-200 rounded-xl shadow ">
              <Link to={`/items/detail/${item.id}`}>
                <img
                  className="p-2 mt-2 m-auto rounded-3xl w-[150px] h-[150px] object-cover"
                  src={item.itemImages[0]}
                  alt="product image"
                />
              </Link>
              <div className="px-5 pb-5">
                <Link to={`/items/detail/${item.id}`}>
                  <h5 className="text-lg tracking-tight font-bold overflow-hidden text-ellipsis whitespace-nowrap text-gray-800">
                    {item.title}
                  </h5>
                </Link>
                <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                  <span className="text-sm mt-1">{item.content}</span>
                </div>
                <div className="flex flex-col items-start justify-center mt-2">
                  <div className="text-gray-500 text-sm">현재 입찰가</div>
                  <span className="text-md font-bold text-gray-800">
                    {item.presentPrice.toLocaleString()}
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute -top-[270px] -right-[33px] z-10 font-jalnan">
                    <ListTimer
                      endTime={item.auctionEndTime}
                      bidCount={item.bidCount}
                    />
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div ref={target}>
        {isLoading ? <Loading /> : <span className="text-white">dd</span>}
      </div>
    </div>
  );
}

export default AuctionList;
