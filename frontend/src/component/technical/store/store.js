import { configureStore } from "@reduxjs/toolkit";
import machineSlice from "./reducer";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    machine: machineSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});