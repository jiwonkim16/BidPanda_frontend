import { Outlet } from "react-router";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";

function App() {
  return (
    <>
      <div className="w-[390px] h-[844px] flex justify-center">
        <div className="bg-white w-[390px] ">
          <div className="h-[5%]">
            <Header />
          </div>
          <div className="h-[83%]">
            <Outlet />
          </div>
          <div className="h-[7%]">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
