import { useEffect, useRef, useState } from "react";
import { auctionCategory } from "../../apis/auction-list/AuctionList";
import ListTimer from "../auction-list/ListTimer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { category, categoryList } from "../../atoms/category";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css/scrollbar";
import "swiper/css";
import Loading from "./../../components/assets/Loading";
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
  const categoryIcon: any = params?.category?.slice(2, 4);
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
    if (categoryIcon === "") {
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
      <div className="flex justify-center w-full mt-3">
        <Swiper
          scrollbar={{
            hide: true,
          }}
          slidesPerView={5}
          centeredSlides={false}
          modules={[Scrollbar]}
          className="flex w-full mb-3 mySwiper"
        >
          {categoryLi.map((item) => (
            <SwiperSlide key={item}>
              <button
                type="button"
                key={item}
                value={item}
                onClick={onClickCategory}
                className={`${
                  selectCategory === item
                    ? "flex-row rounded-2xl m-0.5 p-1 border-2 w-[60px] cursor-pointer text-sm text-white bg-gray-950"
                    : "flex-row rounded-2xl m-0.5 p-1 border-2 w-[60px] cursor-pointer text-sm text-gray-950"
                } text-white`}
              >
                {item}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-[100%] grid grid-cols-2 gap-2">
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
                <h5 className="text-lg font-semibold tracking-tight overflow-hidden text-ellipsis whitespace-nowrap text-gray-900">
                  {item.title}
                </h5>
              </Link>
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                <span className="text-sm">{item.content}</span>
              </div>
              <div className="flex flex-col items-start justify-center">
                <div className="text-gray-500">현재 입찰가</div>
                <span className="text-md font-bold text-gray-900">
                  {item.presentPrice.toLocaleString()}
                </span>
              </div>
              <div className="relative">
                <div className="absolute -top-[270px] -right-[40px]">
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
