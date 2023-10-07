import { useNavigate } from "react-router-dom";
import FooterIcon from "../icons/FooterIcon";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row justify-center mt-10">
      <FooterIcon onClick={() => navigate("/")} />
      <FooterIcon />
      <FooterIcon />
      <FooterIcon onClick={() => navigate("/mypage")} />
    </div>
  );
};

export default Footer;
