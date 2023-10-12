import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../../atoms/isLoggedIn";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

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
          <button className="text-gray-600 text-xl ml-[210px]">
            <Link to={"/"}>notification</Link>
          </button>
          <button
            onClick={LogoutHandler}
            className="text-gray-600 text-xl ml-2 "
          >
            logout
          </button>
        </nav>
      )}
    </>
  );
}
export default Header;

const navStyle = "bg-white w-[390px] h-100% flex flex-row";
