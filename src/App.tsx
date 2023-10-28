import { Suspense, useEffect } from "react";
import { Outlet } from "react-router";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Loading from "./components/assets/Loading";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";

/**
 * @author : Jiwon Kim, Goya Gim
 * @returns : Header와 Footer를 Router Outlet에 감싸는 것 구현. SSE 실시간 알림 구현.
 */

function App() {
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const isToken = localStorage.getItem("authorization");

  useEffect(() => {
    if (isToken) {
      let eventSource: any;
      const fetchSSE = () => {
        try {
          eventSource = new EventSource(
            `${import.meta.env.VITE_REACT_API_KEY}/api/notification/subscribe`,
            {
              headers: {
                Authorization: localStorage.getItem("authorization") || "",
                Authorization_Refresh:
                  localStorage.getItem("authorization_refresh") || "",
              },
              heartbeatTimeout: 3600000,
            }
          );
          eventSource.addEventListener("sseData", async (event: any) => {
            const data = JSON.parse(event.data);
            console.log(data);
          });

          eventSource.addEventListener("close", () => eventSource.close());
          return () => eventSource.close();
        } catch {}
      };
      fetchSSE();
    }
  }, []);

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
