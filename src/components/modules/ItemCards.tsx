import { memo } from "react";
import { Link } from "react-router-dom";
import { TopItemType } from "src/pages/hub/Mainpage";
import ListTimer from "../../pages/auction-list/ListTimer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css/scrollbar";
import "swiper/css";

/**
 * @author : Jiwon Kim
 * @returns : 메인페이지 아이템 카드에 대한 캐러셀 기능 구현 및 커스텀 (Swiper 활용)
 */

interface TopItemProps {
  topItems: TopItemType[];
}

const ItemCards = ({ topItems }: TopItemProps) => {
  return (
    <Swiper
      scrollbar={{
        hide: true,
      }}
      slidesPerView={2}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      centeredSlides={false}
      modules={[Scrollbar, Autoplay]}
      className="mySwiper w-[90%] h-[235px] flex flex-row"
    >
      {topItems.map((item: TopItemType, index) => (
        <SwiperSlide
          key={item.id}
          className="mt-1 rounded-xl h-[225px] border-gray-200 mr-3"
          style={{ fontFamily: "pretendard-bold" }}
        >
          <div className="w-full h-[225px] shadow-md border-[1.5px] rounded-xl">
            <Link to={`/items/detail/${item.id}`}>
              <img
                className="p-2 rounded-3xl w-[170px] h-[140px] object-cover"
                src={item.itemImages[0]}
                alt="product image"
              />
            </Link>
            <div className="px-3">
              <Link to={`/items/detail/${item.id}`}>
                <h5 className="text-lg  mb-1 text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.title}
                </h5>
              </Link>
              <div className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
                <span>{item.content}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-md w-[70%] text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.presentPrice.toLocaleString()}
                </span>
                <span className="text-sm ml-2  text-red-500">
                  {index + 1}위
                </span>
              </div>
              <div className="relative">
                <div
                  style={{ fontFamily: "jalnan" }}
                  className="absolute -top-[225px] -right-[20px] font-extralight"
                >
                  <ListTimer
                    endTime={item.auctionEndTime}
                    bidCount={item.bidCount}
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default memo(ItemCards);
