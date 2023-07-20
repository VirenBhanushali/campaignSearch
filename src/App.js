import "./App.css";
import { useEffect } from "react";
import store, {
  campaignSliceActions,
  getCampaigns,
} from "./store/capmgainStore";
import { useDispatch, useSelector } from "react-redux";
import TableComponent from "./Components/TableComponent";
import SearchForm from "./Components/SearchForm";
import { Alert, Spinner } from "react-bootstrap";
import NavbarComponent from "./Components/NavbarComponet";
import { toast } from "react-toastify";

function App() {
  const campaigns = useSelector((val) => val.campaignSlice.campaigns);
  const status = useSelector((val) => val.campaignSlice.status);
  const renderCampaigns = useSelector(
    (val) => val.campaignSlice.renderCampaigns
  );
  const dispatch = useDispatch();
  useEffect(() => {
    store.dispatch(getCampaigns());
  }, []);

  global.addCampaign = async (campaignArray) => {
    dispatch(campaignSliceActions.loadingStatus());
    let tempArr = campaigns;
    tempArr = [...tempArr, ...campaignArray];
    const bodyObject = tempArr;

    let url = "";
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test"
    ) {
      url =
        process.env.NODE_ENV !== "test"
          ? "http://localhost:8000/campaigns"
          : "http://localhost:8000/test";
    } else {
      url =
        "https://adform-assignment-default-rtdb.firebaseio.com/campaigns.json";
    }
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ data: bodyObject }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch(
        campaignSliceActions.addCampaigns({ newCampaigns: campaignArray })
      );
      store.dispatch(getCampaigns());
    }
  };
  function FilterTableStartDate(values) {
    let filteredTable = [];
    const startDateTemp = new Date(values.startDate).getTime();
    const endDateTemp = new Date(values.endDate).getTime();

    //Error Validation
    if (values.name.length === 0 && !values.startDate && !values.endDate) {
      filteredTable = campaigns;
    } else if (startDateTemp > endDateTemp) {
      toast.error("Start Date cannot be Greater than end Date");
    }
    let tempArr;
    //Filtering Logic
    if (startDateTemp && endDateTemp) {
      tempArr = campaigns.filter(
        (campaign) =>
          new Date(campaign.startDate).getTime() >= startDateTemp &&
          new Date(campaign.endDate).getTime() <= endDateTemp &&
          campaign.name.toLowerCase().includes(values.name.toLowerCase())
      );
    } else {
      tempArr = campaigns.filter(
        (campaign) =>
          (campaign.name.toLowerCase().includes(values.name.toLowerCase()) &&
            values.name !== "") ||
          new Date(campaign.startDate).getTime() >= startDateTemp ||
          new Date(campaign.endDate).getTime() <= endDateTemp
      );
    }
    filteredTable = tempArr;
    //Common Dispatch
    dispatch(campaignSliceActions.filterTable({ campaigns: filteredTable }));
  }

  return (
    <div className="App">
      <NavbarComponent />
      {status === "loading" && (
        <Spinner
          data-testid="spinner"
          style={{ position: "absolute", top: "50%" }}
        ></Spinner>
      )}
      {status !== "loading" && (
        <SearchForm FilterTableStartDate={FilterTableStartDate} />
      )}
      {renderCampaigns?.length > 0 && status !== "loading" && (
        <TableComponent campaigns={renderCampaigns} />
      )}
      {renderCampaigns?.length < 1 && status !== "loading" && (
        <div>
          <Alert>
            No Campaigns Found!!!
            <span
              data-testid="backButton"
              onClick={() => {
                dispatch(
                  campaignSliceActions.filterTable({ campaigns: campaigns })
                );
              }}
              style={{ cursor: "pointer" }}
            >
              Go back?
            </span>
          </Alert>
        </div>
      )}
    </div>
  );
}

export default App;
