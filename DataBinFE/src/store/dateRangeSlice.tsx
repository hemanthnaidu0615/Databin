import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dates: ["2024-03-15", "2024-03-16"],
  //   dates: ["2024-02-01T00:00:00.000Z", "2024-05-08T00:00:00.000Z"],
};

const dateRangeSlice = createSlice({
  name: "dateRange",
  initialState,
  reducers: {
    setDates: (state, action) => {
      //   const dateRange = payload;
      state.dates = action.payload;
    },
  },
});

export const { setDates } = dateRangeSlice.actions;

export default dateRangeSlice.reducer;
