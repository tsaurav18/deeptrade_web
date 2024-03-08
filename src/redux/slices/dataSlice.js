import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  shannon_stock: false,
  shannon_index: false,
  shannon_top5: {},
  shannon_top20: {},
  Daily: [],
  Weekly: [],
  chart_data:[]
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    saveDataState: (state, action) => {
      // console.log("in to login Info ", state, action);
      state.shannon_top5 = action.payload.shannon_top5;
      state.shannon_top20 = action.payload.shannon_top20;
      state.Daily = action.payload.Daily;
      state.Weekly = action.payload.Weekly;
      state.shannon_stock = action.payload.shannon_stock;
      state.shannon_index = action.payload.shannon_index;
      state.chart_data = action.payload.chart_data
    },
    resetDataState: (state) => {
      return initialState; // Reset the state to the initial state
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveDataState, resetDataState } = dataSlice.actions;

export default dataSlice.reducer;
