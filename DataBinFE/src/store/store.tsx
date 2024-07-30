// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import dateRangeReducer from "./dateRangeSlice";
import enterpriseReducer from "./enterpriseSlice";
import singleDateReducer from "./singleDateSlice"; // Import the new reducer

export const store = configureStore({
  reducer: {
    user: userReducer,
    dateRange: dateRangeReducer,
    enterprise: enterpriseReducer,
    singleDate: singleDateReducer, // Add the new reducer to the store
  },
});

export type RootState = ReturnType<typeof store.getState>;