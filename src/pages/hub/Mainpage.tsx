import { useEffect, useState } from "react";
import { getTopTenListApi } from "../../apis/auction-list/TopTenList";
import ItemCards from "../../components/modules/ItemCards";
import Categories from "../../components/modules/Categories";

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
      <div className="py-1">
        <nav id="banner" className=" w-[390px] h-[210px] -mt-3">
          <img
            src="src/imgs/sampleBann.jpeg"
            className="h-full max-w-fit"
            alt="banner"
          />
        </nav>
        <div className="flex justify-center mt-[13px] flex-wrap">
          <Categories />
        </div>
      </div>
      <div>최고 낙찰가 상품</div>
      <div className="flex items-center justify-start flex-wrap mt-4 ml-3 font-bold text-gray-700">
        <ItemCards topItems={topItems} />
      </div>
    </>
  );
};

export default Main;
