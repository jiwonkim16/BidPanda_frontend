import { useState } from "react";
import { Link } from "react-router-dom";

function AuctionDetail() {
  const [data, setData] = useState();
  const [price, setPrice] = useState("");
  const [like, setLike] = useState(false);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
    console.log(price);
  };
  const onSubmit = () => {
    console.log(price);
  };
  const likeBtn = () => {
    setLike((prev) => !prev);
  };
  // 리액트 쿼리 사용해서 데이터 get,
  // state에 저장 후 아래 JSX에 뿌리면 되고.. 만약 입찰을 한다면 price state를 서버로 put 요청을 보내야 함.
  // 찜하기 버튼도 마찬가지 클릭하면 서버로 like state가 true로 넘어가야..
  return (
    <>
      <div>
        <h1 className="text-2xl font-extrabold mt-[20px]">상세페이지</h1>
      </div>

      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src="/panda.jpg"
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            푸바오 가지마😥
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            중국 가서도 잘 살아야해.. 친구들 많이 만나고 좋은 엄마가 되렴😥😥
          </p>
        </div>
      </div>
      <div>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
          남은 시간 : 94:02:16
        </span>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
          현재 최고 입찰가 : $99999
        </span>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
          현재 입찰 수 : 999,999
        </span>
        {/* 입찰하는 사람의 입장 */}
        <div className="flex">
          <input
            type="number"
            placeholder="입찰할 가격을 입력하세요"
            value={price}
            step="100"
            min="100"
            onChange={onChange}
          />
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
          {!like ? (
            <button
              onClick={likeBtn}
              className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              찜!하기
            </button>
          ) : (
            <button
              onClick={likeBtn}
              className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              취소하기
            </button>
          )}
        </div>
        {/* 등록한 유저의 입장 */}
        {/* <div className="flex mt-[25px]">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            수정하기
          </button>
        </div> */}
      </div>
    </>
  );
}

export default AuctionDetail;
