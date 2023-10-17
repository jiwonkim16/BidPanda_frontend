import React, { useEffect, useState, Suspense } from "react";
import { getTopTenListApi } from "../../apis/auction-list/TopTenList";
import Loading from "../../components/assets/Loading";
import ItemCards from "../../components/modules/ItemCards";
const Categories = React.lazy(
  () => import("../../components/modules/Categories")
);

/**
 * @author : Goya Gim
 * @returns : 메인페이지.
 */

const Main = () => {
  const [topItems, setTopItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTopTenListApi();
      if (data) {
        setTopItems(data);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <nav className="bg-gray-200 w-[390px] h-[210px]"></nav>
      <div className="flex justify-center mt-[13px] flex-wrap">
        <Suspense fallback={<Loading />}>
          <Categories />
        </Suspense>
      </div>
      <div className="flex flex-col justify-left mt-4 ml-5 flex-wrap font-bold text-gray-700">
        최고 낙찰가 상품
        <div>
          <ItemCards topItems={topItems} />
        </div>
      </div>
    </>
  );
};

export default Main;
