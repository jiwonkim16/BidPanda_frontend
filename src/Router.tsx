import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Main from "./pages/hub/Mainpage";
import App from "./App";
import Kakao from "./components/modules/Kakao";

const Login = React.lazy(() => import("./pages/users/Login"));
const RegisterUser = React.lazy(() => import("./pages/users/RegisterUser"));
const Mypage = React.lazy(() => import("./pages/hub/Mypage"));
const EditUserInfo = React.lazy(() => import("./pages/hub/EditUserInfo"));
const SearchAution = React.lazy(() => import("./pages/search/SearchAution"));
const Notification = React.lazy(() => import("./pages/hub/Notification"));
const ChattingList = React.lazy(() => import("./pages/chat/ChattingList"));
const ChattingRoom = React.lazy(() => import("./pages/chat/ChattingRoom"));
const NotFound = React.lazy(() => import("./pages/error/NotFound"));
const ErrorComponent = React.lazy(() => import("./pages/error/ErrorComponent"));
const RegisterProduct = React.lazy(
  () => import("./pages/auction-register/RegisterProduct")
);
const ModifierProduct = React.lazy(
  () => import("./pages/auction-register/ModifierProduct")
);
const AuctionDetail = React.lazy(
  () => import("./pages/auction-detail/AuctionDetail")
);
const AuctionList = React.lazy(
  () => import("./pages/auction-list/AuctionList")
);
const AuctionCard = React.lazy(
  () => import("./pages/auction-list/AuctionCard")
);

/**
 * @author : Jiwon Kim, Goya Gim
 * @returns : createBrowserRouter를 사용한 깔끔한 Route 설계.
 *            React lazy를 이용한 초기 번들 사이즈 최적화.
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
        path: "notification",
        element: <Notification />,
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
      {
        path: "chattingList/:nickname",
        element: <ChattingList />,
      },
      {
        path: "chattingRoom/:item_id",
        element: <ChattingRoom />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
