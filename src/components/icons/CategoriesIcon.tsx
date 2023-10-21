import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { categoryList } from "../../atoms/category";

const CategoriesIcon = () => {
  const categoryLi = useRecoilValue(categoryList);
  const navigate = useNavigate();
  const onClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const select = event.currentTarget.value;
    navigate(`/items/list/${select}`);
  };
  return (
    <>
      {categoryLi.map((item, index) => (
        <button
          key={index}
          value={item}
          className="w-[76px] h-[76px] shadow-md border border-slate-100 rounded-[17px] font-semibold m-1"
          onClick={onClickCategory}
        >
          {item}
        </button>
      ))}
    </>
  );
};
export default CategoriesIcon;
