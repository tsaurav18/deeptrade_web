import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import { resetState } from "../../../redux/slices/loginSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { shinyongAPI } from "../../../api";
import { Oval } from "react-loader-spinner";



const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full w-full">
    <Oval
      
      height={20}
      width={20}
      color="#3b82f6" 
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#93c5fd"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  </div>
);
function SimulationHome() {
  const user_info_reducer = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allSelected, setAllSelected] = useState(false);
  const [logContent, setLogContent] = useState("");
  const [userIP, setUserIP] = useState("");
  // Initialize with some tickers; user can change these later.
  const [tickers, setTickers] = useState([
    "AAPL",
    "MSFT",
    "NVDA",
    "AMZN",
    "GOOGL",
    "META",
    "TSLA",
    "AVGO",
    "LLY",
    "JPM",
    "WMT",
    "V",
    "MA",
    "ORCL",
    "XOM",
    "UNH",
    "COST",
    "NFLX",
    "PG",
    "JNJ",
    "HD",
    "ABBV",
    "BAC",
    "KO",
    "PLTR",
    "CRM",
    "CVX",
    "TMUS",
    "CSCO",
    "ACN",
    "WFC",
    "IBM",
    "ABT",
    "MRK",
    "PM",
    "AXP",
    "MCD",
    "GE",
    "LIN",
    "MS",
    "NOW",
    "ISRG",
    "TMO",
    "DIS",
    "PEP",
    "QCOM",
    "GS",
    "T",
    "AMD",
    "MU"
  ]);
  const [selectedTickers, setSelectedTickers] = useState([]);
  const selectedTickersRef = useRef(selectedTickers);
  useEffect(() => {
    selectedTickersRef.current = selectedTickers;
  }, [selectedTickers]);
  const toastShownRef = useRef(false);
  const pollIntervalRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const today = new Date().toISOString().split("T")[0];
  const [targetDate, setTargetDate] = useState(today);
  const [buyFee, setBuyFee] = useState("10");
  const [server, setServer] = useState("T1");
  const [sellFee, setSellFee] = useState("10");
  const [showTickerList, setShowTickerList] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragColumn, setDragColumn] = useState(null);
  const numColumns = 3; // number of columns in grid
  const [dragMode, setDragMode] = useState(null); // "select" or "deselect"
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState([]);
  const [downloadFileName, setDownloadFileName] = useState("");
  const [dBStatus, setDBStatus] = useState(null);
  const [serverLoadingStatus, setServerLoadingStatus] = useState(false);
  const [dbLoadingStatus, setDbLoadingStatus] = useState(false);
  const [sy20List, setSy20List] = useState([])
  // Drag event handlers now use the ref so that they always get the latest state
  const handleMouseDown = (index) => {
    const isSelected = selectedTickersRef.current.includes(tickers[index]);
    setIsDragging(true);
    setDragColumn(index % numColumns);
    setDragMode(isSelected ? "deselect" : "select");

    if (isSelected) {
      setSelectedTickers((prev) => prev.filter((t) => t !== tickers[index]));
    } else {
      setSelectedTickers((prev) => [...prev, tickers[index]]);
    }
  };

  const handleMouseEnter = (index) => {
    if (!isDragging || dragColumn === null) return;

    // 현재 마우스가 지나간 티커의 열 번호 계산
    const currentColumn = index % numColumns;

    // 드래그 시작한 열과 같지 않다면 아무것도 하지 않음
    if (currentColumn !== dragColumn) return;

    const ticker = tickers[index];
    const isSelected = selectedTickersRef.current.includes(ticker);

    if (dragMode === "select" && !isSelected) {
      setSelectedTickers((prev) => [...prev, ticker]);
    } else if (dragMode === "deselect" && isSelected) {
      setSelectedTickers((prev) => prev.filter((t) => t !== ticker));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragColumn(null);
    setDragMode(null);
  };

  // Global mouseup to catch end of drag selection
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setDragColumn(null);
      }
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isDragging]);

  const onLogout = () => {
    dispatch(resetState());
    navigate("/enterprise", { replace: true });
  };

  const handleToggleAll = () => {
    if (allSelected) {
      setSelectedTickers([]); // 전체 취소
    } else {
      setSelectedTickers(tickers.slice(0, tickers.length)); // 최대 50개 선택
    }
    setAllSelected(!allSelected);
  };
  const handleSelectTicker = (ticker) => {
    if (selectedTickers.includes(ticker)) {
      setSelectedTickers((prev) => prev.filter((t) => t !== ticker));
    } else {
      if (selectedTickers.length >= tickers.length) {
        toast.warning(`최대 ${ticker.length}개까지만 선택 가능합니다.`);
        return;
      }
      setSelectedTickers((prev) => [...prev, ticker]);
    }
  };

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setUserIP(data.ip))
      .catch((error) => console.error("Error fetching IP:", error));
  }, []);


const collapseTqdmLines = (log) => {
  const progressRegex = /^\s*\d+%.*\]$/;
  const finalMarkerRegex = /신영\s*SNP.*\.xlsx\s*저장\s*완료/;
  const lines = log.split("\n");
  const newLines = [];
  let lastProgressLine = null;

  for (const line of lines) {
    if (progressRegex.test(line)) {
      // If it's a progress line, check the percentage
      const progressMatch = line.match(/(\d+)%/);
      const progressPercentage = progressMatch ? parseInt(progressMatch[1]) : null;

      if (progressPercentage === 100) {
        // If it's 100%, push the completed line and stop overwriting it
        newLines.push(line); // Append the 100% progress line
        lastProgressLine = null;
      } else {
        // Otherwise, keep overwriting the progress line
        lastProgressLine = line;
      }
    } else {
      // If it's not a progress line, push it immediately
      newLines.push(line);
    }
  }

  // If no final marker was found and there's a partial progress line, add it.
  if (!newLines.some(line => finalMarkerRegex.test(line)) && lastProgressLine) {
    newLines.push(lastProgressLine);
  }
  // if (lastProgressLine) {
  //   newLines.push(lastProgressLine);
  // }

  return newLines.join("\n");
};

  
  
  const handleSubmit = async () => {
    toastShownRef.current = false;
    // Validate input fields
    if (!targetDate || !buyFee || !server || !sellFee) {
      toast.error("모든 입력 필드를 채워주세요.");
      return;
    }
    if (selectedTickers.length < 20) {
      toast.error("최소 20개의 티커를 선택해야 합니다.");
      return;
    }
    if (selectedTickers.length > tickers.length) {
      toast.error("최대 50개의 티커만 선택할 수 있습니다.");
      return;
    }
    if (new Set(selectedTickers).size !== selectedTickers.length) {
      toast.error("중복된 티커가 있습니다.");
      return;
    }
    try {
      setIsLoading(true);
      const body = {
        targetDate,
        buyFee: parseFloat(buyFee) / 100,
        server,
        sellFee: parseFloat(sellFee) / 100,
        tickers: [selectedTickers],
      };
      
      const res = await shinyongAPI.runShinyongProcess(body);
      // console.log("Simulation response:", res);
      if (res.status !== 200) {
        toast.error(String(res.data.error));
        setIsLoading(false);
      }

      if (res.data.message) {
        toast.success(res.data.message);
      }

      // Process started
      setStatus("running");

      // Start polling the log endpoint every 2 seconds
      pollIntervalRef.current = setInterval(async () => {
        try {
          const serverData = { server: server };
          const logData = await shinyongAPI.getLog(serverData);
          const cleanedLog = collapseTqdmLines(logData);
          setLogContent(cleanedLog);
      
          // Updated regex to match the file name with alphanumeric characters and hyphens
          const regex = /SNP20_ReDay\d+_ID[\w-]+\.xlsx/;
          const match = logData.match(regex);
          console.log("match", match);
          if (match) {
            // Stop polling once the file is found
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
            setStatus("done");
            setIsLoading(false);
            setDownloadFileName(match[0]); // Save filename for download
      
            if (!toastShownRef.current) {
              toast.success("프로그램 실행이 완료되었습니다.");
              toastShownRef.current = true;
            }
          }
      
          if (logData.includes("Traceback") || logData.includes("ModuleNotFoundError")) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
            setStatus("error");
            setIsLoading(false);
            if (!toastShownRef.current) {
              toast.error("프로그램 실행 중 오류가 발생했습니다.");
              toastShownRef.current = true;
            }
            return; // Stop further processing in this callback
          }
        } catch (error) {
          setIsLoading(false);
          setStatus("idle");
          console.error("Error fetching log:", error);
        }
      }, 1000);
    } catch (error) {
      console.error("Error submitting simulation:", error);
      toast.error("프로그램 실행 중 오류가 발생했습니다.");
      setIsLoading(false);
      setStatus("idle");
      return;
    }
  };
  // Cleanup polling interval on component unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setServerLoadingStatus(true)
    const fetchServerStatus = async () => {
      try {
        const response = await shinyongAPI.getServerStatus();
        console.log("Server Status:", response);
        const filteredResponse = response.filter(
          (server) => server.name === "T1" || server.name === "T3"
        );
        const sortedResponse = filteredResponse.sort((a, b) => b.id - a.id);
        setServerStatus(sortedResponse);
        setServerLoadingStatus(false)
      } catch (error) {
        console.error("Error fetching server status:", error);
        setServerLoadingStatus(false)
      }
    };

    // Call it immediately
    fetchServerStatus();
    // And then every 30 seconds
    const intervalId = setInterval(fetchServerStatus, 30000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setDbLoadingStatus(true)
    const fetchDBStatus = async () => {
      try {
        const response = await shinyongAPI.getDBStatus();
        console.log("Fetched DB Status:", response);

        // 👇 If the response is { data: [...] }, extract .data
        const dbData = Array.isArray(response) ? response : response.data;
        setDBStatus(dbData); // Make sure it's a list
        setDbLoadingStatus(false)
      } catch (error) {
        console.error("Error fetching DB status:", error);
        setDbLoadingStatus(false)
      }
    };

    fetchDBStatus();
    const dbIntervalId = setInterval(fetchDBStatus, 30000);

    return () => clearInterval(dbIntervalId);
  }, []);

  const handleDownload = async () => {
    if (downloadFileName) {
      try {
        const data = {
          downloadFileName: downloadFileName,
          server: server
        };

        await shinyongAPI.downloadFile(data).then((response) => {
          console.log("response", response);
          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // MIME type for Excel files
            encoding: "UTF-8",
          });
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = url;
          a.download = downloadFileName;
          document.body.appendChild(a); // append the element to the dom
          a.click();
          a.remove(); // afterwards, remove the element
        });
      } catch (error) {
        toast.error("파일을 다운로드하는 중 오류가 발생했습니다.");
        console.error("Error downloading file:", error);
      }
    } else {
      console.log("No file name to download.");
      toast.error("파일을 찾을 수 없습니다.");
    }
  };

  useEffect(() => {
    
    
    const fetchSY20  = async () => {
    try {
      const res = await shinyongAPI.getSY_SNP_20();
      console.log("SY_SNP_20 response:", res);
      if (res.length >= 0) {
        const data = res[0];
        const stockValues20 = Object.keys(data)
          .filter(key => key !== "date")  // Remove the date key
          .map(key => data[key]);
          setSy20List(stockValues20)
          setSelectedTickers(stockValues20);
      }

  } catch (error) {     
    console.error("Error setting up beforeunload event:", error);
  }
   }
   fetchSY20()

    return () => {
      
    }
  }, [])
  console.log(server)
  return (
    <div className="tw-flex tw-flex-col tw-min-h-screen tw-bg-gray-50 tw-text-sm">
      <ToastContainer />
      {/* HEADER */}
      <header className="tw-bg-white tw-text-gray-800 tw-p-4 tw-shadow">
        <div className="tw-max-w-7xl tw-mx-auto tw-flex tw-items-center">
          <img
            src="/assets/enterprise_logo.png"
            className="tw-w-36 tw-h-auto tw-mr-4"
            alt="logo"
          />
          <h1 className="tw-text-lg tw-font-bold">DeepTrade Enterprise</h1>
        </div>
      </header>

      <main className="tw-flex-1 tw-w-full tw-max-w-7xl tw-mx-auto tw-p-4">
  <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-4">


          <section className="tw-order-2 md:tw-order-1 md:tw-w-3/5 tw-bg-white tw-rounded-md tw-shadow tw-p-4 sm:tw-my-4 tw-my-2 mx-2">
         
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-1 tw-gap-1">
              <h3 className="tw-font-semibold tw-text-base tw-mb-2 tw-px-2">
                서버 상태
              </h3>
              {serverLoadingStatus ?   <div className="w-full flex items-center justify-center py-4">  <LoadingSpinner/></div>:<>
              {serverStatus && serverStatus.length > 0 ? (
                serverStatus.map((server, index) => (
                  <div
                    key={index}
                    className="tw-border tw-rounded tw-py-2 tw-px-2 tw-mb-2 tw-flex tw-justify-between tw-items-center"
                  >
                    <span className="tw-font-semibold tw-text-base">
                      서버 네임: {server.name}
                    </span>
                    <span className="tw-font-semibold tw-text-base">
                      CPU: {server.cpu_percent}%
                    </span>
                    <span className="tw-font-semibold tw-text-base">
                      MEM: {server.memory_percent}%
                    </span>
                    <span className="tw-font-semibold tw-text-base">
                      DISK: {server.disk_percent}%
                    </span>
                    <span className="tw-flex tw-items-center">
                      <span
                        className={`tw-w-3 tw-h-3 tw-rounded-full tw-inline-block tw-mr-1  ${
                          server.status === "online"
                            ? "tw-bg-green-500"
                            : "tw-bg-red-500"
                        }`}
                      ></span>
                      <span className="tw-font-semibold tw-text-base">
                        {" "}
                        상태:{" "}
                        {server.status === "online" ? "온라인" : "오프라인"}
                      </span>
                    </span>
                  </div>
                ))
              ) : (
                <p className="tw-text-gray-500 tw-px-2">No server status available.</p>
              )}
              </>}
            </div>

            
            <div className="tw-w-full tw-h-px tw-bg-gray-300 tw-my-2"></div>

            
            <div className=" tw-mt-4">
            <h3 className="tw-font-semibold tw-text-base tw-mb-4 tw-px-2">
                데이터베이스 상태
              </h3>
              {dbLoadingStatus ? <div className="w-full flex items-center justify-center py-4"> <LoadingSpinner/></div>:<>
              {dBStatus && dBStatus.length > 0 ? (
                <>
                  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-mb-5">
                    <div className="tw-flex tw-items-center tw-space-x-2">
                      <span className="tw-w-3 tw-h-3 tw-rounded-full tw-bg-green-500"></span>
                      <span className="tw-font-semibold tw-text-base">
                        상태:
                      </span>
                      <span className="tw-text-green-600 tw-font-semibold tw-text-base">
                        정상
                      </span>
                    </div>

                    <div className="tw-flex tw-items-center tw-space-x-2">
                      <span
                        className={`tw-w-3 tw-h-3 tw-rounded-full ${
                          dBStatus?.find((d) => d.data === "crawl")?.status ===
                          1
                            ? "tw-bg-green-500"
                            : "tw-bg-red-500"
                        }`}
                      ></span>
                      <span className="tw-font-semibold tw-text-base">
                        수집 상태:
                      </span>
                      <span
                        className={`tw-font-semibold tw-text-base ${
                          dBStatus?.find((d) => d.data === "crawl")?.status ===
                          1
                            ? "tw-text-green-600"
                            : "tw-text-red-500"
                        }`}
                      >
                        {dBStatus?.find((d) => d.data === "crawl")?.status === 1
                          ? "정상"
                          : "연결되지 않음"}
                      </span>
                    </div>

                    {/* 오류 수정 */}
                    <div className="tw-flex tw-items-center tw-space-x-2">
                      <span
                        className={`tw-w-3 tw-h-3 tw-rounded-full ${
                          dBStatus?.find((d) => d.data === "error")?.status ===
                          1
                            ? "tw-bg-green-500"
                            : "tw-bg-yellow-500"
                        }`}
                      ></span>
                      <span className="tw-font-semibold tw-text-base">
                        데이터 오류 수정:
                      </span>
                      <span
                        className={`tw-font-semibold tw-text-base ${
                          dBStatus?.find((d) => d.data === "error")?.status ===
                          1
                            ? "tw-text-green-600"
                            : "tw-text-yellow-600"
                        }`}
                      >
                        {dBStatus?.find((d) => d.data === "error")?.status === 1
                          ? "정상"
                          : "오류 발생"}
                      </span>
                    </div>
                  </div>

                  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                    <p className="tw-font-semibold tw-text-base">
                      최근 수집 날짜:{" "}
                      {dBStatus
                        ?.find((d) => d.data === "crawl")
                        ?.filing_date?.split("T")[0] || "N/A"}
                    </p>
                    <p className="tw-font-semibold tw-text-base">
                      최신 데이터 날짜:{" "}
                      {dBStatus
                        ?.find((d) => d.data === "final")
                        ?.filing_date?.split("T")[0] || "N/A"}
                    </p>
                  </div>
                </>
              ) : (
                <p className="tw-text-gray-500 tw-px-2">
                  No database status available.
                </p>
              )}
              </>
              }
            
            </div>
          </section>

          <section className="tw-order-1 md:tw-order-2 md:tw-w-2/5 tw-bg-white tw-rounded-md tw-shadow tw-p-4 sm:tw-my-4 tw-my-2 mx-1">
            <div className="tw-mb-4 tw-flex tw-flex-col tw-justify-start tw-items-start">
              <div className="tw-flex tw-flex-row tw-items-center tw-justify-center">
                <span className="tw-text-gray-700 tw-font-semibold tw-text-base tw-mb-2">
                  접속자: {user_info_reducer.company_usrnm}
                </span>
              </div>
              <div className="tw-flex tw-flex-row tw-items-center tw-justify-center">
                <span className="tw-text-gray-700 tw-font-semibold tw-text-base">
                  접속 위치 IP: {userIP || ""}
                </span>
              </div>
            </div>
            <div className="tw-flex ">
              <button
                onClick={onLogout}
                className="tw-bg-red-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-hover:tw-bg-red-700 tw-cursor-pointer tw-border-0"
              >
                로그아웃
              </button>
            </div>
          </section>
        </div>
      

      </main>
      {/* MAIN CONTENT */}
      <main className="tw-flex-1 tw-w-full tw-max-w-7xl tw-mx-auto tw-p-4">
        <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-4">
          {/* RIGHT SECTION (NARROW) - appears first on mobile */}

          {/* LEFT SECTION (WIDER) - appears second on mobile */}
          <section className="tw-order-2 md:tw-order-1 md:tw-w-full tw-bg-white tw-rounded-md tw-shadow tw-p-4 sm:tw-my-4 tw-my-2 mx-2">
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4 tw-mb-4">
              {/* Left sub-container */}
              <div>
                <div className="tw-mb-4">
                  <h3 className="tw-font-semibold tw-text-base">
                    목표 리밸런싱일
                  </h3>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="tw-border tw-rounded tw-p-1 tw-w-full tw-mt-1"
                    placeholder="2025-03-03"
                  />
                </div>
                <div>
                  <h3 className="tw-font-semibold tw-text-base">
                    매수 수수료 (bp)
                  </h3>
                  <input
                    type="number"
                    step="any"
                    value={buyFee}
                    onChange={(e) => setBuyFee(e.target.value)}
                    className="tw-border tw-rounded tw-p-1 tw-w-full tw-mt-1"
                    placeholder="매수 수수료"
                  />
                </div>
              </div>
              {/* Right sub-container */}
              <div>
                <div className="tw-mb-4">
                  <h3 className="tw-font-semibold tw-text-base">서버 선택</h3>
                  <select
                    value={server}
                    onChange={(e) => setServer(e.target.value)}
                    className="tw-border tw-rounded tw-p-1 tw-w-full tw-mt-1"
                  >
                    <option value="">선택</option>
                    <option value="T1">T1</option>
                    <option value="T3">T3</option>
                  </select>
                </div>
                <div>
                  <h3 className="tw-font-semibold tw-text-base">
                    매도 수수료 (bp)
                  </h3>
                  <input
                    type="number"
                    step="any"
                    value={sellFee}
                    onChange={(e) => setSellFee(e.target.value)}
                    className="tw-border tw-rounded tw-p-1 tw-w-full tw-mt-1"
                    placeholder="매도 수수료"
                  />
                </div>
              </div>
            </div>

            {/* Ticker Selection Panel Toggle */}
            <div className="tw-my-10">
              <span
                onClick={() => setShowTickerList(!showTickerList)}
                className="tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-hover:tw-bg-blue-700 tw-border-0"
              >
                종목 선택하기
              </span>
            </div>

            {showTickerList && (
              <div className="tw-mb-4">
                <h3 className="tw-font-semibold tw-text-base tw-mb-2">
                  티커 리스트
                </h3>
                <div className="tw-grid tw-grid-cols-3 tw-gap-2">
                  {tickers.map((ticker, index) => (
                    <label
                      key={index}
                      className="tw-flex tw-items-center tw-space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={ticker}
                        checked={selectedTickers.includes(ticker)}
                        onMouseDown={() => handleMouseDown(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseUp={handleMouseUp}
                        className="tw-form-checkbox tw-accent-blue-600 tw-transform tw-scale-125"
                      />
                      <span
                        className="tw-text-xl"
                        onClick={() => handleSelectTicker(ticker)}
                      >
                        {ticker}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="tw-flex tw-items-center tw-justify-between tw-mt-2">
                  <p className="tw-text-xm tw-text-gray-500">
                    선택된 종목 수: {selectedTickers.length} (최소 20, 최대{" "}
                    {tickers.length}개)
                  </p>
                  <button
                    onClick={handleToggleAll}
                    className="tw-text-xs tw-text-blue-600 tw-p-2 tw-rounded tw-font-bold tw-border-gray-100"
                  >
                    {allSelected ? "전체 취소" : "전체 선택하기"}
                  </button>
                </div>
              </div>
            )}

            {/* 실행하기 Button */}
            {selectedTickers.length >= 20 && (
              <button
                onClick={handleSubmit}
                disabled={
                  !targetDate ||
                  !buyFee ||
                  !server ||
                  !sellFee ||
                  selectedTickers.length < 20 ||
                  isLoading
                }
                className={`tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-border-0 ${
                  !targetDate ||
                  !buyFee ||
                  !server ||
                  !sellFee ||
                  isLoading ||
                  selectedTickers.length < 20
                    ? "tw-opacity-50 tw-cursor-not-allowed"
                    : "tw-hover:tw-bg-blue-700"
                }`}
              >
                실행하기
              </button>
            )}

            <div className="tw-mt-6">
              <h3 className="tw-font-semibold tw-mb-2 tw-text-base">
                실행 로그
              </h3>
              <pre className="tw-border tw-rounded tw-max-h-96 tw-h-96 tw-p-2 tw-overflow-y-auto tw-text-sm tw-bg-gray-50">
                {logContent || "로그가 여기 표시됩니다..."}
              </pre>
            </div>

            <div className="tw-mt-6 tw-flex tw-space-x-2">
              {status !== "idle" && (
                <button
                  onClick={() => {
                    if (status === "done" || status === "error") {
                      clearInterval(pollIntervalRef.current);
                      setIsLoading(false);
                      setStatus("idle");
                      setLogContent("");
                    }
                  }}
                  className="tw-bg-gray-400 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-hover:tw-bg-gray-500 tw-border-0"
                >
                  {status === "done"
                    ? "리셋"
                    : status === "error"
                    ? "리셋"
                    : "진행 중"}
                </button>
              )}
              {status === "done" && (
                <button
                  disabled={status !== "done"}
                  onClick={() => {
                    handleDownload();
                  }}
                  className="tw-bg-green-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-hover:tw-bg-green-700 tw-border-0"
                >
                  CSV 다운로드
                </button>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER (OPTIONAL) */}
      <footer className="tw-bg-gray-200 tw-text-gray-700 tw-p-4 tw-text-center tw-flex tw-flex-row tw-items-center tw-justify-center">
        <p className="tw-text-xs">
          © {new Date().getFullYear()} DeepTrade Enterprise
        </p>
      </footer>
      <ToastContainer />
    </div>
  );
}

export default SimulationHome;
