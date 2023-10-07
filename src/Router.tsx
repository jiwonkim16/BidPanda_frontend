import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/lists/Main";
import Login from "./pages/users/Login";
import RegisterUser from "./pages/users/RegisterUser";
import RegisterProduct from "./pages/auction-register/RegisterProduct";
import ModifierProduct from "./pages/auction-register/ModifierProduct";
import AuctionDetail from "./pages/auction-detail/AuctionDetail";
import SearchAution from "./pages/search/SearchAution";
import AuctionList from "./pages/auction-list/AuctionList";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/items/register" element={<RegisterProduct />} />
        <Route path="/items/modifier/:itemId" element={<ModifierProduct />} />
        <Route path="/items/detail/:itemId" element={<AuctionDetail />} />
        <Route path="/keyword" element={<SearchAution />} />
        <Route path="/items/list" element={<AuctionList />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
