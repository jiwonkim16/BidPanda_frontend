import { useNavigate } from "react-router-dom";

const CategoriesIcon = () => {
  const categoryLi = [
    "/icons/total.webp",
    "/icons/sneakers.webp",
    "/icons/tech.webp",
    "/icons/fashion.webp",
    "/icons/pet.webp",
    "/icons/kids.webp",
    "/icons/living.webp",
    "/icons/hobby.webp",
  ];

  const navigate = useNavigate();
  const onClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const select = event.currentTarget.value.slice(12, 14);
    if (select === "전체") {
      navigate(`/items/list`);
    } else {
      navigate(`/items/list/${select}`);
    }
  };

  return (
    <>
      {categoryLi.map((item, index) => (
        <button
          key={index}
          value={item}
          className="w-[77px] h-[77px] shadow border p-[7px] border-gray-200 rounded-full m-1"
          onClick={onClickCategory}
        >
          <img src={item} className="rounded-2xl w-[60px] h-[60px]" />
        </button>
      ))}
    </>
  );
};
export default CategoriesIcon;
