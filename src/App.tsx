import AuctionDetail from "./components/auction-detail/AuctionDetail";
import AuctionList from "./components/auction-list/AuctionList";
import ModifierProduct from "./components/register/ModifierProduct";
import RegisterProduct from "./components/register/RegisterProduct";
import SearchAution from "./components/search/SearchAution";

function App() {
  return (
    <>
      <div>
        <RegisterProduct />
        <ModifierProduct />
      </div>
      <div>
        <AuctionList />
        <AuctionDetail />
      </div>
      <div>
        <SearchAution />
      </div>
    </>
  );
}

export default App;
