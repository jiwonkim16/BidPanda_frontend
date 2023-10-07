import Router from "./Router";

function App() {
  return (
    <>
      <div className="bg-gray-300 w-screen h-screen fixed flex justify-center">
        <div className="bg-white w-[390px] h-[844px] rounded-[37px] mt-[50px]">
          <Router />
        </div>
      </div>
    </>
  );
}

export default App;
