import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatHandler: { isOpen: false, data: {} },

};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    chatHandler: (state, action) => {
      state.chatHandler.isOpen = action.payload.isOpen;
      state.chatHandler.data = action.payload.data;
    },


  },
});

export const { chatHandler  } = chatSlice.actions;
export default chatSlice.reducer;
