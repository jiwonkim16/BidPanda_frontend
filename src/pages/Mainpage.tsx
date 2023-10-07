import Categories from "../components/layouts/Categories";
import ItemCards from "../components/layouts/ItemCards";
import MobileLayout from "../components/layouts/MobileLayout";
import Nav from "../components/layouts/Nav";

const Main = () => {
  return (
    <MobileLayout>
      <Nav />
      <div className="flex justify-center mt-[18px] flex-wrap">
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
