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
import CountdownTimer from "../auction-list/ListTimer";

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
        <div className="w-[370px] h-[95%] py-4 ml-4 justify-center items-center">
          <div>
            <div className="flex">
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
                      className="object-cover w-[320px] rounded-lg h-56"
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
            <div className="flex flex-col mt-4 ">
              <div className="flex items-center mb-3">
                <h5 className="mr-3 w-fit text-xl font-bold text-gray-900">
                  {detailItem.title}
                </h5>
                <div>
                  <CountdownTimer endTime={detailItem.auctionEndTime} />
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col">
                <span className=" text-gray-800 font-semibold">
                  실시간 최고 입찰가 : {detailItem.presentPrice} 원
                </span>
                <div className="flex flex-row font-semibold">
                  <input
                    className="w-[243px] h-[40px] border-2 rounded-lg text-sm mt-2"
                    type="number"
                    id="bid"
                    placeholder={` 최소 입찰 단위는 ${detailItem.minBidPrice}원 입니다`}
                    value={bidAmount}
                    step={detailItem.minBidPrice}
                    onChange={onChange}
                  />
                  <button
                    type="submit"
                    onClick={onSubmit}
                    className="w-[110px] h-[39px] bg-gray-800 text-white rounded-lg ml-2 mt-2 "
                  >
                    입찰하기
                  </button>
                </div>
              </div>
              <div className="flex flex-row-reverse gap-2 font-semibold">
                <button
                  onClick={likeBtn}
                  className="w-[110px] h-[39px] bg-red-500 text-white rounded-lg mt-2 mr-[9px] "
                >
                  관심 목록
                </button>
                {userNickname === detailItem.nickname && !status ? (
                  <Link to={`/items/modifier/${itemId}`}>
                    <button className="w-[110px] h-[39px] bg-gray-600 text-white rounded-lg mt-2">
                      수정하기
                    </button>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AuctionDetail;
