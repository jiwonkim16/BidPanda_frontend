import { Link } from "react-router-dom";
import CountdownTimer from "../../pages/auction-list/CountdownTimer";
import { memo } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
interface TopItemProps {
  topItems: Items[];
}

const rowVariants = {
  hidden: {
    x: window.innerWidth,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth - 500,
  },
};

const ItemCards = ({ topItems }: TopItemProps) => {
  const [index, setIndex] = useState(0);
  const increaseIndex = () => setIndex((prev) => prev + 1);
  console.log(index);
  return (
    <div>
      <div className="flex flex-row">
        <AnimatePresence>
          <motion.div
            className="flex gap-[5px] flex-row overflow-x-scroll"
            onClick={increaseIndex}
            key={index}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 2.2 }}
          >
            {topItems.map((item: Items) => (
              <div
                key={item.id}
                className="w-[170px] h-[240px] bg-white border border-gray-200 mt-1 mr-3 rounded-lg shadow"
              >
                <Link to={`/items/detail/${item.id}`}>
                  <img
                    className="p-2 rounded-lg w-[170px] h-[120px] object-cover"
                    src={item.itemImages[0]}
                    alt="product image"
                  />
                </Link>
                <div className="px-3">
                  <Link to={`/items/detail/${item.id}`}>
                    <h5 className="text-lg font-bold text-gray-900">
                      {item.title}
                    </h5>
                  </Link>
                  <div className="flex">
                    <span>
                      <CountdownTimer
                        endTime={item.auctionEndTime}
                        bidCount={item.bidCount}
                      />
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className=" font-semibold text-gray-900">
                      {item.presentPrice}원
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default memo(ItemCards);
