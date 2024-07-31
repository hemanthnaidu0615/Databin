import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  useremail: "", 
  test: "jack",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      localStorage.setItem("userData", JSON.stringify(payload));
      state.username = payload.firstname ? payload.firstname : "";
      state.useremail = payload.username ? payload.username : ""; 
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
