const {
  createSlice,
  createAsyncThunk,
  configureStore,
} = require("@reduxjs/toolkit");

let url = "";
if (process.env.NODE_ENV === "development") {
  url = "http://localhost:8000/campaigns";
} else {
  url = "https://adform-assignment-default-rtdb.firebaseio.com/campaigns.json";
}

export const getCampaigns = createAsyncThunk(
  "campaign/getCampaign",
  async () => {
    const response = await fetch(url);
    const respData = await response.json();
    return respData.data;
  }
);

const campaignSlice = createSlice({
  name: "campaignSlice",
  initialState: {
    campaigns: [],
    renderCampaigns: [],
    status: "idle",
  },
  reducers: {
    filterTable(state, action) {
      state.renderCampaigns = action.payload.campaigns;
      state.status = "completed";
    },
    loadingStatus(state, action) {
      state.status = "loading";
    },
    addCampaigns(state, action) {
      let temparr = state.campaigns;
      temparr = [...temparr, ...action.payload.newCampaigns];
      state.campaigns = temparr;
      state.renderCampaigns = temparr;
      state.status = "completed";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCampaigns.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCampaigns.fulfilled, (state, action) => {
        state.campaigns = action.payload;
        state.renderCampaigns = action.payload;
        state.status = "completed";
      });
  },
});

const store = configureStore({
  reducer: {
    campaignSlice: campaignSlice.reducer,
  },
});
const campaignSliceActions = campaignSlice.actions;
export { campaignSliceActions };

export default store;
