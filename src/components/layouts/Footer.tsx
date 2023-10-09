import { Link } from "react-router-dom";
import FooterIcon from "../icons/FooterIcon";

const Footer = () => {
  return (
    <div className="flex justify-center">
      <Link to="/">
        <FooterIcon />
      </Link>
      <Link to="/keyword">
        <FooterIcon />
      </Link>
      <FooterIcon />
      <Link to="/mypage">
        <FooterIcon />
      </Link>
    </div>
  );
};

export default Footer;
