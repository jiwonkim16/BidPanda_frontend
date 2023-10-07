import { useState } from "react";

function AuctionList() {
  const categoryList = [
    "카테1",
    "카테2",
    "카테3",
    "카테4",
    "카테5",
    "카테6",
    "카테7",
    "카테8",
  ];
  const [auctionItem, setAuctionItem] = useState([]);
  // 데이터 받아와서 return해주고 state에 저장 / 또는 리액트 쿼리 사용!!!
  //   const auctionList = async ()=>{
  //     const response = await fetcher()
  //     setAuctionItem(response?.data)
  //   }

  // 카테고리 클릭 시 해당 카테고리 데이터만 필터 처리
  const onClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const select = event.currentTarget.value;
    auctionItem.filter((item) => item.category === select);
  };
  // 받아온 데이터를 auctionItem에 넣고 아래 JSX에 map으로 할당.
  return (
    <>
      {/* {auctionItem.map((item)=>{})} */}
      <div>
        <div className="title">
          <h1 className="text-3xl font-extrabold my-[20px]">
            Auction Item List
          </h1>
        </div>
        <div className="flex justify-center">
          {categoryList.map((item, index) => (
            <button
              type="button"
              key={index}
              value={item}
              onClick={onClickCategory}
              className="rounded-full bg-blue-500 w-11 cursor-pointer text-white"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <button>
            <img
              className="p-8 rounded-t-lg"
              src="/panda.jpg"
              alt="product image"
            />
          </button>
          <div className="px-5 pb-5">
            <button>
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                푸바오 가지마😥
              </h5>
            </button>
            <div className="flex items-center mt-2.5 mb-5">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                남은 시간 : 94:02:16
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                현재 입찰 수 : 999,999
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                $99999
              </span>
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                찜하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuctionList;
