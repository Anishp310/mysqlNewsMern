import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./counterSlice/index.js";

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});
