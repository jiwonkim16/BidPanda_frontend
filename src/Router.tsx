import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Main from "./pages/hub/Mainpage";
import Login from "./pages/users/Login";
import RegisterUser from "./pages/users/RegisterUser";
import Mypage from "./pages/hub/Mypage";
import EditUserInfo from "./pages/hub/EditUserInfo";
import RegisterProduct from "./pages/auction-register/RegisterProduct";
import ModifierProduct from "./pages/auction-register/ModifierProduct";
import AuctionDetail from "./pages/auction-detail/AuctionDetail";
import SearchAution from "./pages/search/SearchAution";
import AuctionList from "./pages/auction-list/AuctionList";
import NotFound from "./pages/error/NotFound";
import ErrorComponent from "./pages/error/ErrorComponent";
import Kakao from "./components/layouts/Kakao";
import AuctionCard from "./pages/auction-list/AuctionCard";

/**
 * @author : Jiwon Kim
 * @returns : createBrowserRouter를 사용한 깔끔한 Route 설계.
 */

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Main />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "kakao",
        element: <Kakao />,
      },
      {
        path: "register",
        element: <RegisterUser />,
      },
      {
        path: "mypage",
        element: <Mypage />,
      },
      {
        path: "mypage/edit",
        element: <EditUserInfo />,
      },
      {
        path: "items/register",
        element: <RegisterProduct />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "items/modifier/:itemId",
        element: <ModifierProduct />,
      },
      {
        path: "items/detail/:itemId",
        element: <AuctionDetail />,
      },
      {
        path: "keyword",
        element: <SearchAution />,
      },
      {
        path: "items/list",
        element: <AuctionList />,
      },
      {
        path: "items/list/:category",
        element: <AuctionCard />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
