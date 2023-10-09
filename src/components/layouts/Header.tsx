import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <nav className="bg-gray-200 w-[390px] h-full rounded-t-[37px] rounded-b-none flex flex-row">
        <button className="text-gray-600 text-xl ml-[220px]">
          <Link to={"/"}>notification</Link>
        </button>
        <button className="text-gray-600 text-xl ml-2 ">
          <Link to={"/login"}>login</Link>
        </button>
      </nav>
    </>
  );
}

export default Header;
