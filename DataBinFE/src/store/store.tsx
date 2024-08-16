// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import dateRangeReducer from "./dateRangeSlice";
import enterpriseReducer from "./enterpriseSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    dateRange: dateRangeReducer,
    enterprise: enterpriseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;