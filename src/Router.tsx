import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Mainpage";
import Login from "./pages/users/Login";
import RegisterUser from "./pages/users/RegisterUser";
import Mypage from "./pages/users/Mypage";
import EditUserInfo from "./pages/users/EditUserInfo";
import RegisterProduct from "./pages/auction-register/RegisterProduct";
import ModifierProduct from "./pages/auction-register/ModifierProduct";
import AuctionDetail from "./pages/auction-detail/AuctionDetail";
import SearchAution from "./pages/search/SearchAution";
import AuctionList from "./pages/auction-list/AuctionList";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
const Router = () => {
  return (
    <div className="h-full">
      <BrowserRouter>
        <div className="h-[7%]">
          <Header />
        </div>
        <div className="h-[81%]">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mypage/edit" element={<EditUserInfo />} />
            <Route path="/items/register" element={<RegisterProduct />} />
            <Route
              path="/items/modifier/:itemId"
              element={<ModifierProduct />}
            />
            <Route path="/items/detail/:itemId" element={<AuctionDetail />} />
            <Route path="/keyword" element={<SearchAution />} />
            <Route path="/items/list" element={<AuctionList />} />
          </Routes>
        </div>
        <div className="h-[15%]">
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Router;
