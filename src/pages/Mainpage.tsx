import Categories from "../components/layouts/Categories";
import ItemCards from "../components/layouts/ItemCards";

const Main = () => {
  return (
    <>
      <nav className="bg-gray-500 w-[390px] h-[200px]  rounded-b-none"></nav>
      <div className="flex justify-center mt-[18px] flex-wrap">
        <Categories />
      </div>
      <div className="flex flex-col justify-left mt-10 ml-8 flex-wrap font-bold text-gray-700">
        최고 낙찰가 상품
        <div>
          <ItemCards />
        </div>
      </div>
    </>
  );
};

export default Main;
