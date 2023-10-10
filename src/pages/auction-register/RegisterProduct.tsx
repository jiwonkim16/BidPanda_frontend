import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { categoryList } from "../../atoms/category";
import { auctionRegister } from "../../apis/auction-register/AuctionRegister";
import { useNavigate } from "react-router";

interface IForm {
  title: string;
  content: string;
  price: number;
  time: number;
  image: string;
  category: string;
}

function RegisterProduct() {
  const [images, setImages] = useState<File[]>([]);
  const categoryLi = useRecoilValue(categoryList);
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<IForm>({
    defaultValues: {},
    mode: "onBlur",
  });
  console.log(watch());
  // 카테고리 등록
  const onClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const category = event.currentTarget.value;
    setValue("category", category);
  };

  // 이미지 관련 로직
  // 이미지 onChange 함수
  const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length === 3) {
      toast.warning("등록 가능한 이미지 갯수를 초과했습니다.");
      return;
    }
    const imageFiles: FileList | null = event.target.files;

    if (imageFiles) {
      const newImages = [...images];
      for (let i = 0; i < imageFiles.length; i++) {
        newImages.push(imageFiles[i]);
      }
      setImages(newImages);
    }
  };
  console.log(images);

  // 데이터가 유효할 경우 호출
  const onValid = async (data: IForm) => {
    console.log(data);
    // 카테고리를 선택하지 않았다면 warning, return
    if (!data.category) {
      toast.warning("카테고리를 선택해주세요!");
      return;
    } else {
      // 서버로 데이터를 전달
      const formData = new FormData();
      formData.append(
        "itemRequestDto",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );
      for (let i = 0; i < images.length; i++) {
        formData.append("image", images[i]);
      }
      // 서버로부터 응답
      const response = await auctionRegister(formData);
      console.log(response);
      // 성공 알림
      toast.success("상품이 등록되었습니다🔥");
      // 리스트 페이지로 이동
      navigate("items/list");
      console.log(formData);
      reset();
    }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-extrabold">아이템 등록</h1>
      </div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("title", { required: "제품명은 필수입니다." })}
          type="text"
          placeholder="제품명을 입력하세요"
        />
        <br />
        <span className="text-red-500">{errors.title?.message as string}</span>
        <br />
        <input
          {...register("content", {
            required: "제품 설명은 필수입니다.",
            minLength: {
              message: "설명은 최소 10글자 이상이어야 합니다.",
              value: 10,
            },
          })}
          type="text"
          placeholder="제품 설명을 입력하세요. 단, 최소 10자 이상 작성해야 합니다."
          className="w-80"
        />
        <br />
        <span className="text-red-500">
          {errors.content?.message as string}
        </span>
        <br />
        <input
          {...register("price", {
            required: "시작 경매가는 필수입니다.",
            min: { message: "최소 경매가는 100원입니다.", value: "100" },
          })}
          type="number"
          step="100"
          placeholder="원하는 경매 시작가를 입력하세요"
          className="w-64"
        />
        <br />
        <span className="text-red-500">{errors.price?.message as string}</span>
        <br />
        <div className="flex justify-between">
          {categoryLi.map((item, index) => (
            <button
              type="button"
              key={index}
              value={item}
              onClick={onClickCategory}
              className="rounded-full bg-blue-500 w-11 cursor-pointer text-white"
            >
              {item}
            </button>
          ))}
        </div>
        <br />
        <span className="text-red-500">
          {errors.category?.message as string}
        </span>
        <br />
        {/* 이미지... */}
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-64 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">버튼을 클릭하거나</span> 또는
              드래그
            </p>
            <p className="text-xs text-gray-500">
              최대 3장까지 등록 가능합니다
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
            accept="image/*"
            onChange={addImage}
          />
        </label>
        {/* ------- */}
        <input
          {...register("time", {
            required: "경매 마감기한 설정은 필수입니다.",
          })}
          type="range"
          min="1"
          max="5"
          placeholder="timer"
        />
        <br />
        <span className="text-red-500">{errors.time?.message as string}</span>
        <br />
        <span>마감기한 : {getValues("time")}DAY</span>
        <br />
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          등록하기
        </button>
      </form>
    </>
  );
}

export default RegisterProduct;
