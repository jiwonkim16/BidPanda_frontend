import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IForm {
  title: string;
  content: string;
  price: number;
  timer: number;
  image: string;
}

function RegisterProduct() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<IForm>({
    defaultValues: {},
    mode: "onBlur",
  });
  console.log(watch());

  // 데이터가 유효할 경우 호출
  const onValid = (data: IForm) => {
    console.log(data);
    toast.success("상품이 등록되었습니다🔥");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("title", { required: "제품명은 필수입니다." })}
        type="text"
        placeholder="제품명을 입력하세요"
      />
      <span className="text-red-500">{errors.title?.message as string}</span>
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
      />
      <span className="text-red-500">{errors.content?.message as string}</span>
      <input
        {...register("price", {
          required: "시작 경매가는 필수입니다.",
          min: { message: "최소 경매가는 1원입니다.", value: "1" },
        })}
        type="number"
        placeholder="원하는 경매 시작가를 입력하세요"
      />
      <span className="text-red-500">{errors.price?.message as string}</span>
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
            <span className="font-semibold">버튼을 클릭하거나</span> 또는 드래그
          </p>
          <p className="text-xs text-gray-500">최대 3장까지 등록 가능합니다</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          multiple
          accept="image/*"
        />
      </label>
      {/* ------- */}
      <input
        {...register("timer", {
          required: "경매 마감기한 설정은 필수입니다.",
        })}
        type="range"
        min="1"
        max="5"
        placeholder="timer"
      />
      <span className="text-red-500">{errors.timer?.message as string}</span>
      <span>마감기한 : {getValues("timer")}DAY</span>
      <button>등록하기</button>
    </form>
  );
}

export default RegisterProduct;
