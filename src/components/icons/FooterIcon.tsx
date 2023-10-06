import React from "react";

interface FooterIconProps {
  onClick?: () => void;
}

const FooterIcon: React.FC<FooterIconProps> = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <button className="w-[76px] h-[76px] bg-gray-100 rounded-[17px] m-1"></button>
    </div>
  );
};
export default FooterIcon;
