import { Outlet } from "react-router";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";

/**
 * @author : Jiwon Kim
 * @returns : Header와 Footer를 Router Outlet에 감싸는 것 구현
 */

function App() {
  return (
    <>
      <div className="w-[390px] h-[844px] flex justify-center p-1">
        <div className="bg-white w-[390px] ">
          <div className="h-[5.5%] ">
            <Header />
          </div>
          <div className="h-[81.5%] overflow-hidden">
            <div className="overflow-y-scroll overflow-x-hidden max-h-full scrollbar-hide">
              <Outlet />
            </div>
          </div>
          <div className="h-[13%]">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
