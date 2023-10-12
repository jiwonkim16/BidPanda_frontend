import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoggedInState } from "../../atoms/isLoggedIn";
import { profileImage } from "../../atoms/profileImage";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const profileImages = useRecoilValue(profileImage);
  const navigate = useNavigate();
  const removeToken = () => {
    localStorage.removeItem("authorization");
    localStorage.removeItem("authorization_refresh");
  };

  const LogoutHandler = () => {
    try {
      setIsLoggedIn(false);
      removeToken();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoggedIn === false ? (
        <nav className={navStyle}>
          <button className="text-gray-600 text-xl ml-[330px] ">
            <Link to={"/login"}>login</Link>
          </button>
        </nav>
      ) : (
        <nav className={navStyle}>
          <button className="text-gray-600 text-xl ml-[180px]">
            <Link to={"/"}>notification</Link>
          </button>
          <button
            onClick={LogoutHandler}
            className="text-gray-600 text-xl ml-2 "
          >
            logout
          </button>
          <img
            className="w-[30px] h-[30px] ml-1 cursor-pointer rounded-full"
            src={profileImages}
            alt="mypage&profile"
            onClick={() => navigate("/mypage")}
          />
        </nav>
      )}
    </>
  );
}
export default Header;

const navStyle = "bg-white w-[390px] h-100% flex flex-row p-1";
