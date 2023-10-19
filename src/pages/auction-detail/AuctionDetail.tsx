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
  const status = useRecoilValue(auctionStatus);
  console.log(status);

  // jwt 디코딩
  const token: string | null = localStorage.getItem("authorization");
  const decodedToken: IDecodeToken | null = token ? jwtDecode(token) : null;
  const userNickname: string = decodedToken ? decodedToken.nickname : "";

  return (
    <div className="w-[360px] h-[95%] py-4 ml-4 justify-center items-center">
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <div>
          <div>
            <img
              className="object-cover w-[360px] rounded-t-lg h-56"
              src={detailItem.itemImages[0]}
              alt=""
            />
            <div className="flex flex-col mt-4 ">
              <div className="flex flex-row items-center mb-3">
                <h5 className=" mr-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {detailItem.title}
                </h5>
                <CountdownTimer endTime={detailItem.auctionEndTime} />
              </div>
              <p className="mb-2 font-semibold text-gray-700 dark:text-gray-400">
                {detailItem.content}
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <span className=" text-gray-800 font-semibold">
                실시간 최고 입찰가 :: {detailItem.presentPrice} 원
              </span>
              <div className="flex flex-row font-semibold">
                <input
                  className="w-[250px] h-[40px] border-2 rounded-lg text-sm m-2"
                  type="number"
                  id="bid"
                  placeholder={` 최소 입찰 단위는 ${detailItem.minBidPrice}원 입니다.`}
                  value={bidAmount}
                  step={detailItem.minBidPrice}
                  onChange={onChange}
                />
                <button
                  type="submit"
                  onClick={onSubmit}
                  className="w-[120px] h-[39px] bg-gray-800 text-white rounded-lg mt-2 "
                >
                  입찰하기
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 font-semibold">
              <button
                onClick={likeBtn}
                className="w-[120px] h-[39px] bg-blue-600 text-white rounded-lg mt-2 "
              >
                관심 목록에 넣기
              </button>
              {userNickname === detailItem.nickname && !status ? (
                <Link to={`/items/modifier/${itemId}`}>
                  <button className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                    수정하기
                  </button>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuctionDetail;
