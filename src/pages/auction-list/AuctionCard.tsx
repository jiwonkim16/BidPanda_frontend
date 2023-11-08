import { useEffect, useRef, useState } from "react";
import { auctionCategory } from "../../apis/auction-list/AuctionList";
import ListTimer from "../auction-list/ListTimer";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { category, categoryList } from "../../atoms/category";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css/scrollbar";
import "swiper/css";
import Loading from "./../../components/assets/Loading";

/**
 * @author : Jiwon Kim
 * @returns : 각 카테고리별 상품 리스트 페이지로 세부 기능은 아래와 같습니다.
 * 인피니티 스크롤링, 쿼리dsl을 적용해서 쿼리스트링의 값으로 필터링 기능, 카테고리 버튼 케러셀 기능, 카테고리별 아이템 조회 구현
 */

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
  // 상품들의 정보를 관리하는 state
  const [auctionData, setAuctionData] = useState<IAuction[]>([]);
  const params = useParams();
  const navigate = useNavigate();

  // URL에서 category 값을 추출해서 할당
  const categoryIcon: string | undefined = params?.category;

  // Recoil의 categoryList 상태를 가져와서 할당하고 catergory 상태를 업데이트 하는 함수 생성
  const categoryLi = useRecoilValue(categoryList);
  const setSelectCategory = useSetRecoilState(category);

  // 무한스크롤 구현을 위해 사용한 Intersection Observer의 대상이 될 요소를 참조하는 target 생성
  const target = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(false);

  // 페이지 번호를 관리하는 page를 참조하는 ref를 생성하고 초기값 설정
  const page = useRef(1);

  // 현재 URL의 위치를 구독하고 이를 통해 현재 URL의 쿼리 매개변수를 가져옴
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 정렬버튼 클릭 시 URL을 변경하고 페이지를 새로고침함.(UI 리렌더링을 강제함)
  const onClickOrder = (newOrder: string) => {
    navigate(`?auctionIng=true&order=${newOrder}`);
    window.location.href = `?auctionIng=true&order=${newOrder}`;
  };

  // 현재 URL에서 order 쿼리 매개변수 값을 추출
  const order = queryParams.get("order");

  // 상품 리스트를 가져오는 함수로, 페이지 수와 정렬 순서, 카테고리에 따라 데이터를 가져오고 상태를 업데이트
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await auctionCategory(categoryIcon, page.current, order);
      if (response.content.length >= auctionData.length) {
        setAuctionData((prev) => [...prev, ...response.content]);
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

  // categoryIcon 값이 변경될 때마다 실행하며, 전체 카테고리 선택 시 경로를 변경
  useEffect(() => {
    if (categoryIcon === "전체") {
      navigate(`/items/public-search`);
    }
  }, [categoryIcon]);

  // categoryIcon 값이 변경될 때마다 실행하며, intersection observer를 등록하고 컴포넌트 언마운트 시 observer를 해제
  useEffect(() => {
    if (target.current) {
      observer.observe(target.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [categoryIcon]);

  // intersection observer를 생성하고 무한 스크롤을 구현하는 함수를 정의
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

  // 카테고리 버튼 클릭 시 선택한 카테고리에 따라 페이지를 이동하고 상태를 업데이트
  const onClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const select = event.currentTarget.value;
    if (select === categoryIcon) {
      // 선택한 카테고리가 현재 카테고리와 같을 경우 아무 작업도 하지 않음
      return;
    }
    setSelectCategory(select);
    page.current = 1;
    setAuctionData([]);
    navigate(`/items/list/${select}`);
  };

  return (
    <>
      <div className="flex justify-center fixed w-[390px] z-20 h-14 top-[49px]">
        <Swiper
          scrollbar={{
            hide: true,
          }}
          slidesPerView={5.5}
          centeredSlides={false}
          modules={[Scrollbar]}
          className="flex w-full mySwiper top-[2.5px] bg-white"
        >
          {categoryLi.map((item) => (
            <SwiperSlide key={item}>
              <button
                type="button"
                key={item}
                value={item}
                onClick={onClickCategory}
                className={`${
                  categoryIcon === item
                    ? "flex-row rounded-2xl m-0.5 p-1 border-2 w-[60px] cursor-pointer text-sm text-white bg-gray-950"
                    : "flex-row rounded-2xl m-0.5 p-1 border-2 w-[60px] cursor-pointer text-sm text-gray-950 bg-white"
                } text-bold `}
              >
                {item}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="fixed top-[89px] w-[390px] h-10 flex gap-[10px] justify-end items-center z-20 bg-white">
        <button
          onClick={() => onClickOrder("price_asc")}
          className={`${
            order === "price_asc" ? "text-blue-400" : "text-black"
          } font-pretendard font-extrabold text-sm`}
        >
          낮은 가격순
        </button>

        <button
          onClick={() => onClickOrder("price_desc")}
          className={`${
            order === "price_desc" ? "text-blue-400" : "text-black"
          } font-pretendard font-extrabold text-sm`}
        >
          높은 가격순
        </button>

        <button
          onClick={() => onClickOrder("date")}
          className={`${
            order === "date" ? "text-blue-400" : "text-black"
          } font-pretendard font-extrabold text-sm`}
        >
          최신순
        </button>

        <button
          onClick={() => onClickOrder("end_time_asc")}
          className={`${
            order === "end_time_asc" ? "text-blue-400" : "text-black"
          } font-pretendard font-extrabold text-sm`}
        >
          마감임박순
        </button>

        <button
          onClick={() => onClickOrder("bid_count_desc")}
          className={`${
            order === "bid_count_desc" ? "text-blue-400" : "text-black"
          } font-pretendard font-extrabold text-sm`}
        >
          입찰 횟수 순
        </button>
      </div>
      <div className="item-center justify-center ml-4 mt-[85px] w-[93%] grid grid-cols-2 font-pretendard gap-2">
        {auctionData.map((item: IAuction) => (
          <div
            key={item.id}
            className="flex flex-col justify-center mt-2 w-[170px] bg-white border border-gray-200 rounded-lg shadow "
          >
            <Link to={`/items/detail/${item.id}`}>
              <img
                className="p-2 m-auto rounded-3xl w-[150px] h-[150px] object-cover"
                src={item.itemImages[0]}
                alt="product image"
              />
            </Link>
            <div className="px-5 pb-5">
              <Link to={`/items/detail/${item.id}`}>
                <h5 className="text-lg tracking-tight overflow-hidden text-ellipsis whitespace-nowrap font-bold text-gray-800">
                  {item.title}
                </h5>
              </Link>
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                <span className="text-sm mt-1">{item.content}</span>
              </div>
              <div className="flex flex-col items-start justify-center">
                <div className="text-gray-500 text-sm">현재 입찰가</div>
                <span className="text-md font-bold text-gray-900">
                  {item.presentPrice.toLocaleString()}
                </span>
              </div>
              <div className="relative">
                <div className="absolute -top-[260px] -right-[35px] z-10 font-jalnan">
                  <ListTimer
                    endTime={item.auctionEndTime}
                    bidCount={item.bidCount}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div ref={target}>
        {loading ? <Loading /> : <span className="text-white">dd</span>}
      </div>
    </>
  );
}

export default AuctionCard;
