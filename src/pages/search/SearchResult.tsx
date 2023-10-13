import { Link } from "react-router-dom";
import CountdownTimer from "../auction-list/CountdownTimer";
import { useRecoilValue } from "recoil";
import { auctionStatus } from "../../atoms/auctionStatus";
import jwtDecode from "jwt-decode";
// 검색 결과로 나온 상품의 닉네임과 JWT의 닉네임이 일치하고
// status가 false일 때 수정 페이지로 이동하고,
// 닉네임이 다르면 항상 상세 페이지로 이동.
// 그리고 상태가 true이면 닉네임 동일여부와 상관없이 항상 상세 페이지로 이동

interface IDecodeToken {
  nickname: string;
}

function SearchResult({ result }: any) {
  // jwt 디코딩
  const token: string | null = localStorage.getItem("authorization");
  const decodedToken: IDecodeToken | null = token ? jwtDecode(token) : null;
  const userNickname: string = decodedToken ? decodedToken.nickname : "";

  const status = useRecoilValue(auctionStatus);

  return (
    <>
      {result?.map((item: any) => (
        <div
          key={item.id}
          className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
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
              className="p-8 rounded-t-lg"
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
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                {<CountdownTimer endTime={item.auctionEndTime} />}
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
    </>
  );
}

export default SearchResult;
