// import { configureStore } from "@reduxjs/toolkit";
// import loginReducer from "./slices/loginSlice";
// export default configureStore({
//   reducer: { loginReducer: loginReducer, },
// });

import { persistReducer } from "redux-persist";
import loginReducer from "./slices/loginSlice";
import dataReducer from "./slices/dataSlice";
import noticeReducer from "./slices/noticeSlice";
import simulationReducer from "./slices/simulationSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
export const rootReducer = combineReducers({
  loginReducer,
  dataReducer,
  noticeReducer,
  simulationReducer
});

const persistedReducers = persistReducer(persistConfig, rootReducer);

export default persistedReducers;
