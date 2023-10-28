import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryList } from "../../atoms/category";
import { category } from "../../atoms/category";
import { auctionRegister } from "../../apis/auction-register/AuctionRegister";
import { useNavigate } from "react-router";
import imageCompression from "browser-image-compression";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css/scrollbar";
import "swiper/css";

interface IForm {
  title: string;
  content: string;
  startPrice: number;
  minBidPrice: number;
  deadline: number;
  category: string;
  auctionStatus: string;
}

function RegisterProduct() {
  const [selectCategory, setSelectCategory] = useRecoilState(category);
  const [images, setImages] = useState<File[]>([]);
  const categoryLi = useRecoilValue(categoryList);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<IForm>({
    defaultValues: {},
    mode: "onBlur",
  });
  // 이미지 미리보기 관련 state
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // 로그인된 유저가 아니면 로그인 페이지로~
  useEffect(() => {
    const accessToken = localStorage.getItem("authorization");
    if (!accessToken) {
      toast.error("로그인 후 이용가능합니다.");
      navigate("/login");
    }
  }, []);

  // 카테고리 등록
  const onClickCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const category = event.currentTarget.value;

    setSelectCategory(category);
    setValue("category", category);
  };

  // 이미지 관련 로직
  // 이미지 onChange 함수
  const addImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length === 3) {
      toast.warning("등록 가능한 이미지 갯수를 초과했습니다.");
      return;
    }
    const imageFiles: FileList | null = event.target.files;

    if (imageFiles) {
      const newImages = [...images];
      const previews = imagePreviews.slice(); // 이미지 미리보기 배열의 복사본
      for (let i = 0; i < imageFiles.length; i++) {
        try {
          // 이미지를 상태에 추가하기 전에 이미지를 압축합니다.
          const compressedImage = await imageCompression(imageFiles[i], {
            maxSizeMB: 0.5, // 필요에 따라 최대 크기를 조정하세요.
            maxWidthOrHeight: 800, // 필요에 따라 최대 너비 또는 높이를 조정하세요.
          });
          newImages.push(compressedImage);
          previews.push(URL.createObjectURL(compressedImage)); // 이미지 미리보기 URL 생성
        } catch (error) {
          console.error("이미지 압축 중 오류:", error);
          toast.error("이미지 압축 중 오류가 발생했습니다.");
        }
      }

      setImages(newImages);
      setImagePreviews(previews);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  // 데이터가 유효할 경우 호출
  const onValid = async (data: IForm) => {
    // 카테고리를 선택하지 않았다면 warning, return
    if (!data.category || data.category === "전체") {
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
        formData.append("images", images[i]);
      }
      // 서버로부터 응답
      const response = await auctionRegister(formData);
      if (response?.status === 200) {
        // 성공 알림
        toast.success("상품이 등록되었습니다🔥");
        // 리스트 페이지로 이동
        navigate("/items/list");
        reset();
      } else {
        toast.error("이미지를 첨부해주세요~");
      }
    }
  };

  return (
    <div className="flex flex-col py-3">
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col justify-center items-center"
      >
        <Swiper
          scrollbar={{
            hide: true,
          }}
          slidesPerView={6}
          centeredSlides={false}
          modules={[Scrollbar]}
          className="flex w-full mb-3 mySwiper"
        >
          {categoryLi.map((item) => (
            <SwiperSlide key={item}>
              <button
                type="button"
                // key={item}
                value={item}
                onClick={onClickCategory}
                className={`${
                  selectCategory === item
                    ? "flex-row rounded-2xl m-0.5 p-1 border-2 w-[60px] cursor-pointer text-sm text-white bg-gray-950"
                    : "flex-row rounded-2xl m-0.5 p-1 border-2 w-[60px] cursor-pointer text-sm text-gray-950"
                } `}
              >
                {item}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
        <span className="text-red-500 font-semibold text-[14px]">
          {errors.category?.message as string}
        </span>
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-[350px] h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 my-2"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-800 dark:text-gray-400"
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
            <p className="mb-2 text-sm text-gray-800 dark:text-gray-400">
              <span className="font-semibold">버튼을 클릭하세요!</span>
            </p>
            <p className="text-xs text-gray-500">
              최대 3장까지 등록 가능합니다.
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
        {/* 이미지 미리보기 섹션 */}
        <div className="w-[350px] h-32 bg-gray-50 border-none my-2 flex justify-center items-center rounded-xl">
          {imagePreviews.map((preview, index) => (
            <div key={index + 1} className="relative">
              <img
                src={preview}
                alt={`미리보기 ${index + 1}`}
                className="max-w-[115px] h-[128px] object-cover"
              />
              <button
                className="absolute top-2 right-2 text-red-500 cursor-pointer"
                onClick={() => removeImage(index)}
              >
                x
              </button>
            </div>
          ))}
        </div>
        <input
          {...register("title", { required: "제품명은 필수입니다." })}
          type="text"
          id="title"
          placeholder="상품 이름"
          className="w-[350px] h-[35px] border-none bg-[#b8e994] text-black rounded-lg my-2 text-center"
        />
        <span className="text-red-500 font-semibold text-[14px]">
          {errors.title?.message as string}
        </span>
        <textarea
          {...register("content", {
            required: "제품 설명은 필수입니다.",
            minLength: {
              message: "설명은 최소 10글자 이상이어야 합니다.",
              value: 10,
            },
          })}
          id="desc"
          placeholder="상품 설명은 최소 10자 이상 작성해야 합니다."
          className="w-[350px] h-[80px] border-none bg-[#b8e994] text-black text-center rounded-lg my-2 overflow-y-auto"
        />
        <span className="text-red-500 font-semibold text-[14px]">
          {errors.content?.message as string}
        </span>
        <div className="flex flex-col justify-center w-[350px] font-semibold my-2">
          <div>마감기한 설정</div>
          <div>
            <input
              {...register("deadline", {
                required: "경매 마감기한 설정은 필수입니다.",
              })}
              type="range"
              id="dueDate"
              min="1"
              max="5"
              className="mt-2 w-[280px] h-2 bg-gray-500 rounded-lg appearance-none cursor-pointer"
            />
            <span className="font-semibold mx-2">{watch("deadline")} Days</span>
          </div>
          <span className="text-red-500 font-semibold text-[14px]">
            {errors.deadline?.message as string}
          </span>
        </div>
        <div className="flex flex-col justify-center w-[350px] my-2">
          <span>경매 시작 가격</span>
          <input
            {...register("startPrice", {
              required: "시작 경매가는 필수입니다.",
              min: { message: "최소 경매가는 1원입니다.", value: "1" },
            })}
            type="number"
            id="valueForStart"
            placeholder=" 경매 시작가"
            className="w-[350px] h-[35px] border-2 rounded-lg mx-1"
          />
          <div className="my-3">
            <span>경매가 최소 단위</span>
            <input
              {...register("minBidPrice", {
                required: "경매가 단위는 필수입니다.",
                min: { message: "최소 단위는 1원입니다.", value: "1" },
              })}
              type="number"
              id="valuePerBid"
              placeholder=" 경매가 단위"
              className="w-[350px] h-[35px] border-2 rounded-lg mt-1 mb-2 mx-1"
            />
          </div>
        </div>
        <span className="text-red-500 font-semibold text-[14px]">
          {errors.startPrice?.message as string}
        </span>
        <div className="flex justify-center items-center">
          <button className="w-[350px] h-[40px] bg-[#009432] text-white font-semibold rounded-lg mr-2 ">
            경매 시작하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterProduct;
