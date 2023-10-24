import { useNavigate } from "react-router-dom";
// import { useRecoilValue } from "recoil";
// import { categoryList } from "../../atoms/category";

const CategoriesIcon = () => {
  const categoryLi = [
    "/_가전.wp2",
    "/_신발.wp2",
    "/_유아.wp2",
    "/_전체.wp2",
    "/_취미.wp2",
    "/_테크.wp2",
    "/_패션.wp2",
    "/_펫.wp2",
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
          className="w-[76px] h-[76px] shadow-md border border-slate-100 rounded-[17px] font-semibold m-1"
          onClick={onClickCategory}
        >
          <img src={item} />
        </button>
      ))}
    </>
  );
};
export default CategoriesIcon;
