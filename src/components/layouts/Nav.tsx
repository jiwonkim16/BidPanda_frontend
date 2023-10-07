import { Link } from "react-router-dom";

const Nav = ({ children }: any) => {
  return (
    <nav className="bg-gray-500 w-[390px] h-[230px] rounded-t-[37px] rounded-b-none">
      <button className="text-white text-xl mt-2 ml-[290px]">
        <Link to={"/login"}>login logo</Link>
      </button>
      {children}
    </nav>
  );
};

export default Nav;
