import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: {},
  
};

export const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    noticeDetailData: (state, action) => {
      // console.log("in to login Info ", state, action);
      state.data = action.payload;
      
    },
    resetNoticeState: (state) => {
      return initialState; // Reset the state to the initial state
    },
  },
});

// Action creators are generated for each case reducer function
export const { noticeDetailData, resetNoticeState } = noticeSlice.actions;

export default noticeSlice.reducer;
