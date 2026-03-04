// import { configureStore } from "@reduxjs/toolkit";
// import loginReducer from "./slices/loginSlice";
// export default configureStore({
//   reducer: { loginReducer: loginReducer, },
// });

import loginReducer from "./slices/loginSlice";
import dataReducer from "./slices/dataSlice";
import noticeReducer from "./slices/noticeSlice";
import simulationReducer from "./slices/simulationSlice";
import authReducer from "./slices/authSlice";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  loginReducer,
  dataReducer,
  noticeReducer,
  simulationReducer,
  authReducer
});

export default rootReducer;
