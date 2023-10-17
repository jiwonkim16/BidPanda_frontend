import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../assets/Loading";
import { useEffect } from "react";

/**
 * @author : Goya Gim
 * @returns : 카카오 로그인 리다이렉트 및 토큰 교환을 위한 Api
 */

const Kakao = () => {
  const code = new URL(window.location.href);
  const codeValue = code.searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_REACT_API_KEY
          }/api/members/kakao/callback?code=${codeValue}`,
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        );

        if (res.status === 200) {
          toast.success("카카오 계정을 통해 로그인 되었습니다.");
          localStorage.setItem("authorization", res.headers.authorization);

          navigate("/");
        }
        window.location.reload();
      } catch (error) {
        toast.error("카카오 로그인에 문제가 생겼습니다.");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-[100%]">
      <Loading />
    </div>
  );
};

export default Kakao;
