import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import Eugene from "./pages/Eugene/Eugene";
import Spop from "./pages/Spop/Spop";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Unsubscribe from "./pages/Unsubscribe/Unsubscribe";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import XpercentApp from "./pages/XpercentApp/XpercentApp";
import PortfolioList from "./pages/RATB/PortfolioList";
import RebalancingStatus from "./pages/RATB/RebalancingStatus";
import Survey from "./pages/Survey/Survey";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import EnterprisesLogin from "./pages/Enterprises/LoginPage/EnterprisesLogin";
import EnterprisesService from "./pages/Enterprises/Service/EnterprisesService";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import persistedReducers from "./redux/store";
import { VerifyAuth } from "./routing/VerifyAuth";
import authRoles from "./routing/authRoles";
import EnterpriseServiceTest from "./pages/Enterprises/Service/EnterpriseServiceTest";
import StockPortfolio from "./pages/Solution/SubPages/StockPortfolio";

import EMP from "./pages/Solution/SubPages/EMP";
import RiskManagement from "./pages/Solution/SubPages/RiskManagement";
import NoticeBoardDetails from "./pages/NoticeBoard/NoticeBoardDetails";

const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="eugene" element={<Eugene />} />
            <Route path="spop" element={<Spop />} />
            <Route path="stockportfolio" element={<StockPortfolio />} />
            <Route path="emp" element={<EMP />} />
            <Route path="riskmanagement" element={<RiskManagement />} />
            <Route path="xpct_privacy_policy" element={<PrivacyPolicy />} />
            <Route path="unsub_email" element={<Unsubscribe />} />
            <Route path="xpercent" element={<XpercentApp />} />
            <Route path="portfolio_list" element={<PortfolioList />} />
            <Route path="rebalancing_status" element={<RebalancingStatus />} />
            <Route path="survey" element={<Survey />} />
            <Route path="noticedetails/:id" element={<NoticeBoardDetails/>} />
            <Route
              path="enterprise"
              exact={true}
              element={<EnterprisesLogin />}
            />
            <Route
              path="enterprise/service"
              exact={true}
              element={
                <VerifyAuth
                  authRoles={authRoles}
                  component={EnterprisesService}
                />
              }
            />
           
          </Routes>
        </Router>
      </React.StrictMode>{" "}
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
