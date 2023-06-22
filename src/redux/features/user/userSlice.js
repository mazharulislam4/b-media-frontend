import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onlineUser: {},
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    onlineUser: (state, action) => {
      state.onlineUser = {...action.payload}
    },
  },
});

export const { onlineUser, offlineUser } = userSlice.actions;

export default userSlice.reducer;
