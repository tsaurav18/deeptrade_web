import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Bell from "../../../../assets/icons/bell.png";
import Logout from "../../../../assets/icons/logout.png";
import Setting from "../../../../assets/icons/setting.png";
import color from "../../../../style/color";
import {
  Col,
  Row,
  ShadowCol,
  WhiteSpace,
} from "../../../../style/globalStyled";
import "../EnterprisesService.css";
import "./DbInvestment.css";
import { CircularProgress } from "@mui/material";
import { AiOutlineCalendar } from "react-icons/ai";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { resetState } from "../../../../redux/slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useResponsive } from "../../../../hooks/useResponsive";
import { useTitle } from "../../../../routing/DocumentNameChanger";
import { useMediaQuery } from "react-responsive";
import { getDtData } from "../../../../api";
import Calendar from "react-calendar";
import { resetDataState } from "../../../../redux/slices/dataSlice";
import Modal from "react-modal";
import classNames from "classnames";
import Arrow from "../../../../assets/icons/arrow.png";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,

} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,

  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const LineChart = ({ data, isMobile }) => {
  let chart_data;

  chart_data = {
    labels: data.dates, // You can use either daily or weekly dates here
    datasets: [
      {
        label: "EMP Shannon 적용 기술",
        data: data.cum_pv,
        borderColor: "rgba(255, 0, 0, 1)",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        borderWidth: 2,
        fill: false,
        pointLabelFontColor: "rgba(0, 0, 0, 0)",
        yAxisID: "y",
        type: "line",
      },
      {
        label: "코스피 누적 수익률",
        data: data.market_cum_pv,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderWidth: 2,
        fill: false,
        pointLabelFontColor: "rgba(0, 0, 0, 0)",
        yAxisID: "y",
        type: "line",
      },
      {
        label: "누적 시장 초과 수익률",
        data: data.pv_comp,
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.5)",
        borderWidth: 1,
        fill: false,
        pointLabelFontColor: "rgba(0, 0, 0, 0)",
        yAxisID: "y1",
        type: "bar",
      },
      // Repeat the same structure for weekly data if needed
    ],
  };

  const optionsChart = {
    responsive: true,
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          pinch: {
            enabled: true, // Enable pinch zooming
          },
          wheel: {
            enabled: true, // Enable wheel zooming
          },
          mode: "x",
        },
      },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Trading Performance of Models",
        fontSize: 20,
      },
    },
    scales: {
      // y: {
      //   // type: "linear",
      //   display: true,
      //   position: "left",
      //   ticks:{
      //     stepSize:1,
      //     display: false, 
      //     beginAtZero: false,

      //   },
      // },
      // yAxes: {
      //   type: "linear",
      //   // display: true,
      //   position: "left",
      //   ticks:{
      //     // stepSize:1,
      //     display: true, 
      //     beginAtZero: false,
      //   },
      // },

      y1: {
        type: "linear",
        position: "right",
        ticks: {
          stepSize: 5,

        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="chart-container" style={{ width: "100%", height: isMobile ? "400px" : "" }}>
      {chart_data != undefined && (
        <Bar data={chart_data} options={optionsChart} height={isMobile ? "400px" : ""} />
      )}
    </div>
  );
};


const MacroSimVarOneLineChart = ({ data, isMobile, simLabel }) => {

  let chart_data;

  chart_data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8], // You can use either daily or weekly dates here
    datasets: [
      {
        label: data[0].label.past,
        data: data[0].past,
        borderColor: "rgba(0, 141, 196)",
        backgroundColor: "rgba(0, 141, 196)",
        borderWidth: 2,
        fill: false,
        pointLabelFontColor: "rgba(0, 0, 0, 0)",
        yAxisID: "y",
        type: "line",
      },
      {
        label: data[0].label.now,
        data: data[0].now,
        borderColor: "rgb(153, 0, 0)",
        backgroundColor: "rgba(153, 0, 0, 0.5)",
        borderWidth: 2,
        fill: false,
        pointLabelFontColor: "rgba(0, 0, 0, 0)",
        yAxisID: "y",
        type: "line",
      },

      // Repeat the same structure for weekly data if needed
    ],
  };

  const optionsChart = {
    responsive: true,
    plugins: {

      legend: {
        position: "top",
        labels: {
          padding: 20, // Set the desired padding value
        },
      },
      title: {
        display: true,
        text: simLabel,
        fontSize: 20,
      },
    },
    scales: {


      y: {
        type: "linear",
        position: "left",
        ticks: {
          // stepSize:100,

        },
        grid: {
          drawOnChartArea: true,
        },
      },
    },
  };

  return (
    <div className="chart-container" style={{ width: isMobile ? "300px" : "436px", height: isMobile ? "290px" : "" }}>
      {chart_data != undefined && (
        <Line data={chart_data} options={optionsChart} height={isMobile ? "299px" : "218px"} width={isMobile ? "300px" : "436px"} />
      )}
    </div>
  );
};
const MacroSimVarTwoLineChart = ({ data, isMobile, simLabel }) => {
  let chart_data;

  chart_data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8], // You can use either daily or weekly dates here
    datasets: [
      {
        label: data[1].label.past,
        data: data[1].past,
        borderColor: "rgba(0, 141, 196)",
        backgroundColor: "rgba(0, 141, 196)",
        borderWidth: 2,
        fill: false,
        pointLabelFontColor: "rgba(0, 0, 0, 0)",
        yAxisID: "y",
        type: "line",
      },
      {
        label: data[1].label.now,
        data: data[1].now,
        borderColor: "rgb(153, 0, 0)",
        backgroundColor: "rgba(153, 0, 0, 0.5)",
        borderWidth: 2,
        fill: false,
        pointLabelFontColor: "rgba(0, 0, 0, 0)",
        yAxisID: "y",
        type: "line",
      },

      // Repeat the same structure for weekly data if needed
    ],
  };
  const minYValue = Math.min(...data[1].now);
  const maxYValue = Math.max(...data[1].now);

  const optionsChart = {
    responsive: true,
    plugins: {

      legend: {
        position: "top",
        labels: {
          padding: 20, // Set the desired padding value
        },
      },
      title: {
        display: true,
        text: simLabel,
        fontSize: 20,
      },
    },
    scales: {


      y: {
        type: "linear",
        position: "left",
        ticks: {

          min: minYValue,
          max: maxYValue,
          callback: function (value, index, values) {
            return (value).toLocaleString('en-US');
          },
        },
        grid: {
          drawOnChartArea: true,
        },
      },
    },
  };

  return (
    <div className="chart-container" style={{ width: isMobile ? "300px" : "436px", height: isMobile ? "299px" : "" }}>
      {chart_data != undefined && (
        <Line data={chart_data} options={optionsChart} height={isMobile ? "299px" : "218px"} width={isMobile ? "300px" : "436px"} />
      )}
    </div>
  );
};


const tableStyle = {
  width: "100%",
  // Add border to the table
  borderTop: '3px double',
  borderBottom: '3px double',
  // borderTopborderTop: '2px solid'

};

const thStyle = {
  border: "1px solid #ddd", // Add border to the table header cells
  padding: "8px",
  textAlign: "center",
};

const tableHeadBorderLeft = {
  borderRight: '1px solid',
  borderColor: "#aaa",
  marginLeft: -10
}



function DbInvestment() {

  const isPc = useMediaQuery({
    query: "(min-width:1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width:467px)",
  });
  const options = [
    { value: "2024", label: "최근 1년" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
  ];
  const { responsiveValue } = useResponsive();
  const tdStyle = {
    // border: '1px solid #ddd', // Add border to the table data cells
    padding: "8px",
    textAlign: "center",
    borderBottom: "none",
    fontSize: responsiveValue(14, 12, 8)

  };

  const tdStyleUp = {
    // border: '1px solid #ddd', // Add border to the table data cells
    // padding: "8px",
    paddingBottom: 0,
    textAlign: "center",
    borderBottom: "none",
    fontSize: responsiveValue(14, 12, 8)

  };

  const tdStyleDown = {
    // border: '1px solid #ddd', // Add border to the table data cells
    // padding: "0 8px",
    paddingBottom: 0,
    textAlign: "center",
    borderBottom: "none",
    fontSize: responsiveValue(14, 12, 8)

  };

  const tdStyleRed = {
    // backgroundColor: "#FF4200",
    // color: "#fff"
  };

  const tdStyleBlue = {
    // backgroundColor: "#00b0f0",
  };

  const [xaiLongShortImpLoader, setXaiLongShortImpLoader] = useState(false)
  const [xaiLongShortImpResult, setXaiLongShortImpResult] = useState([])
  const [dTXaiImpFeat4MonthResult, setDTXaiImpFeat4MonthResult] = useState([])
  const [dtxaiImpFeat4MonthLoader, setDtxaiImpFeat4MonthLoader] = useState(false)
  const [xaiImpFeatureResultLoader, setXaiImpFeatureResultLoader] = useState(false)
  const [xaiImpFeatureResult, setXaiImpFeatureResult] = useState([])
  const [limeMacroPastDate, setLimeMacroPastDate] = useState('');
  const [pastEMPTextDate, setPastEMPTextDate] = useState(options[0].label);
  const [currentEMPTextDate, setCurrentEMPTextDate] = useState("");
  const [limeResultVar, setLimeResultVar] = useState([]);
  const [limeResultImp, setLimeResultImp] = useState([]);
  const [limeMacroAvgVar, setLimeMacroAvgVar] = useState([]);
  const [limeMacroSimVar, setLimeMacroSimVar] = useState([]);
  const [value, onChange] = useState(new Date());
  const [limeResultLoader, setLimeResultLoader] = useState(false);
  const [limeResult, setLimeResult] = useState([]);
  const [limeMacroResult, setLimeMacroResult] = useState([]);
  const [limeMacroResult2, setLimeMacroResult2] = useState([]);
  const [limeMacroResultLoader, setLimeMacroResultLoader] = useState(false);
  const [dbChartData, setDbChartData] = useState([]);
  const [limeMacroChartData, setLimeMacroChartData] = useState([])
  const [chartDataLoader, setChartDataLoader] = useState(false);
  const [currentdataLoader, setCurrentdataLoader] = useState(false);
  const [dbSignalCurrentData, setDbSignalCurrentData] = useState([]);
  const [dbSignalData, setDbSignalData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const data_reducer = useSelector((state) => state.dataReducer);
  const user_info_reducer = useSelector((state) => state.loginReducer);
  const dateObjects = user_info_reducer.date_list.map(
    (dateString) => new Date(dateString)
  );
  const [vaildSignalDateList, setVaildSignalDateList] = useState(dateObjects);
  const [selectedDate, setSelectedDate] = useState(
    vaildSignalDateList.slice(-1)[0]
  );
  const [currentYear, setCurrentYear] = useState(() => {
    const currentDate = new Date();
    const _currentYear = currentDate.getFullYear();
    return String(_currentYear);
  });
  // console.log("currentYear>>>>>>>>>>>>>",currentYear)
  const [open, setOpen] = useState(false);

  const convertDate = () => {
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  const [currentSelectedDate, setCurrentSelectedDate] = useState(convertDate());
  //Calendar logic

  function closeModal() {
    setShowCalendar(false);
  }

  // Calculate min and max dates based on your clickable dates
  const minDate = new Date(Math.min(...vaildSignalDateList));
  minDate.setFullYear(minDate.getFullYear() - 3); // Adjust the range as needed

  const maxDate = new Date(Math.max(...vaildSignalDateList));

  const isDateDisabled = (date) => {
    return !vaildSignalDateList.some(
      (d) => d.toDateString() === date.toDateString()
    );
  };
  const [selectedStockDate, setSelectedStockDate] = useState("");

  const _onSelect = (event) => {
    setCurrentYear(event.value);
    if (event.label != options[0].label) {
      let custom_text = String(event.label) + "년";
      setPastEMPTextDate(custom_text);
    } else {
      setPastEMPTextDate(event.label);
    }

    // setSelectedStockDate(dbSignalData[0]["buying_date"]);
  };
  // Get current Month data
  const getDbInvestmentCurrentSignal = async () => {
    setCurrentdataLoader(true);

    try {
      const currentDate = new Date();
      const _currentYear = String(currentDate.getFullYear());
      const res = await getDtData.getDBInvestCurrentData(_currentYear);
      if (res.status === 200) {
        // console.log("getDbInvestmentCurrentSignal res.data", res.data);
        const first_row = res.data.data[0]["buying_date"];

        setCurrentEMPTextDate(res.data.date);
        setDbSignalCurrentData(res.data.data);
        setSelectedStockDate(first_row);
      }
      else if (res.status === 500) {
        console.log("getDbInvestmentCurrentSignal res.status 500")
        const currentDate = new Date();
        const _currentYear = String(currentDate.getFullYear());
        const res = await getDtData.getDBInvestCurrentData(_currentYear);
        // console.log("getDbInvestmentCurrentSignal res.data", res.data);
        const first_row = res.data.data[0]["buying_date"];

        setCurrentEMPTextDate(res.data.date);
        setDbSignalCurrentData(res.data.data);
        setSelectedStockDate(first_row);
      }
      else {
        setDbSignalCurrentData([]);
        console.log(" getDbInvestmentCurrentSignal res.status", res.status);
      }
    } catch (error) {
      console.log("getDbInvestmentCurrentSignal catch error", error);
      toast("서버 접속 에러 관리자에게 문의해주세요.");
    }
    setCurrentdataLoader(false);
  };
  useEffect(() => {
    let isComponentRender = true;
    if (isComponentRender === true) {
      getDbInvestmentCurrentSignal();
    }
    return () => {
      isComponentRender = false;
    };
  }, []);
  //Get Chart Date
  const getChartData = async () => {
    setChartDataLoader(true);
    try {
      const res = await getDtData.getDBChartData();
      if (res.status === 200) {
        // console.log("getChartData data", res.data);
        setDbChartData(res.data);
      }
      else if (res.status === 500) {
        const res = await getDtData.getDBChartData();
        // console.log("getChartData data", res.data);
        setDbChartData(res.data);
      }
      else {
        setDbChartData([]);
        console.log("getChartData res.status", res.status);
      }
    } catch (error) {
      console.log("getChartData catch error", error);
      toast("서버 접속 에러 관리자에게 문의해주세요.");
    }
    setChartDataLoader(false);
  };
  useEffect(() => {
    let isComponentRender = true;
    if (isComponentRender === true) {
      getChartData();
    }
    return () => {
      isComponentRender = false;
    };
  }, []);

  //Get Past Data Table-1
  const getDbInvestmentSignal = async () => {
    setLoader(true);

    const res = await getDtData.getDBInvestData(
      user_info_reducer.company_name,
      currentYear
    );
    if (res.status === 200) {
      // console.log("getDbInvestmentSignal res.data", res.data);
      // const first_row = res.data[0]["buying_date"];

      setDbSignalData(res.data);
    } else if (res.status === 500) {
      const _res = await getDtData.getDBInvestData(
        user_info_reducer.company_name,
        currentYear
      );
      if (_res.status === 200) {
        setDbSignalData(_res.data);
      }
    } else {
      setDbSignalData([]);
      console.log(" getDbInvestmentSignal res.status", res.status);
    }

    setLoader(false);
  };
  useEffect(() => {
    let isComponentRender = true;
    if (isComponentRender === true && currentYear != "") {
      getDbInvestmentSignal();
    }
    return () => {
      isComponentRender = false;
    };
  }, [currentYear]);

  // Get LIME Result
  const fetchLimeResult = async () => {
    try {
      setLimeResultLoader(true);

      const res = await getDtData.getLimeResult(selectedStockDate);

      if (res.status === 200) {
        // console.log("fetchLimeResult XAI 적용 결과값", res.data);
        setLimeResult(res.data.data);
        setLimeResultVar(res.data.lime_var);
        setLimeResultImp(res.data.lime_imp);
      } else {
        setLimeResult([]);

      }
    } catch (error) {
      console.log("XAI 적용 결과값 fetchLimeResult catch error", error);
      toast("서버 접속 에러 관리자에게 문의해주세요.");
    }
    setLimeResultLoader(false);
  };


  // Get XAI Important features Result
  const getXAIImportantFeatures = async () => {
    try {
      setXaiImpFeatureResultLoader(true);

      const res = await getDtData.fetchXAIImportantFeaturesResult(selectedStockDate);

      if (res.status === 200) {

        setXaiImpFeatureResult(res.data);


      } else if (res.status === 500) {
        const res = await getDtData.fetchXAIImportantFeaturesResult(selectedStockDate);

        if (res.status === 200) {

          setXaiImpFeatureResult(res.data);


        } else {
          setXaiImpFeatureResult([]);
        }
      }
      else {
        setXaiImpFeatureResult([]);
      }

    } catch (error) {
      console.log("fetchXAIImportantFeaturesResult catch error", error);
      toast("서버 접속 에러 관리자에게 문의해주세요.");
    }
    setXaiImpFeatureResultLoader(false);
  };

  // Get DT-XAI  Important features Three/four Months Result
  const getXAIImportantFeaturesFourMonth = async () => {
    try {
      setDtxaiImpFeat4MonthLoader(true);

      const res = await getDtData.fetchXAIImpFeatFourMonthResult();

      if (res.status === 200) {
        // console.log("getXAIImportantFeaturesFourMonth",res.data )
        setDTXaiImpFeat4MonthResult(res.data);


      } else if (res.status === 500) {
        const res = await getDtData.fetchXAIImpFeatFourMonthResult();
        if (res.status === 200) {
          // console.log("getXAIImportantFeaturesFourMonth",res.data )
          setDTXaiImpFeat4MonthResult(res.data);


        } else {
          setDTXaiImpFeat4MonthResult([]);
        }
      } else {
        setDTXaiImpFeat4MonthResult([]);
      }
    } catch (error) {
      console.log("getXAIImportantFeaturesFourMonth catch error", error);
      toast("서버 접속 에러 관리자에게 문의해주세요.");
    }
    setDtxaiImpFeat4MonthLoader(false);
  };

  // 장기 대비 단기 중요도의 변화 정도는 아래와 같습니다. 중요도 변화
  const getXAILongShortImportance = async () => {
    try {
      setXaiLongShortImpLoader(true);

      const res = await getDtData.fetchXAILongShortImportanceResult(selectedStockDate);

      if (res.status === 200) {
        // console.log("fetchXAILongShortImportanceResult",res.data )
        setXaiLongShortImpResult(res.data);


      } else if (res.status === 500) {
        const res = await getDtData.fetchXAILongShortImportanceResult(selectedStockDate);
        if (res.status === 200) {
          console.log("fetchXAILongShortImportanceResult", res.data)
          setXaiLongShortImpResult(res.data);


        } else {
          setXaiLongShortImpResult([]);
        }
      } else {
        setXaiLongShortImpResult([]);
      }
    } catch (error) {
      console.log("getXAILongShortImportance catch error", error);
      toast("서버 접속 에러 관리자에게 문의해주세요.");
    }
    setXaiLongShortImpLoader(false);
  };


  useEffect(() => {
    let isComponentRender = true;
    if (isComponentRender === true) {
      fetchLimeResult();

    }

    return () => {
      isComponentRender = false;
    };
  }, [selectedStockDate]); //selectedStockDate

  useEffect(() => {
    let isComponentRender = true;
    if (isComponentRender === true) {

      getXAIImportantFeatures()
      getXAIImportantFeaturesFourMonth()
      getXAILongShortImportance()
    }

    return () => {
      isComponentRender = false;
    };
  }, []);

  //Get past related Macro data
  const fetchLimeMacro = async () => {
    try {
      setLimeMacroResultLoader(true);

      const res = await getDtData.getLimeMacroResult(selectedStockDate);

      if (res.status === 200) {
        // console.log("fetchLimeMacro data", res.data);
        setLimeMacroPastDate(res.data.data[0].date)
        setLimeMacroResult([res.data.data[0]]);
        setLimeMacroResult2([res.data.data[1]]);
        setLimeMacroAvgVar(res.data.avg_var);
        setLimeMacroSimVar(res.data.sim_var);
        setLimeMacroChartData(res.data.graph)
      } else {
        setLimeMacroResult([]);
        setLimeMacroResult2([]);
        console.log(" Lime Macro result res.status", res.status);
      }
    } catch (error) {
      console.log("fetchLimeMacro catch error", error);
      toast("서버 접속 에러 관리자에게 문의해주세요.");
    }
    setLimeMacroResultLoader(false);
  };

  useEffect(() => {
    let isComponentRender = true;
    if (isComponentRender === true) {
      fetchLimeMacro();
    }

    return () => {
      isComponentRender = false;
    };
  }, [selectedStockDate]); //selectedStockDate

  return (
    <>
      {/* Current data signal */}
      <Row
        style={{
          alignItems: "flex-start",
          fontSize: responsiveValue(20, 18, 15),


          justifyContent: "flex-start",
          marginBottom: "10px",
          fontWeight: "700",
        }}
      >
        현재 EMP 비중
      </Row>

      <ShadowCol
        style={{
          boxSizing: "border-box",
          height: "auto",
          transition: "all 0.3s ease-in-out",
          // overflowY: "scroll",
          overflow: "hidden",
          textAlign: "center",
          padding: "15px 10px",
        }}
      >
        <Row
          style={{
            alignItems: "flex-start",
            fontSize: responsiveValue(18, 16, 14),

            justifyContent: "flex-start",
            marginBottom: "20px",
            fontWeight: "500",
          }}
        >
          <p style={{ fontSize: responsiveValue(18, 16, 14), fontWeight: "550", textAlign: "left" }}>
            {" "}
            <span style={{ color: "#990000" }}> {currentEMPTextDate}</span>에
            대한 투자 비중 예측 정보를 표시합니다.
          </p>
        </Row>
        <Col
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            // fontSize: responsiveValue(16, 14, 12),
            boxSizing: "border-box",
            height: "auto",
            transition: "all 0.3s ease-in-out",
            // overflowY: "scroll",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <Row
            style={{
              alignItems: "center",

              height: 70,
              justifyContent: "space-around",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 900,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              추천시점
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              Cash
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              KODEX 200
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              KODEX <br />코스닥150
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              KODEX  <br />Fn성장


            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              TIGER <br />우량가치
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              KODEX <br />MSCI모멘텀

            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              KODEX 200 <br />가치저변동
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              KODEX  <br />퀄리티Plus
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              ARIRANG <br />고배당주
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              KODEX <br />반도체
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              TIGER <br />헬스케어
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              KODEX <br />2차전지산업

            </div>
          </Row>
          <Row
            style={{
              flexDirection: "column",
              height: "auto",

              // overflowY: "scroll",
            }}
          >
            {currentdataLoader ? (
              <Oval
                height={50}
                width={50}
                color="#4fa94d"
                wrapperStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            ) : (
              <>
                {dbSignalCurrentData && user_info_reducer.company_name != "temp" ?
                  dbSignalCurrentData.map((list, index) => {
                    return (
                      <Row
                        key={index}
                        onClick={() => {
                          setSelectedStockDate(list.buying_date);
                        }}
                        style={{
                          backgroundColor:
                            selectedStockDate === list.buying_date
                              ? "#f3f3f3"
                              : "",
                          height: 50,
                          justifyContent: "space-around",
                          alignItems: "center",
                          fontSize: responsiveValue(16, 14, 12),
                        }}
                      >
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            overflow: "hidden",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.buying_date}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            overflow: "hidden",
                            fontSize: responsiveValue(14, 12, 8)

                          }}
                        >
                          {list.cash}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)

                          }}
                        >
                          {list.kodex_200}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.kodex_kq}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.kodex_growth}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.tiger_value}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.kodex_msci}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.kodex_value}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.kodex_qulity_plus}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.arirang_high_div}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.kodex_semicon}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.tiger_health}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.kodex_btry_indus}
                        </div>

                      </Row>
                    );
                  }) : dbSignalCurrentData.map((list, index) => {
                    return (
                      <Row
                        key={index}
                        onClick={() => {
                          setSelectedStockDate(list.buying_date);
                        }}
                        style={{
                          backgroundColor:
                            selectedStockDate === list.buying_date
                              ? "#f3f3f3"
                              : "",
                          height: 50,
                          justifyContent: "space-around",
                          alignItems: "center",
                          fontSize: responsiveValue(16, 14, 12),
                        }}
                      >
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            overflow: "hidden",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(18, 15, 10)
                          }}
                        >
                          {list.buying_date}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            overflow: "hidden",
                            fontSize: responsiveValue(14, 12, 8)

                          }}
                        >
                          {list.cash}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)

                          }}
                        >
                          {list.kodex_200}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.kodex_kq}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.kodex_growth}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.tiger_value}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.kodex_msci}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.kodex_value}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.kodex_qulity_plus}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.arirang_high_div}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.kodex_semicon}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.tiger_health}
                        </div>
                        <div
                          style={{
                            width: 110,
                            height: "auto",
                            display: "table-cell",
                            justifyContent: "space-around",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontSize: responsiveValue(14, 12, 8)
                          }}
                        >
                          {list.kodex_btry_indus}
                        </div>
                        {/* <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",
                              cursor: "pointer",
                              transition: "all 0.3s ease-in-out",
                            }}
                          >
                            {list.pv_return}
                          </div> */}
                      </Row>
                    );
                  })}
              </>
            )}
          </Row>
        </Col>
      </ShadowCol>

      <WhiteSpace height={25} />
      <Row
        style={{
          alignItems: "flex-start",
          fontSize: responsiveValue(20, 18, 15),

          justifyContent: "flex-start",
          marginBottom: "10px",
          fontWeight: "700",
        }}
      >
        과거 EMP 비중
      </Row>

      <ShadowCol
        style={{
          boxSizing: "border-box",
          height: "auto",
          transition: "all 0.3s ease-in-out",
          // overflowY: "scroll",
          overflow: "hidden",
          textAlign: "center",
          padding: "15px 10px",
        }}
      >
        <Row
          style={{
            alignItems: "flex-start",

            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <p style={{ fontSize: responsiveValue(18, 16, 14), fontWeight: "550", textAlign: "left" }}>
            <span style={{ color: "#990000" }}>{pastEMPTextDate}</span>에 대한
            투자 비중 예측 정보를 표시합니다.
          </p>
          <div className="enterprise_dbinvestment_dropdown" >
            <Dropdown
              controlClassName="dt_dropdown"
              options={options}
              onChange={_onSelect}
              value={options[0].label}
              placeholder="year"
            />
          </div>
        </Row>


        <Col
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            // fontSize: responsiveValue(16, 14, 12),
            boxSizing: "border-box",
            height: "auto",
            transition: "all 0.3s ease-in-out",
            // overflowY: "scroll",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <Row
            style={{
              alignItems: "center",

              height: 70,
              justifyContent: "space-around",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 900,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              추천시점
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              Cash
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              KODEX 200
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              KODEX <br />코스닥150
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              KODEX  <br />Fn성장


            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              TIGER <br />우량가치
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              KODEX <br />MSCI모멘텀

            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              KODEX 200 <br />가치저변동
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              KODEX  <br />퀄리티Plus
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              ARIRANG <br />고배당주
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              KODEX <br />반도체
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              TIGER <br />헬스케어
            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              KODEX <br />2차전지산업

            </div>
            <div
              style={{
                width: 110,
                display: "table-cell",
                fontWeight: 700,
                transition: "all 0.3s ease-in-out",
                fontSize: responsiveValue(14, 12, 8)
              }}
            >
              투자 <br />
              수익률
            </div>
          </Row>
          <Row
            style={{
              flexDirection: "column",
              height: "auto",

              // overflowY: "scroll",
            }}
          >
            {loader ? (
              <Oval
                height={50}
                width={50}
                color="#4fa94d"
                wrapperStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            ) : (
              <>
                {dbSignalData ?
                  dbSignalData
                    .slice(0, open ? dbSignalData.length : 5)
                    .map((list, index) => {
                      return (
                        <Row
                          key={index}
                          onClick={() => {
                            // setSelectedStockDate(list.buying_date);
                          }}
                          style={{
                            // backgroundColor:
                            //   selectedStockDate === list.buying_date
                            //     ? "#f3f3f3"
                            //     : "",
                            height: 50,
                            justifyContent: "space-around",
                            alignItems: "center",
                            fontSize: responsiveValue(16, 14, 12),
                          }}
                        >
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              overflow: "hidden",
                              display: "table-cell",
                              justifyContent: "space-around",
                              // cursor: "pointer",
                              transition: "all 0.3s ease-in-out",
                              fontSize: responsiveValue(14, 12, 8)
                            }}
                          >
                            {list.buying_date}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",
                              cursor: "pointer",
                              transition: "all 0.3s ease-in-out",
                              overflow: "hidden",
                              fontSize: responsiveValue(14, 12, 8)

                            }}
                          >
                            {list.cash}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",
                              cursor: "pointer",
                              transition: "all 0.3s ease-in-out",
                              fontSize: responsiveValue(14, 12, 8)

                            }}
                          >
                            {list.kodex_200}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",
                              cursor: "pointer",
                              transition: "all 0.3s ease-in-out",
                              fontSize: responsiveValue(14, 12, 8)
                            }}
                          >
                            {list.kodex_kq}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",
                              cursor: "pointer",
                              transition: "all 0.3s ease-in-out",
                              fontSize: responsiveValue(14, 12, 8)
                            }}
                          >
                            {list.kodex_growth}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",
                              cursor: "pointer",
                              transition: "all 0.3s ease-in-out",
                              fontSize: responsiveValue(14, 12, 8)
                            }}
                          >
                            {list.tiger_value}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",
                              cursor: "pointer",
                              transition: "all 0.3s ease-in-out",
                              fontSize: responsiveValue(14, 12, 8)
                            }}
                          >
                            {list.kodex_msci}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",
                              cursor: "pointer",
                              transition: "all 0.3s ease-in-out",
                              fontSize: responsiveValue(14, 12, 8)
                            }}
                          >
                            {list.kodex_value}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",
                              cursor: "pointer",
                              transition: "all 0.3s ease-in-out",
                              fontSize: responsiveValue(14, 12, 8)
                            }}
                          >
                            {list.kodex_qulity_plus}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",
                              cursor: "pointer",
                              transition: "all 0.3s ease-in-out",
                              fontSize: responsiveValue(14, 12, 8)
                            }}
                          >
                            {list.arirang_high_div}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",
                              cursor: "pointer",
                              transition: "all 0.3s ease-in-out",
                              fontSize: responsiveValue(14, 12, 8)
                            }}
                          >
                            {list.kodex_semicon}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",
                              cursor: "pointer",
                              transition: "all 0.3s ease-in-out",
                              fontSize: responsiveValue(14, 12, 8)
                            }}
                          >
                            {list.tiger_health}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",
                              cursor: "pointer",
                              transition: "all 0.3s ease-in-out",
                              fontSize: responsiveValue(14, 12, 8)
                            }}
                          >
                            {list.kodex_btry_indus}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",
                              // cursor: "pointer",
                              transition: "all 0.3s ease-in-out",
                              fontSize: responsiveValue(14, 12, 8)
                            }}
                          >
                            {list.pv_return}%
                          </div>
                        </Row>
                      );
                    }) : <Oval
                    height={50}
                    width={50}
                    color="#4fa94d"
                    wrapperStyle={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />}
              </>
            )}
          </Row>
        </Col>
        {dbSignalData.length > 5 && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a onClick={() => {
            setOpen((prev) => !prev);
          }}
            style={{
              cursor: "pointer",
              transform: `rotate(${open ? 180 : 0}deg)`,
              // margin: 10,
            }}
          >
            <img src={Arrow} style={{ width: 15, height: 15 }} />
          </a>
        )}
      </ShadowCol>
      <WhiteSpace height={25} />

      {/* section 3  Lime 결과 */}

      <Col
        style={{
          // width: 840,
          justifyContent: "flex-start",
          height: "auto",
          paddingBottom: 20,
        }}
      >
        <Row
          style={{
            alignItems: "flex-start",
            fontSize: responsiveValue(20, 18, 15),

            justifyContent: "flex-start",
            marginBottom: "10px",
            fontWeight: "700",
          }}
        >
          XAI 적용 결과값
        </Row>

        <ShadowCol
          style={{
            boxSizing: "border-box",
            height: "auto",
            transition: "all 0.3s ease-in-out",
            // overflowY: "scroll",
            overflow: "hidden",
            textAlign: "center",
            padding: "15px 10px",
          }}
        >
          {limeResult && (
            <>
              <Row
                style={{
                  alignItems: "flex-start",
                  fontSize: responsiveValue(18, 16, 14),

                  justifyContent: "flex-start",
                  marginBottom: "20px",
                  fontWeight: "500",
                }}
              >
                <p
                  style={{
                    fontSize: responsiveValue(18, 16, 14),
                    fontWeight: "550",
                    textAlign: "left",
                  }}
                >
                  복잡한 딥러닝 모델을 해석하여 의사결정 근거를 도출하기 위해 본
                  기술에 DT-XAI를 적용한 결과는 다음과 같습니다. 단, 각 중요
                  변수는 딥러닝에 대한 선형 근사시에 중요한 변수이기 때문에
                  딥러닝이 해당 변수를 중요하게 고려했다고 직접적으로 중요하다고
                  해석하는 것에는 주의가 필요합니다. DT-XAI를 통해 분석된 중요
                  변수는{" "}
                  <span style={{ color: "#990000" }}>{limeResultVar[0]} </span>,{" "}
                  <span style={{ color: "#990000" }}>{limeResultVar[1]}</span>
                  이며 각각{" "}
                  <span style={{ color: "#990000" }}>{limeResultImp[0]}</span>,{" "}
                  <span style={{ color: "#990000" }}>{limeResultImp[1]}</span>의
                  중요도를 가집니다. 아래의 표는 비교를 위한 각각의 중요
                  변수들에 대한 제거 실험입니다.
                </p>
              </Row>
              {limeResultLoader ? (
                <Oval
                  height={50}
                  width={50}
                  color="#4fa94d"
                  wrapperStyle={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#4fa94d"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              ) : limeResult.length > 0 ? (
                <Col
                  style={{
                    flex: 1,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    // fontSize: responsiveValue(16, 14, 12),
                    boxSizing: "border-box",
                    height: "auto",
                    transition: "all 0.3s ease-in-out",
                    // overflowY: "scroll",
                    overflow: "hidden",
                    textAlign: "center",
                  }}
                >
                  <table style={{
                    width: "100%",
                    borderCollapse: 'collapse',
                    overflowWrap: "anywhere",

                    ...tableStyle
                  }}>
                    <thead style={{
                      paddingTop: '2px'
                    }}>
                      <tr>
                        <th colSpan={7}
                          style={{
                            paddingTop: responsiveValue(10, 5, 5)
                          }} />
                      </tr>
                      <tr>
                        <th rowSpan={2} style={{ fontSize: responsiveValue(14, 12, 8) }}>추천시점</th>
                        <th rowSpan={2} style={{ fontSize: responsiveValue(14, 12, 8) }}>중요 변수</th>
                        <th rowSpan={2} style={{ fontSize: responsiveValue(14, 12, 8) }}>변수 중요도</th>
                        <th colSpan={8}
                          style={{
                            fontSize: responsiveValue(14, 12, 8),
                            paddingBottom: responsiveValue(7, 2, 2)
                          }}>중요 변수 제거 결과</th>
                      </tr>
                      <tr>
                        <th style={{ fontSize: responsiveValue(14, 12, 8) }}>Cash</th>
                        <th style={{ fontSize: responsiveValue(14, 12, 8) }}>   KODEX 200</th>
                        <th style={{
                          fontSize: responsiveValue(14, 12, 8)
                        }}
                        >
                          KODEX <br />코스닥150</th>
                        <th style={{
                          fontSize: responsiveValue(14, 12, 8)
                        }}
                        >
                          KODEX  <br />Fn성장</th>
                        <th style={{
                          fontSize: responsiveValue(14, 12, 8)
                        }}
                        >
                          TIGER <br />우량가치</th>
                        <th style={{
                          fontSize: responsiveValue(14, 12, 8)
                        }}
                        >
                          KODEX <br />MSCI모멘텀</th>
                        <th style={{
                          fontSize: responsiveValue(14, 12, 8)
                        }}
                        >
                          KODEX 200 <br />가치저변동</th>
                        <th style={{
                          fontSize: responsiveValue(14, 12, 8)
                        }}
                        >
                          KODEX  <br />퀄리티Plus</th>
                        <th style={{
                          fontSize: responsiveValue(14, 12, 8)
                        }}
                        >
                          ARIRANG <br />고배당주</th>
                        <th style={{
                          fontSize: responsiveValue(14, 12, 8)
                        }}
                        >
                          KODEX <br />반도체</th>
                        <th style={{
                          fontSize: responsiveValue(14, 12, 8)
                        }}
                        >
                          TIGER <br />헬스케어</th>
                        <th style={{
                          fontSize: responsiveValue(14, 12, 8)
                        }}
                        >
                          KODEX <br />2차전지산업</th>
                      </tr>
                    </thead>
                    <tbody>
                      {limeResult &&
                        limeResult.length > 0 &&
                        limeResult.map((list, index) => {
                          return (
                            <tr key={index}>
                              <td style={tdStyle}>{list.date}</td>
                              <td style={tdStyle}>{list.lime_var}</td>
                              <td style={tdStyle}>{list.lime_imp}</td>
                              <td style={tdStyle}>{list.cash ? list.cash.toFixed(3) : list.cash}</td>
                              <td style={tdStyle}>{list.kodex_200 ? list.kodex_200.toFixed(3) : list.kodex_200}</td>
                              <td style={tdStyle}>{list.kodex_kq ? list.kodex_kq.toFixed(3) : list.kodex_kq}</td>
                              <td style={tdStyle}>{list.kodex_growth ? list.kodex_growth.toFixed(3) : list.kodex_growth}</td>
                              <td style={tdStyle}>{list.tiger_value ? list.tiger_value.toFixed(3) : list.tiger_value}</td>
                              <td style={tdStyle}>{list.kodex_msci ? list.kodex_msci.toFixed(3) : list.kodex_msci}</td>
                              <td style={tdStyle}>{list.kodex_value ? list.kodex_value.toFixed(3) : list.kodex_value}</td>
                              <td style={tdStyle}>{list.kodex_qulity_plus ? list.kodex_qulity_plus.toFixed(3) : list.kodex_qulity_plus}</td>
                              <td style={tdStyle}>{list.arirang_high_div ? list.arirang_high_div.toFixed(3) : list.arirang_high_div}</td>
                              <td style={tdStyle}>{list.kodex_semicon ? list.kodex_semicon.toFixed(3) : list.kodex_semicon}</td>
                              <td style={tdStyle}>{list.tiger_health ? list.tiger_health.toFixed(3) : list.tiger_health}</td>
                              <td style={tdStyle}>{list.kodex_btry_indus ? list.kodex_btry_indus.toFixed(3) : list.kodex_btry_indus}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>

                  <Row style={{
                    alignItems: "flex-start",
                    fontSize: "18px",
                    marginTop: "30px",
                    justifyContent: "flex-start",
                    marginBottom: "10px",
                    fontWeight: "500",
                  }}>
                    <p
                      style={{
                        fontSize: responsiveValue(18, 16, 14),
                        fontWeight: "550",
                        textAlign: "left",
                      }}>
                      최근 중요 변수 변화는 다음과 같습니다.
                    </p>
                  </Row>
                  <table style={{
                    width: "100%",
                    borderCollapse: 'collapse',
                    overflowWrap: "anywhere",
                    ...tableStyle
                  }}>
                    <thead>
                      <tr>
                        <th colSpan={7}
                          style={{
                            paddingTop: responsiveValue(10, 5, 5)
                          }} />
                      </tr>
                      <tr>
                        <th rowSpan={2} style={{ fontSize: responsiveValue(14, 12, 8) }} >추천시점</th>
                        <th colSpan={5}
                          style={{
                            fontSize: responsiveValue(14, 12, 8),
                            paddingBottom: responsiveValue(7, 2, 2)
                          }} >상위 중요 변수 및 중요도</th>
                      </tr>

                      <tr>
                        <th style={{ fontSize: responsiveValue(14, 12, 8) }}>1위</th>
                        <th style={{ fontSize: responsiveValue(14, 12, 8) }}>2위</th>
                        <th style={{ fontSize: responsiveValue(14, 12, 8) }}>3위</th>
                        <th style={{ fontSize: responsiveValue(14, 12, 8) }}>4위</th>
                        <th style={{ fontSize: responsiveValue(14, 12, 8) }}>5위</th>
                      </tr>
                    </thead>
                    <tbody>
                      {xaiImpFeatureResultLoader == true ? <Oval
                        height={50}
                        width={50}
                        color="#4fa94d"
                        wrapperStyle={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      /> : xaiImpFeatureResult.length > 0 ? xaiImpFeatureResult && xaiImpFeatureResult.map(impFeature => (
                        <tr>
                          <td style={tdStyle}>{impFeature.date}</td>
                          <td style={tdStyle}>{impFeature.imp1_var}<br />{impFeature.imp1_score}</td>
                          <td style={tdStyle}>{impFeature.imp2_var}<br />{impFeature.imp2_score}</td>
                          <td style={tdStyle}>{impFeature.imp3_var}<br />{impFeature.imp3_score}</td>
                          <td style={tdStyle}>{impFeature.imp4_var}<br />{impFeature.imp4_score}</td>
                          <td style={tdStyle}>{impFeature.imp5_var}<br />{impFeature.imp5_score}</td>
                        </tr>
                      )) : null}

                      <tr>
                        <td style={{ padding: responsiveValue(5, 2, 2) }} colSpan={7}></td>
                      </tr>

                    </tbody>

                  </table>
                  {xaiImpFeatureResult.length == 0 && <div
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: color.DarkBlue,
                      width: "100%",
                      textAlign: "center",
                      alignItems: 'center'
                    }}
                  >
                    데이터를 불러오지 못했습니다.
                  </div>}
                  <Row style={{
                    alignItems: "flex-start",
                    fontSize: "18px",
                    marginTop: "30px",
                    justifyContent: "flex-start",
                    marginBottom: "10px",
                    fontWeight: "500",
                  }}>
                    <p style={{
                      fontSize: responsiveValue(18, 16, 14),
                      fontWeight: "550",
                      textAlign: "left",
                    }}
                    >
                      <span style={{ color: "#990000" }}>{"DT-XAI"}</span>를 적용한 최근 4개월간의 중요 변수(해당 기간 평균)와 그 변수의 중요도는 아래와 같습니다.</p>
                  </Row>
                  <table style={{ width: "100%", borderCollapse: 'collapse', overflowWrap: "anywhere", ...tableStyle }}>
                    <thead>
                      <tr>
                        <th colSpan={7}
                          style={{
                            paddingTop: responsiveValue(10, 5, 5)
                          }} />
                      </tr>
                      <tr>
                        <th rowSpan={2} style={{ fontSize: responsiveValue(14, 12, 8) }}>추천시점 (기간)</th>
                        <th colSpan={5}
                          style={{
                            fontSize: responsiveValue(14, 12, 8),
                            paddingBottom: responsiveValue(7, 2, 2)
                          }} >상위 중요 변수 및 중요도</th>
                      </tr>
                      <tr>
                        <th style={{ fontSize: responsiveValue(14, 12, 8) }}>1위</th>
                        <th style={{ fontSize: responsiveValue(14, 12, 8) }}>2위</th>
                        <th style={{ fontSize: responsiveValue(14, 12, 8) }}>3위</th>
                        <th style={{ fontSize: responsiveValue(14, 12, 8) }}>4위</th>
                        <th style={{ fontSize: responsiveValue(14, 12, 8) }}>5위</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dtxaiImpFeat4MonthLoader == true ? <Oval
                        height={50}
                        width={50}
                        color="#4fa94d"
                        wrapperStyle={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      /> : dTXaiImpFeat4MonthResult.length > 0 ? dTXaiImpFeat4MonthResult && dTXaiImpFeat4MonthResult.map(item => (
                        <tr>
                          <td style={tdStyle}>{item.date}</td>
                          <td style={tdStyleUp}>{item.imp1_var}<br />{item.imp1_score}</td>
                          <td style={tdStyleUp}>{item.imp2_var}<br />{item.imp2_score}</td>
                          <td style={tdStyleUp}>{item.imp3_var}<br />{item.imp3_score}</td>
                          <td style={tdStyleUp}>{item.imp4_var}<br />{item.imp4_score}</td>
                          <td style={tdStyleUp}>{item.imp5_var}<br />{item.imp5_score}</td>
                        </tr>)
                      ) : null}
                      {/* <tbody> */}

                      {/* <tr>
                      <td style={tdStyle}>2024-02-20 ~ 2024-03-20</td>
                      <td style={tdStyleUp}>NASDAQ<br />114</td>
                      <td style={tdStyleUp}>KOSPI<br />109</td>
                      <td style={tdStyleUp}>KS200 거래대금<br />108</td>
                      <td style={tdStyleUp}>OIL<br />108</td>
                      <td style={tdStyleUp}>S&P500<br />107</td>
                    </tr>
                    <tr>
                      <td style={tdStyle}>2024-01-19 ~ 2024-02-20</td>
                      <td style={tdStyleUp}>OIL<br />134</td>
                      <td style={tdStyleUp}>KS200 거래대금<br />124</td>
                      <td style={tdStyleUp}>NASDAQ<br />114</td>
                      <td style={tdStyleUp}>S&P500<br />106</td>
                      <td style={tdStyleUp}>DOW JONES<br />101</td>
                    </tr>

                    <tr>
                      <td style={tdStyle}>2023-12-19 ~ 2024-01-19</td>
                      <td style={tdStyleUp}>NASDAQ<br />123</td>
                      <td style={tdStyleUp}>GOLD<br />118</td>
                      <td style={tdStyleUp}>S&P500<br />104</td>
                      <td style={tdStyleUp}>OIL<br />103</td>
                      <td style={tdStyleUp}>DOW JONES<br />102</td>
                    </tr>

                    <tr>
                      <td style={tdStyle}>2023-11-20 ~ 2023-12-19</td>
                      <td style={tdStyleUp}>NASDAQ<br />122</td>
                      <td style={tdStyleUp}>GOLD<br />116</td>
                      <td style={tdStyleUp}>USDKRW<br />113</td>
                      <td style={tdStyleUp}>S&P500<br />106</td>
                      <td style={tdStyleUp}>DOW JONES<br />105</td>
                    </tr> */}

                      {/* <tr>
                      <td style={tdStyle}>2023-10-20 ~ 2023-11-20</td>
                      <td style={tdStyleUp}>NASDAQ<br />121</td>
                      <td style={tdStyleUp}>S&P500<br />119</td>
                      <td style={tdStyleUp}>USDKRW<br />117</td>
                      <td style={tdStyleUp}>DOW JONES<br />114</td>
                      <td style={tdStyleUp}>KOSPI<br />107</td>
                    </tr> */}
                      <tr>
                        <td style={{ padding: responsiveValue(5, 2, 2) }} colSpan={7}></td>
                      </tr>
                    </tbody>
                  </table>
                  {dTXaiImpFeat4MonthResult.length == 0 && <div
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: color.DarkBlue,
                      width: "100%",
                      textAlign: "center",
                      alignItems: 'center'
                    }}
                  >
                    데이터를 불러오지 못했습니다.
                  </div>}
                  <Row style={{
                    alignItems: "flex-start",
                    fontSize: "18px",
                    marginTop: "30px",
                    justifyContent: "flex-start",
                    marginBottom: "10px",
                    fontWeight: "500",
                  }}
                  >
                    <p style={{
                      fontSize: responsiveValue(18, 16, 14),
                      fontWeight: "550",
                      textAlign: "left",
                    }}
                    >
                      장기 대비 단기 중요도의 변화 정도는 아래와 같습니다.  <br />
                      <ul>중요도 변화
                        <ol>
                          &#183; 양수: 중요도의 순위가 올라간 변수
                        </ol>
                        <ol>
                          &#183; 음수: 중요도의 순위가 내려간 변수
                        </ol>
                      </ul>
                      {/* 가 인 것은 그만큼 중요도의 순위가 올라간 것을 의미하며 음수인 것은 그만큼 중요도의 순위가 내려간 변수임을 의미합니다. */}
                    </p>
                  </Row>
                  <table style={{
                    width: "100%",
                    borderCollapse: 'collapse',
                    overflowWrap: "anywhere",
                    ...tableStyle
                  }}
                  >
                    <thead>
                      <tr>
                        <th colSpan={7}
                          style={{
                            paddingTop: responsiveValue(10, 5, 5)
                          }} />
                      </tr>
                      <tr>
                        <th rowSpan={2}
                          style={{
                            fontSize: responsiveValue(14, 12, 8),
                          }}> 추천시점 (기준)</th>
                        <th style={{
                          fontSize: responsiveValue(14, 12, 8),
                          paddingBottom: responsiveValue(7, 2, 2)
                        }} colSpan={5}>상위 중요 변수 변수 중요도</th>

                      </tr>
                      <tr>
                        <th style={{ fontSize: responsiveValue(14, 12, 8) }} >1위</th>
                        <th style={{ fontSize: responsiveValue(14, 12, 8) }} >2위</th>
                        <th style={{ fontSize: responsiveValue(14, 12, 8) }} >3위</th>
                        <th style={{ fontSize: responsiveValue(14, 12, 8) }} >4위</th>
                        <th style={{ fontSize: responsiveValue(14, 12, 8) }} >5위</th>
                      </tr>
                    </thead>
                    <tbody>
                      {xaiLongShortImpLoader == true ? <Oval
                        height={50}
                        width={50}
                        color="#4fa94d"
                        wrapperStyle={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      /> : xaiLongShortImpResult.length > 0 ? xaiLongShortImpResult && xaiLongShortImpResult.map(item => (
                        <tr>
                          <td style={tdStyle}>{item.index} </td>
                          <td style={{ ...tdStyleUp, ...tdStyleBlue }}>{item.r1_var}<br />{item.r1_dff}</td>
                          <td style={{ ...tdStyleUp, ...tdStyleBlue }}>{item.r2_var}<br />{item.r2_dff}</td>
                          <td style={{ ...tdStyleUp, ...tdStyleRed }}>{item.r3_var}<br />{item.r3_dff}</td>
                          <td style={{ ...tdStyleUp, ...tdStyleRed }}>{item.r4_var}<br />{item.r4_dff}</td>
                          <td style={{ ...tdStyleUp, ...tdStyleRed }}>{item.r5_var}<br />{item.r5_dff}</td>
                        </tr>

                      )) : null}
                      {/* <tr>
                      <td style={tdStyle}>3개월 전 ~ 5일 전 </td>
                      <td style={{...tdStyleUp, ...tdStyleBlue}}>OIL<br />5</td>
                      <td style={{...tdStyleUp, ...tdStyleBlue}}>KOSPI<br />-4</td>
                      <td style={{...tdStyleUp, ...tdStyleRed}}>DOW JONES<br />3</td>
                      <td style={{...tdStyleUp, ...tdStyleRed}}>USDKRW<br />-2</td>
                      <td style={{...tdStyleUp, ...tdStyleRed}}>US_RATE_SPREAD<br />-2</td>
                    </tr>

                    <tr>
                      <td style={tdStyle}>3개월 전 ~ 1개월 전</td>
                      <td style={{...tdStyleUp, ...tdStyleBlue}}>KOSPI<br />-4</td> 
                      <td style={{...tdStyleUp, ...tdStyleRed}}>DOW JONES<br />2</td>
                      <td style={{...tdStyleUp, ...tdStyleRed}}>S&P500<br />2</td>
                      <td style={{...tdStyleUp, ...tdStyleBlue}}>GOLD<br />2</td>
                      <td style={{...tdStyleUp, ...tdStyleRed}}>OIL<br />1</td>
                    </tr>

                    <tr>
                      <td style={tdStyle}>6개월 전 ~ 1개월 전</td>
                      <td style={{...tdStyleUp, ...tdStyleBlue}}>KS200 거래대금<br />-6</td>
                      <td style={{...tdStyleUp, ...tdStyleBlue}}>DOW JONES<br />4</td>
                      <td style={{...tdStyleUp, ...tdStyleBlue}}>USDKRW<br />4</td>
                      <td style={{...tdStyleUp, ...tdStyleRed}}>S&P500<br />3</td>
                      <td style={{...tdStyleUp, ...tdStyleRed}}>KOSPI<br />-3</td>
                    </tr> */}
                      <tr>
                        <td style={{ padding: responsiveValue(5, 2, 2) }} colSpan={7}></td>
                      </tr>
                    </tbody>

                  </table>
                  {xaiLongShortImpLoader.length == 0 && <div
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: color.DarkBlue,
                      width: "100%",
                      textAlign: "center",
                      alignItems: 'center'
                    }}
                  >
                    데이터를 불러오지 못했습니다.
                  </div>}
                  {/* <Row
                  style={{
                    alignItems: "center",

                    height: 70,
                    justifyContent: "space-around",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                >

                  <div
                    style={{
                      width: 110,
                      display: "table-cell",
                      fontWeight: 700,
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    날짜
                  </div>
                  <div
                    style={{
                      width: 110,
                      display: "table-cell",
                      fontWeight: 700,
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    중요 변수
                  </div>
                  <div
                    style={{
                      width: 110,
                      display: "table-cell",
                      fontWeight: 700,
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    변수 중요도
                  </div>

                  <div
                    style={{
                      width: 110,
                      display: "table-cell",
                      fontWeight: 700,
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    Cash
                  </div>
                  <div
                    style={{
                      width: 110,
                      display: "table-cell",
                      fontWeight: 700,
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    전체 주식
                  </div>
                  <div
                    style={{
                      width: 110,
                      display: "table-cell",
                      fontWeight: 700,
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    대형주
                  </div>
                  <div
                    style={{
                      width: 110,
                      display: "table-cell",
                      fontWeight: 700,
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    ESG
                  </div>
                  <div
                    style={{
                      width: 110,
                      display: "table-cell",
                      fontWeight: 700,
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    성장
                  </div>
                  <div
                    style={{
                      width: 110,
                      display: "table-cell",
                      fontWeight: 700,
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    가치
                  </div>
                  <div
                    style={{
                      width: 110,
                      display: "table-cell",
                      fontWeight: 700,
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    중소형
                  </div>
                  <div
                    style={{
                      width: 110,
                      display: "table-cell",
                      fontWeight: 700,
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    배당
                  </div>
                </Row>
                <Row
                  style={{
                    flexDirection: "column",
                    height: "auto",
                  }}
                >
                  {limeResult &&
                    limeResult.length > 0 &&
                    limeResult.map((list, index) => {
                      return (
                        <Row
                          key={index}
                          style={{
                            height: 50,
                            justifyContent: "space-around",
                            alignItems: "center",
                            fontSize: responsiveValue(16, 14, 12),
                          }}
                        >
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              overflow: "hidden",
                              display: "table-cell",
                              justifyContent: "space-around",

                              transition: "all 0.3s ease-in-out",
                            }}
                          >
                            {list.date}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",

                              transition: "all 0.3s ease-in-out",
                              overflow: "hidden",
                            }}
                          >
                            {list.lime_var}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",

                              transition: "all 0.3s ease-in-out",
                            }}
                          >
                            {list.lime_imp}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",

                              transition: "all 0.3s ease-in-out",
                            }}
                          >
                            {list.cash}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",

                              transition: "all 0.3s ease-in-out",
                            }}
                          >
                            {list.all_stocks}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",

                              transition: "all 0.3s ease-in-out",
                            }}
                          >
                            {list.large_cap}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",

                              transition: "all 0.3s ease-in-out",
                            }}
                          >
                            {list.esg}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",

                              transition: "all 0.3s ease-in-out",
                            }}
                          >
                            {list.growth}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",

                              transition: "all 0.3s ease-in-out",
                            }}
                          >
                            {list.value}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",

                              transition: "all 0.3s ease-in-out",
                            }}
                          >
                            {list.mid_small}
                          </div>
                          <div
                            style={{
                              width: 110,
                              height: "auto",
                              display: "table-cell",
                              justifyContent: "space-around",

                              transition: "all 0.3s ease-in-out",
                            }}
                          >
                            {list.dividend}
                          </div>
                        </Row>
                      );
                    })}
                </Row> */}
                </Col>
              ) : (
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: color.DarkBlue,
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  데이터를 불러오지 못했습니다.
                </div>
              )}
            </>
          )}
        </ShadowCol>
      </Col>
      <WhiteSpace height={30} />

      {/* section 4  과거  비교  */}

      <>
        <Col
          style={{
            // width: 840,
            justifyContent: "flex-start",
            height: "auto",
            paddingBottom: 20,
          }}
        >
          <Row
            style={{
              alignItems: "flex-start",
              fontSize: responsiveValue(20, 18, 15),

              justifyContent: "flex-start",
              marginBottom: "10px",
              fontWeight: "700",
            }}
          >
            과거의 경제 상황과 현재의 경제 상황 비교
          </Row>

          <ShadowCol
            style={{
              boxSizing: "border-box",
              height: "auto",
              transition: "all 0.3s ease-in-out",
              // overflowY: "scroll",
              overflow: "hidden",
              textAlign: "center",
              padding: "15px 10px",
            }}
          >
            {limeMacroResult && (
              <>
                {" "}
                <Row
                  style={{
                    alignItems: "flex-start",
                    fontSize: responsiveValue(18, 16, 14),

                    justifyContent: "flex-start",
                    marginBottom: "20px",
                    fontWeight: "500",
                  }}
                >
                  <p
                    style={{
                      fontSize: responsiveValue(18, 16, 14),
                      fontWeight: "550",
                      textAlign: "left",
                    }}
                  >
                    최근 6개월 간 경제 상황을 종합적으로 분석해보았을 때, {limeMacroPastDate && limeMacroPastDate}{" "}
                    기간과 경제상황이 유사했고, 이 시점에 가장 중요했던 변수는{" "}
                    <span style={{ color: "#990000" }}>
                      {limeMacroSimVar[0]}, {limeMacroSimVar[1]}
                    </span>
                    입니다.{" "}
                  </p>
                </Row>
                {limeMacroResultLoader ? (
                  <Oval
                    height={50}
                    width={50}
                    color="#4fa94d"
                    wrapperStyle={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                ) : limeMacroResult.length > 0 ? (
                  <Col
                    style={{
                      flex: 1,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      // fontSize: responsiveValue(16, 14, 12),
                      boxSizing: "border-box",
                      height: "auto",
                      transition: "all 0.3s ease-in-out",
                      // overflowY: "scroll",
                      overflow: "hidden",
                      textAlign: "center",
                    }}
                  >
                    <TableContainer>
                      <Table sx={{
                        minWidth: 650,
                        '@media (max-width: 600px)': {
                          minWidth: '100%',
                        },
                      }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{ borderBottom: 0 }}
                              align="center"
                              style={{
                                fontSize: responsiveValue(14, 12, 8),
                                fontWeight: "550",
                                color: "#4f4f4f",
                              }}
                            >
                              구간
                            </TableCell>
                            <TableCell
                              sx={{ borderBottom: 0 }}
                              align="center"
                              style={{
                                fontSize: responsiveValue(14, 12, 8),
                                fontWeight: "550",
                                color: "#4f4f4f",
                              }}
                            >
                              과거 시점 중요 변수 1
                            </TableCell>
                            <TableCell
                              sx={{ borderBottom: 0 }}
                              align="center"
                              style={{
                                fontSize: responsiveValue(14, 12, 8),
                                fontWeight: "550",
                                color: "#4f4f4f",
                              }}
                            >
                              과거 시점 중요 변수 2
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {limeMacroResult &&
                            limeMacroResult.length > 0 &&
                            limeMacroResult.map((list, index) => (
                              <TableRow
                                key={index}
                                sx={{ "& td, & th": { borderBottom: 0 } }}
                              >
                                <TableCell
                                  align="center"
                                  style={{ fontSize: responsiveValue(14, 12, 8), color: "#4f4f4f" }}
                                >
                                  {list.date}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ fontSize: responsiveValue(14, 12, 8), color: "#4f4f4f" }}
                                >
                                  {list.sim_var1}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ fontSize: responsiveValue(14, 12, 8), color: "#4f4f4f" }}
                                >
                                  {list.sim_var2}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>


                    <Row
                      style={{
                        alignItems: "flex-start",
                        fontSize: responsiveValue(14, 12, 8),
                        flexWrap: "wrap",
                        justifyContent: isMobile ? 'center' : "space-around",
                        marginTop: "20px",
                        marginBottom: "20px",
                        fontWeight: "500",
                      }}
                    >

                      <MacroSimVarOneLineChart simLabel={limeMacroSimVar[0]} data={limeMacroChartData
                      } isMobile={isMobile} />
                      <MacroSimVarTwoLineChart simLabel={limeMacroSimVar[1]} data={limeMacroChartData
                      } isMobile={isMobile} />

                    </Row>


                    {/* 
<table  style={tableStyle}>
      <thead>
        <tr >
          <th style={{textAlign: "left",
    paddingLeft: "20px"}}>구간</th>
          <th style={{textAlign: "left",
    }}> 과거 시점 중요 변수 1</th>
          <th style={{textAlign: "right",
    paddingRight: "20px"}}> 과거 시점 중요 변수 2</th>
        
        </tr>
       
      </thead>
      <tbody>
      {limeMacroResult &&
                      limeMacroResult.length > 0 &&
                      limeMacroResult.map((list, index) => {
                        return (
                          <tr key={index}>
                          <td style={{textAlign: "left",
    paddingLeft: "20px",borderBottom:"none"}}>{list.date}</td>
                          <td style={{textAlign: "left",
    borderBottom:"none"}}>{list.sim_var1}</td>
                          <td style={{textAlign: "right",
     paddingRight: "20px",borderBottom:"none"}}>{list.sim_var2}</td>
                        </tr>
                        );
                      })}

      </tbody>
</table> */}

                    {/* 

                  <Row
                    style={{
                      alignItems: "center",

                      height: 88,
                      justifyContent: "space-between",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: 110,
                        display: "table-cell",
                        fontWeight: 700,
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      구간
                    </div>
                    <div
                      style={{
                        width: 110,

                        display: "table-cell",
                        fontWeight: 700,
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      과거 시점 
                <br />
                      중요 변수 1
                    </div>
                    <div
                      style={{
                        width: 110,
                        display: "table-cell",
                        fontWeight: 700,
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      과거 시점 
                <br />
                      중요 변수 2
                    </div>

                   
                  </Row>
                  
                  <Row
                    style={{
                      flexDirection: "column",
                      height: "auto",
                    }}
                  >
                    {limeMacroResult &&
                      limeMacroResult.length > 0 &&
                      limeMacroResult.map((list, index) => {
                        return (
                          <Row
                            style={{
                              alignItems: "center",
                              height: "auto",
                              justifyContent: "space-between",
                              fontSize: responsiveValue(16, 14, 12),
                            }}
                          >
                            <div
                              style={{
                                width: 110,
                                height: "auto",
                                overflow: "hidden",
                                display: "table-cell",
                                justifyContent: "space-between",

                                transition: "all 0.3s ease-in-out",
                              }}
                            >
                              {list.date}
                            </div>
                            <div
                              style={{
                                width: 110,
                                height: "auto",
                                display: "table-cell",
                                         justifyContent: "space-between",

                                transition: "all 0.3s ease-in-out",
                                overflow: "hidden",
                              }}
                            >
                              {list.sim_var1}
                            </div>
                            <div
                              style={{
                                width: 110,
                                height: "auto",
                                display: "table-cell",
                                justifyContent: "space-between",

                                transition: "all 0.3s ease-in-out",
                              }}
                            >
                              {list.sim_var2}
                            </div>
                            \                          </Row>
                        );
                      })}
                  </Row> */}





                    <Row
                      style={{
                        alignItems: "flex-start",
                        fontSize: responsiveValue(18, 16, 14),

                        justifyContent: "flex-start",
                        marginTop: "20px",
                        marginBottom: "20px",
                        fontWeight: "500",
                      }}
                    >
                      <p
                        style={{
                          fontSize: responsiveValue(18, 16, 14),
                          fontWeight: "550",
                          textAlign: "left",
                        }}
                      >
                        {" "}
                        또한 지난 3년 동안 평균적으로 중요했던 변수는{" "}
                        <span style={{ color: "#990000" }}>
                          {limeMacroAvgVar[0]}, {limeMacroAvgVar[1]},{" "}
                          {limeMacroAvgVar[2]}
                        </span>
                        입니다.
                      </p>
                    </Row>

                    <TableContainer>
                      <Table sx={{
                        minWidth: 650,
                        '@media (max-width: 600px)': {
                          minWidth: '100%',
                        },
                      }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{ borderBottom: 0 }}
                              align="center"
                              style={{
                                fontSize: responsiveValue(14, 12, 8),
                                fontWeight: "550",
                                color: "#4f4f4f",
                              }}
                            >
                              구간
                            </TableCell>
                            <TableCell
                              sx={{ borderBottom: 0 }}
                              align="center"
                              style={{
                                fontSize: responsiveValue(14, 12, 8),
                                fontWeight: "550",
                                color: "#4f4f4f",
                              }}
                            >
                              평균 중요 변수 1
                            </TableCell>
                            <TableCell
                              sx={{ borderBottom: 0 }}
                              align="center"
                              style={{
                                fontSize: responsiveValue(14, 12, 8),
                                fontWeight: "550",
                                color: "#4f4f4f",
                              }}
                            >
                              평균 중요 변수 2
                            </TableCell>
                            <TableCell
                              sx={{ borderBottom: 0 }}
                              align="center"
                              style={{
                                fontSize: responsiveValue(14, 12, 8),
                                fontWeight: "550",
                                color: "#4f4f4f",
                              }}
                            >
                              평균 중요 변수 3
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {limeMacroResult2 &&
                            limeMacroResult2.length > 0 &&
                            limeMacroResult2.map((list, index) => (
                              <TableRow
                                key={index}
                                sx={{ "& td, & th": { borderBottom: 0 } }}
                              >
                                <TableCell
                                  align="center"
                                  style={{ fontSize: responsiveValue(14, 12, 8), color: "#4f4f4f" }}
                                >
                                  {list.date}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ fontSize: responsiveValue(14, 12, 8), color: "#4f4f4f" }}
                                >
                                  {list.avg_var1}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ fontSize: responsiveValue(14, 12, 8), color: "#4f4f4f" }}
                                >
                                  {list.avg_var2}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ fontSize: responsiveValue(14, 12, 8), color: "#4f4f4f" }}
                                >
                                  {list.avg_var3}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    {/* 
<table  style={tableStyle}>
      <thead>
        <tr >
          <th style={{textAlign: "left",
    paddingLeft: "20px",width: "310px"}}>구간</th>
          <th style={{textAlign: "left",
    }}>  평균 중요 변수 1</th>
          <th style={{textAlign: "center"}}>  평균 중요 변수 2</th>
          <th style={{textAlign: "right",
    paddingRight: "20px"}}>  평균 중요 변수 3</th>
        </tr>
       
      </thead>
      <tbody>
      {limeMacroResult2 &&
                      limeMacroResult2.length > 0 &&
                      limeMacroResult2.map((list, index) => {
                        return (
                          <tr key={index}>
                          <td style={{textAlign: "left",
    paddingLeft: "20px",borderBottom:"none"}}>{list.date}</td>
                          <td style={{textAlign: "left",
    borderBottom:"none"}}>{list.avg_var1}</td>
                          <td style={{textAlign: "center",borderBottom:"none"}}>{list.avg_var2}</td>
              <td style={{textAlign: "right",
     paddingRight: "20px",borderBottom:"none"}}>{list.avg_var3}</td>
                        </tr>
                        );
                      })}

      </tbody>
</table> */}

                    {/* 
                  <Row
                    style={{
                      alignItems: "center",

                      height: 88,
                      justifyContent: "space-between",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: 110,
                        display: "table-cell",
                        fontWeight: 700,
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      구간
                    </div>
                    <div
                      style={{
                        width: 110,
                        display: "table-cell",
                        fontWeight: 700,
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      평균 중요<br />변수 1
                    </div>
                    <div
                      style={{
                        width: 110,
                        display: "table-cell",
                        fontWeight: 700,
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      평균 중요<br />변수 2
                    </div>
                    <div
                      style={{
                        width: 110,
                        display: "table-cell",
                        fontWeight: 700,
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      평균 중요<br />변수 3
                    </div>
                  </Row>
                  
                  <Row
                    style={{
                      flexDirection: "column",
                      height: "auto",

                      // overflowY: "scroll",
                    }}
                  >
                    {limeMacroResult2 &&
                      limeMacroResult2.length > 0 &&
                      limeMacroResult2.map((list, index) => {
                        return (
                          <Row
                            style={{
                              alignItems: "center",
                              height: "auto",
                              justifyContent: "space-between",
                              fontSize: responsiveValue(16, 14, 12),
                            }}
                          >
                            <div
                              style={{
                                width: 110,
                                height: "auto",
                                overflow: "hidden",
                                display: "table-cell",
                                justifyContent: "space-between",

                                transition: "all 0.3s ease-in-out",
                              }}
                            >
                              {list.date}
                            </div>
                            <div
                              style={{
                                width: 110,
                                height: "auto",
                                display: "table-cell",
                                justifyContent: "space-between",

                                transition: "all 0.3s ease-in-out",
                              }}
                            >
                              {list.avg_var1}
                            </div>
                            <div
                              style={{
                                width: 110,
                                height: "auto",
                                display: "table-cell",
                                justifyContent: "space-between",

                                transition: "all 0.3s ease-in-out",
                              }}
                            >
                              {list.avg_var2}
                            </div>
                            <div
                              style={{
                                width: 110,
                                height: "auto",
                                display: "table-cell",
                                justifyContent: "space-between",

                                transition: "all 0.3s ease-in-out",
                              }}
                            >
                              {list.avg_var3}
                            </div>
                          </Row>
                        );
                      })}
                  </Row> */}
                  </Col>
                ) : (
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: color.DarkBlue,
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    데이터를 불러오지 못했습니다.
                  </div>
                )}
              </>
            )}
          </ShadowCol>
          <WhiteSpace height={30} />
        </Col>
      </>

      {/* Section 4 차트 그리기   */}
      <Col
        style={{
          // width: 840,
          justifyContent: "flex-start",
          paddingBottom: 20,
          height: "auto",
        }}
      >
        <ShadowCol
          style={{
            // width: 840,
            height: "auto",
            padding: 15,
            justifyContent: "flex-start",
          }}
        >
          {chartDataLoader ? (
            <Oval
              height={50}
              width={50}
              color="#4fa94d"
              wrapperStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          ) : dbChartData ? (
            <>
              <LineChart data={dbChartData} isMobile={isMobile} />
              <Row>
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",

                    marginTop: "15px",
                    marginBottom: "15px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  DeeptradeTechnologies EMP Management (EMP Shannon) 기술의 월단위
                  성능과 시장 지표 (코스피 지수) 비교
                </p>
                <br />
              </Row>
            </>
          ) : (
            <div
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: color.DarkBlue,
                width: "100%",
                textAlign: "center",
              }}
            >
              차트 데이터가 없습니다.
            </div>
          )}
        </ShadowCol>
      </Col>
      <ToastContainer />
    </>
  );
}

export default DbInvestment;


