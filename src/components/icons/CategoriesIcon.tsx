import { useNavigate } from "react-router-dom";
// import { useRecoilValue } from "recoil";
// import { categoryList } from "../../atoms/category";

const CategoriesIcon = () => {
  const categoryLi = [
    "/category2/전체.webp",
    "/category2/신발.webp",
    "/category2/테크.webp",
    "/category2/패션.webp",
    "/category2/펫.webp",
    "/category2/유아.webp",
    "/category2/리빙.webp",
    "/category2/취미.webp",
  ];
  // const categoryLi = useRecoilValue(categoryList);
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
          // value={item}
          className="w-[76px] h-[76px] shadow-md border p-[7px] border-slate-100 rounded-full font-semibold m-1"
          onClick={onClickCategory}
        >
          <img src={item} className="rounded-2xl w-[60px] h-[60px]" />
        </button>
      ))}
    </>
  );
};
export default CategoriesIcon;
