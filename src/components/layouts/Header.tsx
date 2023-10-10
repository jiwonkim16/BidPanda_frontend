import { useState } from "react";
import { Link } from "react-router-dom";

export const nav =
  "bg-gray-200 w-[390px] h-full rounded-t-[37px] rounded-b-none flex flex-row";
function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const removeToken = () => {
    localStorage.removeItem("Authorization");
  };
  const LogoutHandler = () => {
    try {
      setIsLoggedIn(!isLoggedIn);
      removeToken();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>

      {!isLoggedIn ? (
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
