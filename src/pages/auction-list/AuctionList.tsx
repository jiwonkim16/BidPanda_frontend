import { useRecoilValue, useSetRecoilState } from "recoil";
import { category, categoryList } from "../../atoms/category";
import ListTimer from "./ListTimer";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { auctionList } from "./../../apis/auction-list/AuctionList";
import Loading from "./../../components/assets/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css/scrollbar";
import "swiper/css";
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
  const categoryLi = useRecoilValue(categoryList);
  const setSelectCategory = useSetRecoilState(category);
  const navigate = useNavigate();
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
      <div className="flex justify-center fixed w-[390px] z-20 h-16">
        <Swiper
          scrollbar={{
            hide: true,
          }}
          slidesPerView={5.5}
          centeredSlides={false}
          modules={[Scrollbar]}
          className="flex w-full mySwiper -top-[62px] bg-white"
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
      <div className="item-center justify-center ml-4 mt-16 w-[93%] grid grid-cols-2 gap-2 font-pretendard">
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
        {loading ? <Loading /> : <span className="text-white">dd</span>}
      </div>
    </div>
  );
}

export default AuctionList;
