import jwtDecode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AiFillHome,
  AiOutlineSearch,
  AiFillPlusCircle,
  AiFillMessage,
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
    <div className="bg-white font-semibold flex justify-center w-[100%] border-t-[1.5px] border-b-none  py-4 rounded-t-[23px]">
      <Link to="/">
        <div>
          <button className="w-[73px] h-[73px] bg-white shadow-md border rounded-[17px] mx-1.5">
            <div className="flex justify-center items-center">
              <AiFillHome
                style={{ width: "40px", height: "40px", color: "#292929" }}
              />
            </div>
          </button>
        </div>
      </Link>
      <Link to="/keyword">
        <div>
          <button className="w-[73px] h-[73px] bg-white shadow-md border rounded-[17px] mx-1.5">
            <div className="flex justify-center items-center">
              <AiOutlineSearch
                style={{ width: "40px", height: "40px", color: "#292929" }}
              />
            </div>
          </button>
        </div>
      </Link>
      <Link to="items/register">
        <div>
          <button className="w-[73px] h-[73px] bg-white shadow-md border  rounded-[17px] mx-1.5">
            <div className="flex justify-center items-center">
              <AiFillPlusCircle
                style={{ width: "40px", height: "40px", color: "#292929" }}
              />
            </div>
          </button>
        </div>
      </Link>
      <div onClick={onClick}>
        <button className="w-[73px] h-[73px] bg-white shadow-md border rounded-[17px] mx-1.5">
          <div className="flex justify-center items-center">
            <AiFillMessage
              style={{ width: "40px", height: "40px", color: "#292929" }}
            />
          </div>
        </button>
      </div>
    </div>
  );
};
export default FooterIcon;
