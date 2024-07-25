import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EnterpriseState {
  key: string;
}

const initialState: EnterpriseState = {
  key: 'AWW', // Default key
};

const enterpriseSlice = createSlice({
  name: 'enterprise',
  initialState,
  reducers: {
    setEnterpriseKey(state, action: PayloadAction<string>) {
      state.key = action.payload;
    },
  },
});

export const { setEnterpriseKey } = enterpriseSlice.actions;
export default enterpriseSlice.reducer;
