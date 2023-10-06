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
    // 서버로 데이터를 전달
    console.log(data);

    // response status === 200 이면..toast
    toast.success("상품이 등록되었습니다🔥");
    // 리스트 페이지로 이동
    reset();
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
        <br />
        <span className="text-red-500">{errors.timer?.message as string}</span>
        <br />
        <span>마감기한 : {getValues("timer")}DAY</span>
        <br />
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          등록하기
        </button>
      </form>
    </>
  );
}

export default RegisterProduct;
