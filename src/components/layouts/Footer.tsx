import { useNavigate } from "react-router-dom";
import FooterIcon from "../icons/FooterIcon";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <FooterIcon onClick={() => navigate("/")} />
      <FooterIcon />
      <FooterIcon />
      <FooterIcon onClick={() => navigate("/mypage")} />
    </div>
  );
};

export default Footer;
