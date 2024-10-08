import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  test: "jack",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      if (payload) {
        localStorage.setItem("userData", JSON.stringify(payload));
        state.username = payload.firstname || ""; 
      } else {
        state.username = ""; 
      }
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
