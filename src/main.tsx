import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { RecoilRoot } from "recoil";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "./Router.tsx";

/**
 * @author : Jiwon Kim
 * @returns :
 */

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="top-right"
          style={{
            width: "45%",
            fontFamily: "semibold",
          }}
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="colored"
        />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </RecoilRoot>
  </>
);
