import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { categoryList } from "../../atoms/category";
import { useNavigate, useParams } from "react-router";
import { auctionModifier } from "../../apis/auction-modifier/AuctionModifier";
import { auctionDelete } from "../../apis/auction-detail/AuctionDelete";
import { useQuery } from "react-query";
import { auctionDetail } from "../../apis/auction-detail/AuctionDetail";
import { auctionStatus } from "../../atoms/auctionStatus";
import imageCompression from "browser-image-compression";

interface IForm {
  title: string;
  content: string;
  startPrice: number;
  minBidPrice: number;
  deadline: number;
  category: string;
  auctionStatus: string;
}

interface IAuctionDetail {
  auctionEndTime: string;
  auctionStatus: string;
  content: string;
  id: number;
  nickname: string;
  itemImages: string[];
  minBidPrice: number;
  presentPrice: number;
  title: string;
}

function ModifierProduct() {
  const [images, setImages] = useState<File[]>([]);
  const categoryLi = useRecoilValue(categoryList);
  const navigate = useNavigate();
  const params = useParams();
  const itemId = params.itemId;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm<IForm>({
    defaultValues: {},
    mode: "onBlur",
  });

  // 리액트 쿼리 사용해서 데이터 get
  const { data } = useQuery("auctionDetail", () =>
    auctionDetail(Number(params.itemId))
  );
  const detailItem: IAuctionDetail = data?.data;

  // 이미지 미리보기 관련 state
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // 로그인 유저가 아니면 로그인 페이지로~
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

  // 데이터가 유효할 경우 호출
  const onValid = async (data: IForm) => {
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
        formData.append("images", images[i]);
      }
      // 서버로부터 응답
      const response = await auctionModifier(params.itemId, formData);
      if (response?.status === 200) {
        // 성공 알림
        toast.success("상품이 등록되었습니다🔥");
        // 리스트 페이지로 이동
        navigate("/items/list");
        reset();
      }
    }
  };

  // 삭제하기 버튼 클릭
  const deleteItem = async () => {
    if (itemId !== undefined) {
      const response = await auctionDelete(itemId);
      if (response?.status === 200) {
        toast.error("삭제 완료");
        navigate("/keyword");
      }
    }
  };

  const status = useRecoilValue(auctionStatus);
  console.log(status);

  return (
    <>
      <div>
        <h1 className="text-2xl font-extrabold">아이템 수정</h1>
      </div>
      <form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="title">제품명</label>&nbsp;
        {detailItem?.title}
        <input
          {...register("title")}
          type="text"
          placeholder="제품명을 입력하세요"
          id="title"
        />
        <br />
        <span className="text-red-500">{errors.title?.message as string}</span>
        <br />
        <label htmlFor="content">상세설명</label>&nbsp;
        {detailItem?.content}
        <input
          {...register("content", {
            minLength: {
              message: "설명은 최소 10글자 이상이어야 합니다.",
              value: 10,
            },
          })}
          type="text"
          placeholder="제품 설명을 입력하세요. 단, 최소 10자 이상 작성해야 합니다."
          id="content"
          className="w-80"
        />
        <br />
        <span className="text-red-500">
          {errors.content?.message as string}
        </span>
        <br />
        <label htmlFor="startPrice">시작 경매가</label>&nbsp;
        {detailItem?.presentPrice}
        <input
          {...register("startPrice", {
            min: { message: "최소 경매가는 100원입니다.", value: "100" },
          })}
          type="number"
          step="100"
          placeholder="원하는 경매 시작가를 입력하세요"
          id="price"
          className="w-64"
        />
        &nbsp;
        <label htmlFor="minBidPrice">경매가 단위</label>&nbsp;
        {detailItem?.minBidPrice}
        <input
          {...register("minBidPrice", {
            required: "경매가 단위는 필수입니다.",
            min: { message: "최소 단위는 1원입니다.", value: "1" },
          })}
          type="number"
          id="minBidPrice"
          placeholder="원하는 경매가 단위를 입력하세요"
          className="w-64"
        />
        <br />
        <span className="text-red-500">
          {errors.startPrice?.message as string}
        </span>
        <br />
        <div className="flex justify-between">
          {categoryLi.map((item, index) => (
            <button
              type="button"
              key={index}
              value={item}
              onClick={onClickCategory}
              className={`rounded-full ${
                getValues("category") === item ? " bg-blue-500" : "bg-gray-300"
              } w-11 cursor-pointer text-white`}
            >
              {item}
            </button>
          ))}
        </div>
        <br />
        <span className="text-red-500">
          {errors.category?.message as string}
        </span>
        {/* 이미지... */}
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-[350px] h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400"
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
            {/* {<img src={detailItem?.itemImages[0]} />} */}
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
        <div className="w-[350px] h-32 bg-gray-100 border-none mt-4 flex justify-center items-center rounded-xl">
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`미리보기 ${index + 1}`}
              className="max-w-[115px] h-[128px] object-cover"
            />
          ))}
        </div>
        {/* ------- */}
        <label htmlFor="timer">마감 기한</label>
        <input
          {...register("deadline")}
          type="range"
          min="1"
          max="5"
          placeholder="timer"
          id="timer"
        />
        <br />
        <span className="text-red-500">
          {errors.deadline?.message as string}
        </span>
        <br />
        <span>마감기한 : {watch("deadline")}DAY</span>
        <div className="flex items-center justify-center mt-[10px]">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            수정하기
          </button>
          <button
            onClick={deleteItem}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-[10px]"
          >
            삭제하기
          </button>
        </div>
      </form>
    </>
  );
}

export default ModifierProduct;
