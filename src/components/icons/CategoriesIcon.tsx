import { useNavigate } from "react-router-dom";

const CategoriesIcon = () => {
  const categoryLi = [
    "/categories/전체.webp",
    "/categories/신발.webp",
    "/categories/테크.webp",
    "/categories/패션.webp",
    "/categories/애견.webp",
    "/categories/유아.webp",
    "/categories/리빙.webp",
    "/categories/취미.webp",
  ];

  const navigate = useNavigate();
  const onClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const select = event.currentTarget.value.slice(12, 14);
    navigate(`/items/list/${select}`);
  };

  return (
    <>
      {categoryLi.map((item, index) => (
        <button
          key={index}
          value={item}
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
