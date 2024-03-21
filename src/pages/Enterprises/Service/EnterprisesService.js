import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Bell from "../../../assets/icons/bell.png";
import Logout from "../../../assets/icons/logout.png";
import Setting from "../../../assets/icons/setting.png";
import color from "../../../style/color";
import { Col, Row, ShadowCol, WhiteSpace } from "../../../style/globalStyled";
import "./EnterprisesService.css";
import HomePage from "./HomePage";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { resetState } from "../../../redux/slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useResponsive } from "../../../hooks/useResponsive";
import { useTitle } from "../../../routing/DocumentNameChanger";
import { useMediaQuery } from "react-responsive";
import { getDtData } from "../../../api";
import DbInvestment from "./DbInvest/DbInvestment";

const EnterprisesService = () => {
  useTitle("딥트레이드 엔터프라이즈");
  
  const isTablet = useMediaQuery({
    query: "(min-width:481px) and (max-width:1240px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width:481px)",
  });
  
  const [activeScrollbar, setActiveScrollbar] = useState(true);
  const [dbSignalData, setDbSignalData] = useState([])
  const [loader, setLoader] = useState(false);
  const user_info_reducer = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { responsiveValue } = useResponsive()
  const onLogout = () => {
    dispatch(resetState());
    navigate("/enterprise", { replace: true });
  };
  function scrollbarHandler(value) {
    setActiveScrollbar(value);
  }
//   const getDbInvestmentSignal =async()=>{
//     setLoader(true)
//     try {
//       const res = await getDtData.getDBInvestData(user_info_reducer.company_name)
//       if(res.status===200){
//         console.log(res.data)
//         setDbSignalData(res.data)
//       }else if(res.status===500){
//         const res = await getDtData.getDBInvestData(user_info_reducer.company_name)
//         setDbSignalData(res.data)
        
//       }
//       else{
//         setDbSignalData([])
//         console.log("res.status",res.status)
//       }
//     } catch (error) {
//       toast("서버 접속 에러 관리자에게 문의해주세요.");
//     }
//     setLoader(false)
//   }
// useEffect(() => {
//   let isComponentRender = true
//   if(isComponentRender===true){
//     getDbInvestmentSignal()
//   }


//   return () => {
//     isComponentRender = false
//   }
// }, [])



// console.log("user_info_reducer",user_info_reducer)
  return (
    <Col
      style={{
        // width: "100vw",
        // height: "115vh",
        background:
          "linear-gradient(90deg, #FAFAFF 0.24%, #F2F0FF 99.7%, #F2F0FF 99.7%)",
        overflow: "hidden",
      }}
    >
      <Row
        style={{
          width: "100%",
          maxWidth: 1280,
          // height: 75,
          paddingTop: 10,
          paddingLeft: 20,
          paddingRight: 20,
          justifyContent: responsiveValue("flex-start","space-between","space-between" ),
        }}
      >
        <img
          src={"/assets/enterprise_logo1.png"}
          alt="logo"
          style={{ height:responsiveValue("50px", "50px", "48px"), width: "191px" }}
        />
        {isTablet && <Row style={{ height: "auto" , width:responsiveValue(0, 82, 73), backgroundColor:"#fff", padding:7, borderRadius:5, textAlign:"center"}}>
              <div
                style={{ fontWeight: "bold", flex: 1, cursor: "pointer" }}
                onClick={onLogout}
              >
                로그아웃
              </div>
             
            </Row> }
        {isMobile && <Row style={{ height: "auto" , width:responsiveValue(0, 0, 73),backgroundColor:"#fff", padding:7, borderRadius:5, textAlign:"center"}}>
              <div
                style={{ fontWeight: "bold", flex: 1, cursor: "pointer" }}
                onClick={onLogout}
              >
                로그아웃
              </div>
             
            </Row> }
      </Row>
      <WhiteSpace height={25} />
      <Row
        style={{
          width: "100%",
          maxWidth: 1240,
          alignItems: "flex-start",
          // height:"100vh"
        }}
      >
        <Col
          style={{
            flex: 1,
            // height: 900,
            overflowY: "hidden",
            justifyContent: "flex-start",
            overflowX: "hidden",
            flexShrink: 0,
            paddingRight: responsiveValue(0, 20, 20),
            paddingLeft: responsiveValue(0, 20, 20),
          }}
        > 

        {user_info_reducer.company_name ==="DB" || user_info_reducer.company_name ==="temp"?   
     
          <DbInvestment/>
          : <Routes>
          <Route
            path=""
            exact={true}
            element={<HomePage scrollbarHandler={scrollbarHandler} />}
          />
         
        </Routes>}
         
        </Col>
        {responsiveValue(true, false, false) && <>
          <WhiteSpace width={20} />
          <ShadowCol
            style={{
              width: 190,
              height:user_info_reducer.company_usrnm==="dbinvestment"?"100vh": 820,
              padding: 20,
              justifyContent: "flex-start",
            }}
          >
            {/* <WhiteSpace height={20} /> */}
            <Row style={{ height: "auto" }}>
              <div
                style={{ fontWeight: "bold", flex: 1, cursor: "pointer" }}
                onClick={onLogout}
              >
                로그아웃
              </div>
              <img
                src={Logout}
                style={{ width: 22, height: 22, cursor: "pointer" }}
                onClick={onLogout}
              />
            </Row>
            <WhiteSpace height={36} />
            <Col style={{ height: 110, position: "relative" }}>
              <Col
                style={{
                  // backgroundColor: "#7A769B",
                  borderRadius: 28,
                  overflow: "hidden",
                }}
              >
                <img
                style={{ height: user_info_reducer.company_usrnm==="crescendo"?44:user_info_reducer.company_usrnm==="dbinvestment"?51:user_info_reducer.company_usrnm==="deeptrade"?44:27, width: user_info_reducer.company_usrnm==="koreainvestment"?"100%":user_info_reducer.company_usrnm==="deeptrade"?60:80 }}
                src={
                  user_info_reducer.company_usrnm=="deeptrade"?"/assets/deeptrade_d_logo.png":user_info_reducer.company_usrnm==="koreainvestment"?'/assets/koreainvestment_logo_new.png':user_info_reducer.company_usrnm==="crescendo"?"/assets/crescendo_logo.png":user_info_reducer.company_usrnm==="dbinvestment"?"/assets/dte/db_investment_logo.png":"/assets/white_logo.png"
                }
                alt="기업로고"
              />

              </Col>
             
            </Col>
            <WhiteSpace height={30} />
            <div style={{ fontWeight: "bold", fontSize: 14 }}>
              {user_info_reducer.company_usrnm}
            </div>
            <WhiteSpace height={8} />
            <div
              style={{
                fontWeight: "bold",
                fontSize: 10,
                color: color.LightPurple,
              }}
            >
              {user_info_reducer.company_usrnm == "deeptrade"
                ? "딥트레이드테크놀로지스"
                : user_info_reducer.company_usrnm == "koreainvestment"
                  ? "한국투자 신탁운용"
                  : user_info_reducer.company_usrnm == "crescendo"
                    ? "크레센도"
                    : user_info_reducer.company_usrnm==="dbinvestment"?"DB 금융투자":''}
            </div>
            <WhiteSpace height={48} />
            {/* <Row style={{ height: "auto" }}>
            <div style={{ fontWeight: "bold", flex: 1, cursor: "pointer" }}>
              최근알림
            </div>
            <img
              src={Bell}
              style={{ width: 22, height: 22, cursor: "pointer" }}
            />
          </Row> */}
          </ShadowCol></>}
      </Row>
    </Col>
  );
};

const NewsBlock = ({ newInfo }) => {
  return (
    <ShadowCol
      width={240}
      height={250}
      style={{ padding: 24, justifyContent: "flex-start" }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: "bold",
          color: color.DarkBlue,
          width: "100%",
          textAlign: "left",
        }}
      >
        오늘의 추천뉴스
      </div>
      <WhiteSpace height={16} />
      {newInfo.map((v) => {
        return (
          <Row
            height={50}
            style={{
              backgroundColor: color.BackgroundPurple,
              borderRadius: 10,
              padding: 10,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                fontSize: 7,
                fontWeight: "bold",
                color: color.DarkBlue,
                width: "100%",
                textAlign: "left",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                "-webkit-line-clamp": 2,
              }}
            >
              {v.news}
            </div>
          </Row>
        );
      })}
      <WhiteSpace height={20} />
      <Row
        style={{
          height: 32,
          borderRadius: 16,
          backgroundColor: color.Purple,
          fontSize: 10,
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        전체 보기
      </Row>
      <ToastContainer />
    </ShadowCol>
  );
};

export default EnterprisesService;
