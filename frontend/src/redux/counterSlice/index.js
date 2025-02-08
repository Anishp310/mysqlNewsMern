import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendDomain = "http://localhost:8080";

// Fetch all data for various categories
export const fetchAllNews = createAsyncThunk(
  "news/fetchAllNews",
  async () => {
    const endpoints = [
      `${backendDomain}/getAllNational`,
      `${backendDomain}/getAllinternational`,
      `${backendDomain}/getAlleconomic`,
      `${backendDomain}/getAllinformation`,
      `${backendDomain}/getAllsports`,
      `${backendDomain}/getAllentertainment`,
      `${backendDomain}/getAllothers`,
      `${backendDomain}/getAllads`,
    ];

    const requests = endpoints.map((url) => axios.get(url));
    const responses = await Promise.all(requests);

    return {
      national: responses[0].data,
      international: responses[1].data,
      economic: responses[2].data,
      information: responses[3].data,
      sports: responses[4].data,
      entertainment: responses[5].data,
      others: responses[6].data,
      ads: responses[7].data,
    };
  }
);

const initialState = {
  national: [],
  international: [],
  economic: [],
  information: [],
  sports: [],
  entertainment: [],
  others: [],
  ads: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllNews.fulfilled, (state, action) => {
        state.loading = false;
        state.national = action.payload.national;
        state.international = action.payload.international;
        state.economic = action.payload.economic;
        state.information = action.payload.information;
        state.sports = action.payload.sports;
        state.entertainment = action.payload.entertainment;
        state.others = action.payload.others;
        state.ads = action.payload.ads;
      })
      .addCase(fetchAllNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
