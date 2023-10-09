import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/Mainpage";
import Login from "./pages/users/Login";
import RegisterUser from "./pages/users/RegisterUser";
import Mypage from "./pages/users/Mypage";
import RegisterProduct from "./pages/auction-register/RegisterProduct";
import ModifierProduct from "./pages/auction-register/ModifierProduct";
import AuctionDetail from "./pages/auction-detail/AuctionDetail";
import SearchAution from "./pages/search/SearchAution";
import AuctionList from "./pages/auction-list/AuctionList";
import App from "./App";
import NotFound from "./pages/error/NotFound";
import ErrorComponent from "./pages/error/ErrorComponent";

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
        path: "register",
        element: <RegisterUser />,
      },
      {
        path: "mypage",
        element: <Mypage />,
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
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
