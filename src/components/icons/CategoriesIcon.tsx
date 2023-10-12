
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { category, categoryList } from "../../atoms/category";

const CategoriesIcon = () => {
  const [selectCategory, setSelectCategory] = useRecoilState(category);
  const categoryLi = useRecoilValue(categoryList);
  const onClickCategory = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const select = event.currentTarget.value;
    setSelectCategory(select);
  };
  return (
    <>
      {categoryLi.map((item, index) => (
        <Link to={`/items/list/${selectCategory}`}>
          <button
            key={index}
            className="w-[76px] h-[76px] shadow-md rounded-[17px] m-1"
            onClick={onClickCategory}
          >
            {item}
          </button>
        </Link>
      ))}

    </>
  );
};
export default CategoriesIcon;
