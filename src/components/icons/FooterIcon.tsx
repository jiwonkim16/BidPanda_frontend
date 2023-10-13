import React from "react";
import { Link } from "react-router-dom";

interface FooterIconProps {
  onClick?: () => void;
}

const FooterIcon: React.FC<FooterIconProps> = ({ onClick }) => {
  return (
    <div className="bg-white flex justify-center w-[100%]  p-4">
      <Link to="/">
        <div onClick={onClick}>
          <button className="w-[76px] h-[76px] bg-gray-100 rounded-[17px] m-1">
            홈
          </button>
        </div>
      </Link>
      <Link to="/">
        <div onClick={onClick}>
          <button className="w-[76px] h-[76px] bg-gray-100 rounded-[17px] m-1">
            채팅
          </button>
        </div>
      </Link>
      <Link to="items/register">
        <div onClick={onClick}>
          <button className="w-[76px] h-[76px] bg-gray-100 rounded-[17px] m-1">
            경매품 등록
          </button>
        </div>
      </Link>
      <Link to="/keyword">
        <div onClick={onClick}>
          <button className="w-[76px] h-[76px] bg-gray-100 rounded-[17px] m-1">
            검색
          </button>
        </div>
      </Link>
    </div>
  );
};
export default FooterIcon;
