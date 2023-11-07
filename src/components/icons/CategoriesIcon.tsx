import { useNavigate } from "react-router-dom";

const CategoriesIcon = () => {
  const categoryLi = [
    "/icons/전체.webp",
    "/icons/신발.webp",
    "/icons/테크.webp",
    "/icons/패션.webp",
    "/icons/반려.webp",
    "/icons/유아.webp",
    "/icons/리빙.webp",
    "/icons/취미.webp",
  ];

  const navigate = useNavigate();
  const onClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const select = event.currentTarget.value.slice(7, 9);
    if (select === "전체") {
      navigate(`/items/public-search`);
    } else {
      navigate(`/items/list/${select}`);
    }
  };

  return (
    <>
      {categoryLi.map((item, index) => (
        <>
          <button
            key={index}
            value={item}
            className="w-[70px] h-[70px] shadow border p-[7px] border-gray-200 rounded-2xl mx-1 mb-7"
            onClick={onClickCategory}
          >
            <img
              src={item}
              className="rounded-2xl w-full h-full mb-[10px] object-cover"
            />
            <span className="font-pretendard font-bold text-gray-800">
              {item.slice(7, 9)}
            </span>
          </button>
        </>
      ))}
    </>
  );
};
export default CategoriesIcon;
