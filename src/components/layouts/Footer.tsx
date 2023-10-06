import { useNavigate } from "react-router-dom";
import FooterIcon from "../icons/FooterIcon";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row justify-center">
      <FooterIcon onClick={() => navigate("/")} />
      <FooterIcon />
      <FooterIcon />
      <FooterIcon />
    </div>
  );
};

export default Footer;
