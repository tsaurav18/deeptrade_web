import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import What from "./What/What";
import Mission from "./Mission/Mission";
import XPercent from "./XPercent/XPercent";
import Technology from "./Technology/Technology";
import Recruitment from "./Recruitment/Recruitment";
import News from "./News/News";
import Partnership from "./Partnership/Partnership";
import Footer from "./Footer/Footer";
import React, { useRef, useEffect, useState } from "react";
// import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Cookies from "universal-cookie";
import ReactGA from "react-ga";
import Newsletter from "./Newsletter/Newsletter";
import AOS from "aos";
import { useSearchParams } from "react-router-dom";
import VideoSection from "./VideoSection/VideoSection";
import Solution from "./Solution/Solution";
import NoticeBoard from "./NoticeBoard/NoticeBoard";

ReactGA.initialize("UA-177879135-2");
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  const [modalVisible, setModalVisible] = useState(false);

  const mainRef = useRef(null);
  const whatRef = useRef(null);
  const missionRef = useRef(null);
  const xpercentRef = useRef(null);
  const technologyRef = useRef(null);
  const newsRef = useRef(null);
  const newsletterRef = useRef(null);
  const noticeRef = useRef(null);

  const solutionRef = useRef(null);
  const cookies = new Cookies();

  const width = window.innerWidth;

  useEffect(() => {
    document.title = "딥트레이드테크놀로지스";
    const modalCookie = cookies.get("showModal");
    const cookieDate = new Date(modalCookie);
    const timeNow = new Date();
    if (!modalCookie) {
      setModalVisible(true);
    } else {
      getDateDifference(cookieDate, timeNow);
    }
    //add(2022/12/23)
    setTimeout(() => {
      const state = searchParams.get("goto");
      if (state) {
        newsletterRef.current.scrollIntoView();
      }
      //
    }, 1000);

    // const state = searchParams.get('goto')
    // if(state){
    //   newsletterRef.current.scrollIntoView();
    // }
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };

  const setModalCookie = () => {
    cookies.set("showModal", new Date(), { path: "/" });
    setModalVisible(false);
  };

  const getDateDifference = (date1, date2) => {
    const diffInDays = Math.abs(date2 - date1);
    var dateDiff = diffInDays / (1000 * 60 * 60 * 24);
    if (dateDiff > 1) {
      setModalVisible(true);
    }
  };

  return (
    <>
      <Header
        whatRef={whatRef}
        missionRef={missionRef}
        xpercentRef={xpercentRef}
        technologyRef={technologyRef}
        noticeRef={noticeRef}
        newsRef={newsRef}
        newsletterRef={newsletterRef}
        solutionRef={solutionRef}
      />
      <Main refProp={mainRef} />
      <Mission refProp={missionRef} />
      <What refProp={whatRef} />
      <Technology refProp={technologyRef} />
      <Solution refProp={solutionRef} />
      <XPercent refProp={xpercentRef} />
      <VideoSection />
      {/* <Recruitment /> */}
      <NoticeBoard refProp={noticeRef}/>
      <News refProp={newsRef} />
      <Partnership mainRef={mainRef} />
      <Newsletter refProp={newsletterRef} mainRef={mainRef} />
      <Footer />

      <Modal
        visible={false}
        footer={null}
        bodyStyle={{
          padding: 0,
        }}
        onCancel={closeModal}
        closeIcon={<CloseOutlined style={{ color: "white", fontSize: 20 }} />}
        width={400}
      >
        <div>
          {width > 800 ? (
            <img
              src="../../assets/modal/event_desktop.png"
              style={{
                width: "100%",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                cursor: "pointer",
              }}
              alt="Modal"
              onClick={() => {
                window.open("https://xpct.net", "_blank");
              }}
            />
          ) : (
            <img
              src="../../assets/modal/event_mobile.png"
              style={{
                width: "100%",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                cursor: "pointer",
              }}
              alt="Modal"
              onClick={() => {
                window.open("https://xpct.net", "_blank");
              }}
            />
          )}
          <div
            style={{
              backgroundColor: width > 800 ? "#990000" : "#990000",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              paddingBottom: 10,
              paddingTop: 5,
            }}
          >
            <div
              style={{
                backgroundColor: "black",
                color: "white",
                width: 120,
                padding: 10,
                marginLeft: "auto",
                textAlign: "center",
                borderRadius: 20,
                marginRight: 20,
                cursor: "pointer",
              }}
              onClick={setModalCookie}
            >
              하루 보지 않기
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default App;
