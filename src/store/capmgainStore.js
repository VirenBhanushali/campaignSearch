const {
  createSlice,
  createAsyncThunk,
  configureStore,
} = require("@reduxjs/toolkit");

export const getCampaigns = createAsyncThunk(
  "campaign/getCampaign",
  async () => {
    const response = await fetch("http://localhost:8000/campaigns");
    const data = await response.json();
    return data;
  }
);

const campaignSlice = createSlice({
  name: "campaignSlice",
  initialState: {
    campaigns: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCampaigns.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCampaigns.fulfilled, (state, action) => {
        state.campaigns = action.payload;
        state.status = "completed";
      });
  },
});

const store = configureStore({
  reducer: {
    campaignSlice: campaignSlice.reducer,
  },
});

export default store;
