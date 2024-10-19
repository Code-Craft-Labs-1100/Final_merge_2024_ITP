import { configureStore } from "@reduxjs/toolkit";
import transportSlice from "./reducer";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    transport: transportSlice,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});
