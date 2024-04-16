import axios from "axios";

const productionUrl = "https://xpercent.io/api/";
const localUrl = "http://13.125.37.183:8888/api/";
export const instance = axios.create({
  baseURL: localUrl,

  headers: {},
  validateStatus: function (status) {
    return (
      (status >= 200 && status < 300) || 401
    ); /** Will except responses without error*/
  },
});

instance.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    // console.log(error);
    return Promise.reject(error);
  }
);

export const loginAPI = {
  async dtLogin(formdata) {
    let body = JSON.stringify({
      username: formdata.company_usrnm,
      password: formdata.company_pass,
    });
    let csrf = await instance.get("mobile/get_csrf/");

    return instance
      .post(`dtenter/dt_login/`, body, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf.data["token"],
        },
      })
      .then((res) => {
        return res;
      });
  },
};
export const getDtData = {
  
//LIME Macro result
async getLimeMacroResult(selectedDate) {
  let body = JSON.stringify({
    selectedDate:selectedDate,
  });
  let csrf = await instance.get("mobile/get_csrf/");
  return instance
    .post("dtenter/db_invest_macro/", body, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf.data["token"],
      },
    })
    .then((res) => {
      return res;
    });
},


//Get XAI important features of months

async fetchXAIImportantFeaturesResult(selectedDate) {
  let body = JSON.stringify({
    selectedDate:selectedDate,
  });
  let csrf = await instance.get("mobile/get_csrf/");
  return instance
    .post("dtenter/db_invest_xai_imp_features/", body, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf.data["token"],
      },
    })
    .then((res) => {
      return res;
    });
},



//Get DT-XAI important features of four months

async fetchXAIImpFeatFourMonthResult() {
 
  let csrf = await instance.get("mobile/get_csrf/");
  return instance
    .post("dtenter/db_invest_dt_xai_imp_feat/",{
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf.data["token"],
      },
    })
    .then((res) => {
      return res;
    });
},

//Get DT-XAI  Long Short important features of four months

async fetchXAILongShortImportanceResult(selectedDate) {
  let body = JSON.stringify({
    selectedDate:selectedDate,
  });

  let csrf = await instance.get("mobile/get_csrf/");
  return instance
    .post("dtenter/db_invest_dt_long_short_imp/", body, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf.data["token"],
      },
    })
    .then((res) => {
      return res;
    });
},


  //LIME result
  async getLimeResult(selectedDate) {
    let body = JSON.stringify({
      selectedDate:selectedDate,
    });
    let csrf = await instance.get("mobile/get_csrf/");
    return instance
      .post("dtenter/db_invest_lime/", body, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf.data["token"],
        },
      })
      .then((res) => {
        return res;
      });
  },
  
  async getDBChartData() {
    let csrf = await instance.get("mobile/get_csrf/");
    return instance
      .post("dtenter/db_invest_cumpv/", {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf.data["token"],
        },
      })
      .then((res) => {
        return res;
      });
  },

  
  async getDBInvestCurrentData(currentYear) {
    let body = JSON.stringify({
      year: currentYear
    });
    let csrf = await instance.get("mobile/get_csrf/");

    return instance
      .post(`dtenter/db_invest_current_signal/`, body, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf.data["token"],
        },
      })
      .then((res) => {
        return res;
      });
  },

  //DB 금융투자 시그널 불러오는 api
  async getDBInvestData(company_name, currentYear) {
    let body = JSON.stringify({
      company:company_name,
      year: currentYear
    });
    let csrf = await instance.get("mobile/get_csrf/");

    return instance
      .post(`dtenter/db_invest_signal/`, body, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf.data["token"],
        },
      })
      .then((res) => {
        return res;
      });
  },

  //get Related news

  async getRelatedNews({ ticker, contains_stock_name }) {
    let body = JSON.stringify({
      ticker: ticker,
      contains_stock_name: contains_stock_name,
    });
    let csrf = await instance.get("mobile/get_csrf/");

    return instance
      .post(`mobile/related/`, body, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf.data["token"],
        },
      })
      .then((res) => {
        return res;
      });
  },
  async fetchDtData(company_name, currentSelectedDate) {
    let body = JSON.stringify({
      company: company_name,
      date: currentSelectedDate,
      test: false,
    });
    let csrf = await instance.get("mobile/get_csrf/");

    return instance
      .post(`dtenter/dt_service/`, body, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf.data["token"],
        },
      })
      .then((res) => {
        return res;
      });
  },
  async getDTStockInfo(id) {
    let body = JSON.stringify({
      id,
    });
    let csrf = await instance.get("mobile/get_csrf/");

    return instance
      .post(`dtenter/get_dt_stock_info/`, body, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf.data["token"],
        },
      })
      .then((res) => {
        return res;
      });
  },

  //get the stock price

  async getNewsSummary() {
    let csrf = await instance.get("mobile/get_csrf/");
    return instance
      .get("mobile/get_news_summary/", {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf.data["token"],
        },
      })
      .then((res) => {
        return res;
      });
  },
};

// export const getDtData = {
//   async fetchDtData(company_name, modelType, currentSelectedDate) {
//     let body = JSON.stringify({
//       company_name: company_name,
//       model: modelType,
//       date: currentSelectedDate,
//     });
//     let csrf = await instance.get("mobile/get_csrf/");

//     return instance
//       .post(`dtenter/dt_service/`, body, {
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFToken": csrf.data["token"],
//         },
//       })
//       .then((res) => {
//         return res;
//       });
//   },
//   //New api for test
//   async fetchDtDataTest(company_name, currentSelectedDate) {
//     let body = JSON.stringify({
//       company: company_name,
//       date: currentSelectedDate,
//       test: false,
//     });
//     let csrf = await instance.get("mobile/get_csrf/");

//     return instance
//       .post(`dtenter/dt_service_test/`, body, {
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFToken": csrf.data["token"],
//         },
//       })
//       .then((res) => {
//         return res;
//       });
//   },
//   async getRiskManagementIndicesData(modelType) {
//     let body = JSON.stringify({
//       type: modelType,
//     });
//     let csrf = await instance.get("mobile/get_csrf/");

//     return instance
//       .post(`dtenter/risk_management_indices/`, body, {
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFToken": csrf.data["token"],
//         },
//       })
//       .then((res) => {
//         return res;
//       });
//   },

