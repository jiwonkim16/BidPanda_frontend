import Categories from "../../components/layouts/Categories";
import ItemCards from "../../components/layouts/ItemCards";
import MobileLayout from "../../components/layouts/MobileLayout";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <MobileLayout>
      <nav className="bg-gray-500 w-[390px] h-[230px] rounded-t-[37px] rounded-b-none">
        <button className="text-white text-xl mt-2 ml-[290px]">
          <Link to={"/login"}>login logo</Link>
        </button>
      </nav>
      <div className="flex justify-center mt-5 flex-wrap">
        <Categories />
      </div>
      <div className="flex flex-col justify-left mt-10 ml-8 flex-wrap font-bold text-gray-700">
        최고 낙찰가 상품
        <div>
          <ItemCards />
        </div>
      </div>
    </MobileLayout>
  );
};

export default Main;
