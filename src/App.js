import "./App.css";
import { useEffect } from "react";
import store, { getCampaigns } from "./store/capmgainStore";
import { useSelector } from "react-redux";
import TableComponent from "./Components/TableComponent";

function App() {
  const campaigns = useSelector((val) => val.campaignSlice.campaigns);
  const status = useSelector((val) => val.campaignSlice.status);
  useEffect(() => {
    store.dispatch(getCampaigns());
  }, []);
  return (
    <div className="App">
      <TableComponent campaigns={campaigns} />
    </div>
  );
}

export default App;
