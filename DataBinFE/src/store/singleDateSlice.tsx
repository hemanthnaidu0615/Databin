// store/singleDateSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SingleDateState {
  date: Date | null;
}

const initialState: SingleDateState = {
  date: null,
};

const singleDateSlice = createSlice({
  name: "singleDate",
  initialState,
  reducers: {
    setSingleDate: (state, action: PayloadAction<Date>) => {
      state.date = action.payload;
    },
  },
});

export const { setSingleDate } = singleDateSlice.actions;

export default singleDateSlice.reducer;
