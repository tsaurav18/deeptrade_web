import axios from "axios";
// const T1Url = 'http://0.0.0.0:9000'
// const T2Url = "http://127.0.0.1:9001"
const T1Url = 'https://shinyoung.t1.deeptrade.co'
const T2Url = 'https://shinyoung.t2.deeptrade.co';
const productionUrl = "https://xpercent.io/api/";
const localUrl = "http://13.125.37.183:9999/api/";
export const instance = axios.create({
  baseURL: productionUrl,

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

// Create a separate instance for T1
export const T1Instance = axios.create({
  baseURL: T1Url,
  headers: {},
  validateStatus: function (status) {
    return (status >= 200 && status < 300) || status === 401;
  },
});

T1Instance.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const T2Instance = axios.create({
  baseURL: T2Url,
  headers: {},
  validateStatus: function (status) {
    return (status >= 200 && status < 300) || status === 401;
  },
});

T2Instance.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const shinyongAPI = {
  async runShinyongProcess(formData) {
    const body = JSON.stringify({
      rebalance_date: [formData.targetDate],
      buy_fee: formData.buyFee,
      server: formData.server,
      sell_fee: formData.sellFee,
      tickers: formData.tickers,
      webssh: 'web'
    });
    console.log("body", body);
    try {
      // Post to the FastAPI endpoint "/run_process"
      if(formData.server === 'T1'){
        const res = await T1Instance.post("/run_process/", body, {
          headers: {
            "Content-Type": "application/json"
          }, 
          withCredentials: false
        });
        return res
      }else{
 
        const res = await T2Instance.post("/run_process/", body, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: false
        });
        return res
      }
    } catch (error) {
      console.error("Error in runShinyongProcess", error);
      throw error;
    }
  },
  async getLog(formData) {
    try {
      if(formData.server === 'T1'){
      const res = await T1Instance.get("/get_log", {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: false
      });
      return res.data;
    }else{
      const res = await T2Instance.get("/get_log", {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: false
      });
      return res.data;
    }
    } catch (error) {
      console.error("Error in getLog", error);
      throw error;
    }
  },
  async getServerStatus(){
    try {
      const res = await T1Instance.get("/server_status", {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: false
      });
      return res.data;
    } catch (error) {
      console.error("Error in getServerStatus", error);
      throw error;
    }
  },
  async getSY_SNP_20(){
    try {
      const res = await T1Instance.get("/get_snp_20", {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: false
      });
      return res.data;
    } catch (error) {
      console.error("Error in getSY_SNP_20", error);
      throw error;
    }
  },
  async getSY_SNP_40(){
    try {
      const res = await T1Instance.get("/get_snp_40", {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: false
      });
      return res.data;
    } catch (error) {
      console.error("Error in getSY_SNP_40", error);
      throw error;
    }
  },
  

  async getDBStatus (){
    try {
      const res = await T1Instance.get("/db_status", {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: false
      });
      return res.data;
    } catch (error) {
      console.error("Error in getDBStatus", error);
      throw error;
    }
  },

  async downloadFile(formData) {
    const body = JSON.stringify({
      file_name:formData.downloadFileName,
       
    });
    console.log("body", body);
  try {
    if(formData.server === 'T1'){
    const res = await T1Instance.post("/download_file/",body, {
      headers: {
        "Content-Type": "application/json",

      },
      responseType: 'blob',
      withCredentials: false
    });
    return res;
  }else{
    const res = await T2Instance.post("/download_file/",body, {
      headers: {
        "Content-Type": "application/json",

      },
      responseType: 'blob',
      withCredentials: false
    });
    return res;
  }
  } catch (error) {
    console.error("Error in getServerStatus", error);
    throw error;
  }
}
}

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

