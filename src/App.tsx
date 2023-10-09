import { Outlet } from "react-router";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";

function App() {
  return (
    <>
      <div className="bg-gray-300 w-screen h-screen fixed flex justify-center">
        <div className="bg-white w-[390px] h-[844px] rounded-[37px] mt-[50px]">
          <div className="h-[5%]">
            <Header />
          </div>
          <div className="h-[83%]">
            <Outlet />
          </div>
          <div className="h-[15%]">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
