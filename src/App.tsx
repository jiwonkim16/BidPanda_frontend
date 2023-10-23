import { Suspense } from "react";
import { Outlet } from "react-router";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Loading from "./components/assets/Loading";

/**
 * @author : Jiwon Kim
 * @returns : Header와 Footer를 Router Outlet에 감싸는 것 구현
 */

function App() {
  return (
    <>
      <div className="w-[390px] h-[844px] flex m-auto justify-center p-1">
        <div className="bg-white w-[390px] ">
          <div className="h-[5.5%] z-30 relative">
            <Header />
          </div>
          <div className="h-[82.5%] relative overflow-hidden">
            <div className="overflow-y-scroll overflow-x-hidden max-h-full scrollbar-hide">
              <Suspense fallback={<Loading />}>
                <Outlet />
              </Suspense>
            </div>
          </div>
          <div className="h-[12%]">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
