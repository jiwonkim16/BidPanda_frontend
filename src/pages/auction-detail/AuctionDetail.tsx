import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  auctionDetail,
  bidInfo,
  favoriteItem,
} from "../../apis/auction-detail/AuctionDetail";
import CountdownTimer from "../auction-list/CountdownTimer";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { auctionStatus } from "../../atoms/auctionStatus";
import jwtDecode from "jwt-decode";
import Loading from "../../components/assets/Loading";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";


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
    console.log(visible);
  };
  const prevBtn = () => {
    setVisible((prev) => (prev === 0 ? 0 : prev - 1));
    console.log(visible);
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
      opacity: 0,
      scale: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 2,
      },
    },
    exit: {
      x: -500,
      opacity: 0,
      scale: 0,
      transition: { duration: 1 },
    },
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <div className="w-[360px] h-[95%] py-4 ml-4 justify-center items-center">
          <div>
            <AnimatePresence>
              {[0, 1, 2].map((i) =>
                i === visible ? (
                  <motion.img
                    variants={box}
                    initial="invisible"
                    animate="visible"
                    exit="exit"
                    key={i}
                    className="object-cover w-[360px] rounded-t-lg h-56"
                    src={detailItem.itemImages[i]}
                    alt=""
                  />
                ) : null
              )}
            </AnimatePresence>
            <button onClick={nextBtn}>Next</button>
            <button onClick={prevBtn}>prev</button>
            <div className="flex flex-col mt-4 ">
              <div className="flex flex-row items-center mb-3">
                <h5 className=" mr-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {detailItem.title}
                </h5>
                <CountdownTimer endTime={detailItem.auctionEndTime} /
              </div>
            </div>
            <div>
              <div className="flex flex-col">
                <span className=" text-gray-800 font-semibold">
                  실시간 최고 입찰가 :: {detailItem.presentPrice} 원
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
                  className="w-[110px] h-[39px] bg-red-500 text-white rounded-lg mt-2 "
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
