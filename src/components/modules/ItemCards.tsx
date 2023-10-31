import { memo } from "react";
import { Link } from "react-router-dom";
import { TopItemType } from "src/pages/hub/Mainpage";
import ListTimer from "../../pages/auction-list/ListTimer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css/scrollbar";
import "swiper/css";

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
      className="mySwiper w-[90%] flex flex-row"
    >
      {topItems.map((item: TopItemType) => (
        <SwiperSlide
          key={item.id}
          className="mt-1 rounded-xl border-gray-200 border shadow-lg mr-3"
        >
          <div className="w-full h-[235px] shadow-md rounded-xl">
            <Link to={`/items/detail/${item.id}`}>
              <img
                className="p-2 rounded-3xl w-[170px] h-[140px] object-cover"
                src={item.itemImages[0]}
                alt="product image"
              />
            </Link>
            <div className="px-3">
              <Link to={`/items/detail/${item.id}`}>
                <h5 className="text-lg font-bold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.title}
                </h5>
              </Link>
              <div className="text-sm text-gray-500 font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                <span>{item.content}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className=" font-semibold text-gray-900">
                  입찰가 : {item.presentPrice.toLocaleString()}
                </span>
              </div>
              <div className="relative">
                <div className="absolute -top-[215px] -right-[20px]">
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
