import jwtDecode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AiFillHome,
  AiOutlineSearch,
  AiFillPlusCircle,
  AiFillMessage,
  AiFillInfoCircle,
} from "react-icons/ai";

interface IDecodeToken {
  nickname: string;
}

const FooterIcon = () => {
  const navigate = useNavigate();

  const token: string | null = localStorage.getItem("authorization");
  const decodedToken: IDecodeToken | null = token ? jwtDecode(token) : null;
  const userNickname: string = decodedToken ? decodedToken.nickname : "";

  const onClick = () => {
    const accessToken = localStorage.getItem("authorization");
    if (!accessToken) {
      toast.error("로그인 후 이용가능합니다.");
      navigate("/login");
      return;
    }
    const nickname = userNickname;
    navigate(`/chattingList/${nickname}`);
  };

  return (
    <div className="bg-[rgba(255,255,255,0.76)] font-semibold flex justify-center w-[100%] border-t-[1px] py-3">
      <Link to="/">
        <div>
          <button className="w-[57px] h-[57px] bg-white shadow-md border rounded-xl mx-2">
            <div className="flex justify-center items-center">
              <AiFillHome
                style={{ width: "35px", height: "35px", color: "#292929" }}
              />
            </div>
          </button>
        </div>
      </Link>
      <Link to="/keyword">
        <div>
          <button className="w-[57px] h-[57px] bg-white shadow-md border rounded-xl mx-2">
            <div className="flex justify-center items-center">
              <AiOutlineSearch
                style={{ width: "35px", height: "35px", color: "#292929" }}
              />
            </div>
          </button>
        </div>
      </Link>
      <Link to="items/register">
        <div>
          <button className="w-[57px] h-[57px] bg-white shadow-md border rounded-xl mx-2">
            <div className="flex justify-center items-center">
              <AiFillPlusCircle
                style={{ width: " 35px", height: "35px", color: "#292929" }}
              />
            </div>
          </button>
        </div>
      </Link>
      <div onClick={onClick}>
        <button className="w-[57px] h-[57px] bg-white shadow-md border rounded-xl mx-2">
          <div className="flex justify-center items-center">
            <AiFillMessage
              style={{ width: "35px", height: "35px", color: "#292929" }}
            />
          </div>
        </button>
      </div>
      <Link to="info">
        <div>
          <button className="w-[57px] h-[57px] bg-white shadow-md border rounded-xl mx-2">
            <div className="flex justify-center items-center">
              <AiFillInfoCircle
                style={{ width: " 35px", height: "35px", color: "#292929" }}
              />
            </div>
          </button>
        </div>
      </Link>
    </div>
  );
};
export default FooterIcon;
