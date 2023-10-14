import { useRecoilState, useRecoilValue } from "recoil";
import { category, categoryList } from "../../atoms/category";
import { useQuery } from "react-query";
import { auctionList } from "../../apis/auction-list/AuctionList";
import CountdownTimer from "./CountdownTimer";
import { Link, useNavigate } from "react-router-dom";
import { auctionStatus } from "../../atoms/auctionStatus";
import jwtDecode from "jwt-decode";

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

interface IDecodeToken {
  nickname: string;
}

function AuctionList() {
  const categoryLi = useRecoilValue(categoryList);
  const [selectCategory, setSelectCategory] = useRecoilState(category);
  const navigate = useNavigate();
  const status = useRecoilValue(auctionStatus);
  // --------------------------------
  // mutation 활용 데이터 최신화
  // const queryClient = useQueryClient();
  // const mutation = useMutation(auctionList, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("auctionList");
  //   },
  // });
  // mutation.mutate();
  //------------------------------------
  // jwt 디코딩
  const token: string | null = localStorage.getItem("authorization");
  const decodedToken: IDecodeToken | null = token ? jwtDecode(token) : null;
  const userNickname: string = decodedToken ? decodedToken.nickname : "";
  // -----------------------------------
  const { data, isLoading } = useQuery("auctionList", auctionList);
  const auctionItem: IAuction[] = data?.content;
  // console.log(auctionItem);

  // ------------------------------------------------------
  // 카테고리 클릭 시 해당 카테고리 데이터만 필터 처리 로직
  // 카테고리 버튼을 눌렀을 때 state로 관리, response는 해당 카테고리의 데이터들.
  const onClickCategory = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const select = event.currentTarget.value;
    setSelectCategory(select);
    navigate(`/items/list/${select}`);
  };

  // -----------------------------------------------------
  // 받아온 데이터를 auctionItem에 넣고 아래 JSX에 map으로 할당.
  return (
    <>
      {isLoading ? <div>Loading...</div> : null}

      <div>
        <div className="title">
          <h1 className="text-3xl font-extrabold my-[20px]">
            Auction Item List
          </h1>
        </div>
        <div className="flex justify-center">
          {categoryLi.map((item, index) => (
            <button
              type="button"
              key={index}
              value={item}
              onClick={onClickCategory}
              className={`rounded-full ${
                selectCategory === item ? " bg-blue-500" : "bg-gray-300"
              } w-11 cursor-pointer text-white`}
            >
              {item}
            </button>
          ))}
        </div>
        {/* 데이터가 로드되기 전에 렌더링을 막기 위해 아래와 같은 조건문을 사용. auctionItem이 존재하는 경우에만 map 함수 호출. */}
        {auctionItem &&
          auctionItem.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-center w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <Link
                to={
                  item.nickname === userNickname
                    ? status
                      ? `/items/detail/${item.id}`
                      : `/items/modifier/${item.id}`
                    : `/items/detail/${item.id}`
                }
              >
                <img
                  className="p-4 ml-[10px] rounded-lg w-[360px] h-[200px] object-cover"
                  src={item.itemImages[0]}
                  alt="product image"
                />
              </Link>
              <div className="px-5 pb-5">
                <Link
                  to={
                    item.nickname === userNickname
                      ? status
                        ? `/items/detail/${item.id}`
                        : `/items/modifier/${item.id}`
                      : `/items/detail/${item.id}`
                  }
                >
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {item.title}😥
                  </h5>
                </Link>
                <div className="flex items-center mt-2.5 mb-5">
                  <span>
                    {
                      <CountdownTimer
                        endTime={item.auctionEndTime}
                        bidCount={item.bidCount}
                      />
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    현재 입찰가 : {item.presentPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default AuctionList;
