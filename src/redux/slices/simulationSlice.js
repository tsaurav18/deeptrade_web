import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: {},
  
};

export const simulationDataSlice = createSlice({
  name: "simulationData",
  initialState,
  reducers: {
    saveSimulationDataState: (state, action) => {
      // console.log("in to login Info ", state, action);
      state.data = action.payload.data;
     
    },
    resetSimulationDataState: (state) => {
      return initialState; // Reset the state to the initial state
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveSimulationDataState, resetSimulationDataState } = simulationDataSlice.actions;

export default simulationDataSlice.reducer;
