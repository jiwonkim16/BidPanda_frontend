import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <nav className="bg-gray-500 w-[390px] rounded-t-[37px] rounded-b-none">
        <button className="text-white text-xl mt-2 ml-[290px]">
          <Link to={"/login"}>login logo</Link>
        </button>
      </nav>
    </>
  );
}

export default Header;
