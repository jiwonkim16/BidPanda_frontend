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
      <div className="flex flex-col justify-left mt-4 ml-5 flex-wrap font-bold text-gray-700">
        최고 낙찰가 상품
        <div>
          <ItemCards topItems={topItems} />
        </div>
      </div>
    </div>
  );
};

export default Main;
