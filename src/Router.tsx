import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/lists/Main";
import Login from "./pages/users/Login";
import RegisterUser from "./pages/users/RegisterUser";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
