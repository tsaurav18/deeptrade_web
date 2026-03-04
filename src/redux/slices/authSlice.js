import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  isAuthenticated: false,
  refreshInProgress: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    clearAccessToken(state) {
      state.accessToken = null;
      state.isAuthenticated = false;
    },
    startRefresh(state) {
      state.refreshInProgress = true;
    },
    finishRefresh(state, action) {
      state.accessToken = action.payload;
      state.refreshInProgress = false;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.refreshInProgress = false;
    },
  },
});

export const { setAccessToken, clearAccessToken, startRefresh, finishRefresh, logout } =
  authSlice.actions;

export default authSlice.reducer;