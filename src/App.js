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
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:8000/campaigns";
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
    //for valid Name and No Dates
    if (values.name.length > 0 && !values.startDate && !values.endDate) {
      let temparr = campaigns.filter((campaign) =>
        campaign.name.toLowerCase().includes(values.name.toLowerCase())
      );
      filteredTable = temparr;
    }
    //Filtering on both Dates
    if (values.startDate && values.endDate) {
      const startDateTemp = new Date(values.startDate).getTime();
      const endDateTemp = new Date(values.endDate).getTime();
      //Condition Where EndDate is greater tha Start Date
      if (endDateTemp < startDateTemp) {
        toast.error("End Date should not be less than start Date");
        dispatch(campaignSliceActions.filterTable({ campaigns: [] }));
        return;
      }
      filteredTable = campaigns.filter(
        (campaign) =>
          new Date(campaign.startDate).getTime() >= startDateTemp &&
          new Date(campaign.endDate).getTime() <= endDateTemp
      );
      //Filtering on Dates + Name
      if (values.name.length > 0) {
        let temparr = filteredTable.filter((campaign) =>
          campaign.name.toLowerCase().includes(values.name.toLowerCase())
        );
        filteredTable = temparr;
      }
    } else {
      //Filtering only on Start Date
      if (values.startDate) {
        const startDateTemp = new Date(values.startDate).getTime();
        filteredTable = campaigns.filter(
          (campaign) => new Date(campaign.startDate).getTime() >= startDateTemp
        );
      }
      //Filtering Only on end Date
      if (values.endDate) {
        const endDateTemp = new Date(values.endDate).getTime();
        filteredTable = campaigns.filter(
          (campaign) => new Date(campaign.endDate).getTime() <= endDateTemp
        );
      }
      //Filtering with endDate or Start Date + name
      if (values.name.length > 0) {
        let temparr = filteredTable.filter((campaign) =>
          campaign.name.toLowerCase().includes(values.name.toLowerCase())
        );
        filteredTable = temparr;
      }
    }
    //Filtering For all Reset Value to Default Home Screen
    if (values.name.length === 0 && !values.startDate && !values.endDate) {
      filteredTable = campaigns;
    }
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
