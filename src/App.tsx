import { Suspense, useEffect } from "react";
import { Outlet } from "react-router";
import { useSetRecoilState } from "recoil";
import { isReadState } from "../src/atoms/isReadState";
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
  const setReadDate = useSetRecoilState(isReadState);

  useEffect(() => {
    /**
     * @includes : SSE 핸드쉐이크.
     */

    if (isToken) {
      let eventSource: any;
      const fetchSSE = () => {
        try {
          eventSource = new EventSource(
            `${import.meta.env.VITE_REACT_API_KEY}/api/notification/subscribe`,
            {
              headers: {
                Authorization: localStorage.getItem("authorization") || "",
                Refresh: localStorage.getItem("authorization_refresh") || "",
              },
              heartbeatTimeout: 3600000,
            }
          );

          /**
           * @includes : JS eventSource를 이용해, 연결을 확정하고, 서버에서 전송되는 알림을
           *             addEventListener 함수를 통해 변수에 저장 후 클라이언트에서 사용.
           */

          eventSource.onopen = async () => {};
          eventSource.addEventListener("sse", async (e: any) => {
            const res = await JSON.parse(e.data);

            if (res) {
              setReadDate(true);
            }
          });
          eventSource.addEventListener("error", async (e: any) => {
            if (!e.error.message.includes("No activity")) eventSource.close();
            console.error("SSE connection error:", e);
          });
        } catch (error) {}
      };
      fetchSSE();
    }
  }, []);

  return (
    <>
      <div className="w-[390px] h-[100vh] flex m-auto justify-center p-1">
        <div className="bg-white w-[390px]">
          <div className="h-[5vh] z-30 relative">
            <Header />
          </div>
          <div className="h-[82vh] relative overflow-hidden">
            <div className="overflow-y-scroll overflow-x-hidden max-h-full scrollbar-hide">
              <Suspense fallback={<Loading />}>
                <Outlet />
              </Suspense>
            </div>
          </div>
          <div className="h-[10vh] relative z-30 w-[390px]">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
