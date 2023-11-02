import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  auctionDetail,
  bidInfo,
  favoriteItem,
} from "../../apis/auction-detail/AuctionDetail";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { auctionStatus } from "../../atoms/auctionStatus";
import jwtDecode from "jwt-decode";
import Loading from "../../components/assets/Loading";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import CountdownTimer from "./../../components/modules/CountdownTimer";
import { auctionDelete } from "./../../apis/auction-detail/AuctionDelete";

interface IAuctionDetail {
  auctionEndTime: string;
  auctionStatus: string;
  content: string;
  id: number;
  nickname: string;
  itemImages: string[];
  minBidPrice: number;
  presentPrice: number;
  title: string;
  bidCount: number;
  bidderProfileImageUrls: string[];
}

interface IDecodeToken {
  nickname: string;
}

function AuctionDetail() {
  const params = useParams();
  const itemId = params.itemId;
  const [bidAmount, setBidAmount] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // jwt 디코딩
  const token: string | null = localStorage.getItem("authorization");
  const decodedToken: IDecodeToken | null = token ? jwtDecode(token) : null;
  const userNickname: string = decodedToken ? decodedToken.nickname : "";
  const status = useRecoilValue(auctionStatus);

  const [visible, setVisible] = useState(0);
  const nextBtn = () => {
    setVisible((prev) => (prev === 2 ? 2 : prev + 1));
  };
  const prevBtn = () => {
    setVisible((prev) => (prev === 0 ? 0 : prev - 1));
  };

  // 로그인 유저가 아니면 로그인 페이지로~

  useEffect(() => {
    const accessToken = localStorage.getItem("authorization");
    if (!accessToken) {
      toast.error("로그인 후 이용가능합니다.");
      navigate("/login");
    }
  }, []);

  // 리액트 쿼리 사용해서 데이터 get
  const { data, isLoading } = useQuery("auctionDetail", () =>
    auctionDetail(Number(itemId))
  );
  const detailItem: IAuctionDetail = data?.data;
  // 입찰가격 value
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBidAmount(event.target.value);
  };

  // 입찰하기 버튼 클릭
  const onSubmit = async () => {
    if (Number(bidAmount) >= 100000000) {
      toast.warning("최대 입찰가격 초과");
      setBidAmount("");
      return;
    }
    if (itemId !== undefined) {
      const response = await bidInfo({ bidAmount, itemId });
      if (response?.status === 200) {
        toast.success("입찰 완료");
        setBidAmount("");
        queryClient.refetchQueries("auctionDetail"); // 쿼리를 다시 실행해서 최신정보를 가져오도록 함.
      }
    }
  };

  // 찜하기 버튼 클릭
  const likeBtn = async () => {
    if (itemId !== undefined) {
      const response = await favoriteItem(itemId);
      if (response?.status === 200) {
        toast.success("찜하기 완료");
      }
    }
  };

  // 삭제하기 버튼 클릭
  const deleteItem = async () => {
    if (itemId !== undefined) {
      const response = await auctionDelete(itemId);
      if (response?.status === 200) {
        toast.error("삭제 완료");
        navigate("/keyword");
      }
    }
  };

  const box = {
    invisible: {
      x: 500,
      opacity: 0.3,
      scale: 0.5,
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
    exit: {
      x: -400,
      opacity: 0.3,
      scale: 0.5,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-[370px] h-[95%] py-4 justify-center items-center">
          <div>
            <div className="flex justify-center items-center ml-4">
              <button onClick={prevBtn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="2.0em"
                  viewBox="0 0 320 512"
                >
                  <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
              </button>
              <AnimatePresence>
                {[0, 1, 2].map((i) =>
                  i === visible ? (
                    <motion.img
                      variants={box}
                      initial="invisible"
                      animate="visible"
                      exit="exit"
                      key={i}
                      className="object-cover w-[336px] rounded-lg h-96"
                      src={
                        detailItem.itemImages && detailItem.itemImages[i]
                          ? detailItem.itemImages[i]
                          : "/noimage.png"
                      }
                      alt=""
                    />
                  ) : null
                )}
              </AnimatePresence>
              <button onClick={nextBtn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="2em"
                  viewBox="0 0 320 512"
                >
                  <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col mt-6 justify-center">
              <div className="flex items-center mb-2 justify-between">
                <h5 className="ml-4 w-fit font-pretendard text-2xl font-extrabold text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap">
                  {detailItem.title}
                </h5>
                <div className="mx-2 mb-1">
                  <CountdownTimer
                    endTime={detailItem.auctionEndTime}
                    bidCount={detailItem.bidCount}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex ml-4">
                <span className="font-pretendard text-xl font-extrabold -mt-1 text-gray-800">
                  {detailItem.presentPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between mt-4 ml-4">
                <div className="flex flex-row relative">
                  <div className="w-8 h-8 rounded-full border-gray-300 border absolute flex items-center justify-center -top-3">
                    <img
                      src={
                        detailItem.bidderProfileImageUrls[0] === undefined
                          ? "/defalut.webp"
                          : detailItem.bidderProfileImageUrls[0]
                      }
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full absolute left-5 -top-3 border-gray-300 border">
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={
                        detailItem.bidderProfileImageUrls[1] === undefined
                          ? "/defalut.webp"
                          : detailItem.bidderProfileImageUrls[1]
                      }
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full absolute left-10 -top-3 border-gray-300 border">
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={
                        detailItem.bidderProfileImageUrls[2] === undefined
                          ? "/defalut.webp"
                          : detailItem.bidderProfileImageUrls[2]
                      }
                    />
                  </div>
                  <span className="absolute left-20 -top-2 text-gray-500 font-pretendard text-lg font-bold">
                    +{detailItem.bidCount}
                  </span>
                </div>
                <div className="font-jalnan text-xs text-red-500 font-bold mr-2">
                  {detailItem.bidCount}명이 입찰 중
                </div>
              </div>
              <div className="flex flex-col font-semibold mt-4 ml-4">
                <div className="bg-gray-200 rounded-md h-60 flex items-center justify-center mt-4 overflow-hidden overflow-y-scroll scrollbar-hide">
                  <span className="font-pretendard text-md font-bold p-1">
                    {detailItem.content}
                  </span>
                </div>
                <input
                  className="w-full h-[40px] border-2 rounded-lg font-pretendard text-md font-bold mt-4"
                  type="number"
                  id="bid"
                  placeholder={` 최소 입찰 단위는 ${detailItem.minBidPrice}원 입니다`}
                  value={bidAmount}
                  step={detailItem.minBidPrice}
                  onChange={onChange}
                />
              </div>
              <div className="flex items-center justify-center gap-2 font-semibold ml-4 mt-4">
                <button
                  onClick={likeBtn}
                  className="w-[20%] h-[39px] bg-white font-jalnan text-[#278374] text-2xl rounded-lg border-2 border-[#278374]"
                >
                  ♥︎
                </button>
                <button
                  type="submit"
                  onClick={onSubmit}
                  className="w-[100%] h-[39px] bg-[#278374] text-white rounded-lg text-lg"
                >
                  입찰하기
                </button>
              </div>
              {userNickname === detailItem.nickname && !status ? (
                <div className="flex items-center justify-between mt-3 ml-8">
                  <Link to={`/items/modifier/${itemId}`}>
                    <button className="w-[170px] h-[39px] bg-yellow-500 text-white rounded-lg mr-4">
                      수정하기
                    </button>
                  </Link>
                  <button
                    onClick={deleteItem}
                    className="text-white w-[170px] h-[39px] bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-semibold rounded-lg px-5 py-2.5 text-center"
                  >
                    삭제하기
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AuctionDetail;
