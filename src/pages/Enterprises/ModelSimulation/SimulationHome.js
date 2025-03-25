import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, } from "react-redux";
import { CloseOutlined } from '@ant-design/icons';
import { resetState } from "../../../redux/slices/loginSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SimulationHome() {
  const user_info_reducer = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [userIP, setUserIP] = useState("");
  const [tickers, setTickers] = useState([
    "AAPL", "AMZN", "AVGO", "COST", "GOOGL", "HD", "JNJ", "JPM", "LLY", "MA",
    "META", "MSFT", "NFLX", "NVDA", "PG", "TSLA", "UNH", "V", "WMT", "XOM"
  ]);
  // status can be "idle", "running", or "done"
  const [status, setStatus] = useState("idle");
  const today = new Date().toISOString().split('T')[0];
  // Additional input fields
  const [targetDate, setTargetDate] = useState(today);
  const [buyFee, setBuyFee] = useState("");
  const [server, setServer] = useState("");
  const [sellFee, setSellFee] = useState("");

  const onLogout = () => {
    dispatch(resetState());
    navigate("/enterprise", { replace: true });
  };

  const addTicker = () => {
    if (tickers.length < 20) {
      setTickers([...tickers, ""]);
    }
  };

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setUserIP(data.ip))
      .catch((error) => console.error("Error fetching IP:", error));
  }, []);

  const handleTickerChange = (index, newValue) => {
    const updatedTickers = [...tickers];
    updatedTickers[index] = newValue.toUpperCase();
    setTickers(updatedTickers);
  };

  const removeTicker = (index) => {
    const updatedTickers = [...tickers];
    updatedTickers.splice(index, 1);
    setTickers(updatedTickers);
  };

  const handleSubmit = () => {
    // Validate additional fields
    if (!targetDate || !buyFee || !server || !sellFee) {
      toast.error("모든 입력 필드를 채워주세요.");
      return;
    }
    // Ensure exactly 20 tickers
    if (tickers.length !== 20) {
      toast.error("총 20개의 티커를 입력해야 합니다.");
      return;
    }
    // Check for empty ticker entries
    if (tickers.some(ticker => ticker.trim() === "")) {
      toast.error("빈 티커가 존재합니다. 모든 티커를 입력해주세요.");
      return;
    }
    // Check that all tickers are unique
    if (new Set(tickers).size !== tickers.length) {
      toast.error("중복된 티커가 있습니다. 모든 티커는 유일해야 합니다.");
      return;
    }
    // If valid, simulate the running process
    setStatus("running");
    setTimeout(() => {
      setStatus("done");
      toast.success("프로그램 실행이 완료되었습니다.");
    }, 5000);
  };

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

      {/* MAIN CONTENT */}
      <main className="tw-flex-1 tw-w-full tw-max-w-7xl tw-mx-auto tw-p-4">
        <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-space-x-4">
          {/* RIGHT SECTION (NARROW) - appears first on mobile */}
          <section className="tw-order-1 md:tw-order-2 md:tw-w-1/5 tw-bg-white tw-rounded-md tw-shadow tw-p-4 sm:tw-my-4 tw-my-2 mx-4">
            <div className="tw-mb-4 tw-flex tw-flex-col tw-justify-start tw-items-start">
              <div className="tw-flex tw-flex-row tw-items-center tw-justify-center">
                <p className="tw-text-gray-700 tw-font-bold">접속자:</p> 
                <p className="tw-text-gray-700 tw-text-base">{user_info_reducer.company_usrnm}</p> 
              </div>
              <div className="tw-flex tw-flex-row tw-items-center tw-justify-center">
                <p className="tw-text-gray-700 tw-font-bold">접속 위치 IP:</p>
                <p className="tw-text-gray-700">{userIP || ''}</p>
              </div>
            </div>
            <div className="tw-flex tw-justify-center">
              <button 
                onClick={onLogout}
                className="tw-bg-red-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-hover:tw-bg-red-700 tw-cursor-pointer tw-border-0"
              >
                로그아웃
              </button>
            </div>
          </section>

          {/* LEFT SECTION (WIDER) - appears second on mobile */}
          <section className="tw-order-2 md:tw-order-1 md:tw-w-4/5 tw-bg-white tw-rounded-md tw-shadow tw-p-4 sm:tw-my-4 tw-my-2 mx-4">
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4 tw-mb-4">
              {/* Left sub-container */}
              <div>
                <div className="tw-mb-4">
                  <h3 className="tw-font-semibold tw-text-base">목표 리밸런싱일</h3>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="tw-border tw-rounded tw-p-1 tw-w-full tw-mt-1"
                    placeholder="2025-03-03"
                  />
                </div>
                <div>
                  <h3 className="tw-font-semibold tw-text-base">매수 수수료 (bp)</h3>
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
                    <option value="T2">T2</option>
                  </select>
                </div>
                <div>
                  <h3 className="tw-font-semibold tw-text-base">매도 수수료 (bp)</h3>
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

            {/* SNP 20 종목 리스트 with Add button aligned to right */}
            <div className="tw-mb-4">
              <div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
                <h3 className="tw-font-semibold tw-text-base">SNP 20 종목 리스트</h3>
                {tickers.length < 20 && (
                  <button 
                    onClick={addTicker}
                    className="tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-hover:tw-bg-blue-700 tw-border-0"
                  >
                    티커 추가하기
                  </button>
                )}
              </div>
              <div className="tw-grid tw-grid-cols-3 tw-gap-2">
                {tickers.map((ticker, index) => (
                  <div key={index} className="tw-relative tw-group">
                    <input 
                      value={ticker}
                      onChange={(e) => handleTickerChange(index, e.target.value)}
                      className="tw-border tw-rounded tw-p-2 tw-w-full"
                      placeholder="티커 이름"
                    />
                    <button
                      onClick={() => removeTicker(index)}
                      className="tw-absolute tw-top-0.5 tw-right-1 tw-p-1 tw-text-red-500 group-hover:tw-block tw-hidden tw-border-0 tw-bg-white"

                      >
                      <CloseOutlined />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 실행하기 Button */}
            <button 
              onClick={handleSubmit}
              disabled={!targetDate || !buyFee || !server || !sellFee || tickers.length !== 20}
              className={`tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-border-0 ${
                (!targetDate || !buyFee || !server || !sellFee || tickers.length !== 20)
                  ? 'tw-opacity-50 tw-cursor-not-allowed'
                  : 'tw-hover:tw-bg-blue-700'
              }`}
            >
              실행하기
            </button>

            <div className="tw-mt-6">
              <h3 className="tw-font-semibold tw-mb-2 tw-text-base">실행 로그</h3>
              <div className="tw-border tw-rounded tw-max-h-96 tw-h-96 tw-p-2 tw-overflow-y-auto tw-text-sm tw-bg-gray-50">
                로그가 여기 표시됩니다...
              </div>
            </div>

            <div className="tw-mt-6 tw-flex tw-space-x-2">
              {status !== "idle" && (
                <button className="tw-bg-gray-400 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-hover:tw-bg-gray-500 tw-border-0">
                  {status === "done" ? "완료" : "진행 중"}
                </button>
              )}
              {status === "done" && (
                <button className="tw-bg-green-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-hover:tw-bg-green-700 tw-border-0">
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
