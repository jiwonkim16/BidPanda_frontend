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
    <>
      {isLoading ? (
        <div className="text-xl font-extrabold">Loading...</div>
      ) : (
        <div>
          <div>
            <h1 className="text-2xl font-extrabold mt-[20px]">상세페이지</h1>
          </div>
          <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={detailItem.itemImages[0]}
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {detailItem.title}😥
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {detailItem.content}
              </p>
            </div>
          </div>
          <div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
              <CountdownTimer endTime={detailItem.auctionEndTime} />
            </span>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
              현재 최고 입찰가 : {detailItem.presentPrice}
            </span>
            {/* 받아온 data의 닉네임과 현재 로그인된 유저의 닉네임이 같다면 아래 등록한 유저에 해당하는 태그,
                다르다면 아래 태그 */}
            {/* 입찰하는 사람의 입장 */}
            <div className="flex">
              <input
                className="w-80"
                type="number"
                placeholder={`최소 입찰 단위는 ${detailItem.minBidPrice}원 입니다.`}
                value={bidAmount}
                step={detailItem.minBidPrice}
                onChange={onChange}
              />
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  onClick={onSubmit}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  입찰하기
                </button>
                <Link to={"/"}>
                  <button className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                    뒤로 가기
                  </button>
                </Link>

                <button
                  onClick={likeBtn}
                  className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  찜!하기
                </button>
                {userNickname === detailItem.nickname && !status ? (
                  <Link to={`/items/modifier/${itemId}`}>
                    <button>수정하기</button>
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
