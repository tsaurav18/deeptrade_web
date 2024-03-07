import React, { useRef, useState, useEffect } from 'react';
import "./StockPortfolio.css"
import useIntersection from '../../useIntersection';
function RiskManagement() {
    const contentOneRef = useRef(null);
    const contentTwoRef = useRef(null);
    const contentThreeRef = useRef(null);
    const contentOneInViewport = useIntersection(contentOneRef, '0px');
    const contentTwoInViewport = useIntersection(contentTwoRef, '0px');
    const contentThreeInViewport = useIntersection(contentThreeRef, '0px');
    const [showContentOne, setShowContentOne] = useState(false);
    const [showContentTwo, setShowContentTwo] = useState(false);
    const [showContentThree, setShowContentThree] = useState(false);
  
    useEffect(() => {
      if(contentOneInViewport) {
        setShowContentOne(true);
      }
      if(contentTwoInViewport) {
          setShowContentTwo(true);
      }
      if(contentThreeInViewport) {
        setShowContentThree(true);
    }
  
    }, [contentOneInViewport, contentTwoInViewport, contentThreeInViewport])
  return (
    <div><div style={{ display: "flex", alignItems: "center" }}>
    <div className="col-2 logo">
      <img
        src="assets/deeptrade_logo.png"
        alt="logo"
        style={{ margin: "0px 20px 0 20px" }}
        onClick={() => {
          window.open("https://deeptrade.co/", "_self");
        }}
      />
    </div>
    <div className="col-10">
      <div
        className="menu"
        style={{ justifyContent: "right", display: "flex" }}
      >
        <div
          className="menu_item"
          style={{ color: "black" }}
          onClick={() => {
            window.open("https://deeptrade.co/", "_self");
          }}
        >
          Home
        </div>
      </div>
    </div>
  </div>
 
  <div
    className={"spop_container"}
    style={{ flexDirection: "column", backgroundColor: "#394350" }}
  >
    <div className="service_intro">Index Shannon</div>
    {/* <div className="text_title" style={{ color: "white" }}>
    개별 종목 기반 포트폴리오
    </div> */}
    <div
      className="spop_center_text spop_service_body"
      style={{ color: "white", }}
    >
 딥트레이드테크놀로지스 연구진은 딥러닝 등의 최신 인공지능 기술을 사용하여 한국 및 미국의 지수 방향성 예측 기술을 개발하였습니다.

<br/>
시장 상황 예측을 통해 매크로 선제적 대응을 할 수 있으며 인버스를 함께 활용하여 절대 수익을 추구할 수 있습니다.
    </div>
  </div>
  <div
    className={"spop_container portfolio_outer_container"}
    style={{ flexDirection: "column", backgroundColor: "white" }}
  >
    <div className={"portfolio_container"} style={{paddingBottom:"3vw"}}>
      <div className="text_title" style={{ color: "#394350" }}>
      딥트레이드 Index Shannon 기술의 특징
      </div>
    
      <div className="spop_portfolio_inner_container">
       
        <div className="spop_portfolio_right_container"  >
          <div className="port_top">
            <div className="port_top_title">예측 프로세스
</div>
            <div className="port_top_body">
              <ul><li>거시 데이터와 금리 등의 매크로 데이터를 활용하여 향후 시장의 방향성을 예측합니다.</li>
              <li>자체 수수료 절감 모듈을 활용하여 리밸런싱 주기에 맞는 가장 적합한 시장 방향 비중을 결정합니다.</li>
              </ul>
          

            </div>
          </div>
        
        </div>
      </div>
      <div className="spop_portfolio_inner_container">
      
        <div className="spop_portfolio_right_container" >
          <div className="port_top">
            <div className="port_top_title">장점</div>
            <div className="port_top_body">
              <ul>
     <li> 패시브보다는 우월한 수익률이지만, 안정성은 상대적으로 높은 준액티브 포트폴리오를 설계할 수 있습니다.</li>
      <li>
       국내 주식 시장뿐만 아니라 다양한 해외 주식 시장에도 적용이 가능합니다.</li>

</ul>

            </div>
          </div>
        </div>
      </div>
    
      <div className="spop_portfolio_inner_container">
      
      <div className="spop_portfolio_right_container" >
        <div className="port_top">
          <div className="port_top_title">왜 Index Shannon일까요?</div>
          <div className="port_top_body">
            <ul>
   <li> 서울대학교 출신 연구진이 개발한 고도의 인공지능으로 예측한 시장 Index</li>
    <li>
    거시 경제에 대한 고도의 예측으로 시장 상황에 상관없는 꾸준한 수익 가능</li>
<li>개별 종목에 대한 리스크 경감</li>
<li>Index Shannon을 활용하여 시장 수익률 대비 초과 수익률 가능</li>
<li>패시브 성격이 가능한 펀드 운용과 안정적인 운용에 매우 적합</li>

</ul>

          </div>
        </div>
      </div>
    </div>
  
   
    </div>
  </div>
  <div
    className={"spop_container"}
    style={{ flexDirection: "column", backgroundColor: "rgb(240 240 240)" }}
  >

            {/* <div className={showContentOne ? "col-4 tech_icon_ tech_show1" : "col-6 tech_icon_"} ref={contentOneRef}>
                <img src="assets/solution/marketdir_img.svg"  alt="img1" />
                <div className="icon_title_">
                 시장 방향성 예측
                </div>
               
            </div>
            <div className={showContentTwo ? "col-4  tech_show2" : "col-6 "} ref={contentTwoRef} style={{    
    alignItems: "center",
    display: "flex",
    justifyContent: "center"}}>
            <img style={{height:"20!important"}}height={"20px"} src='assets/solution/rightArrow.png' alt='arrow'></img>
               
            </div>
           
            <div className={showContentTwo ? "col-4 tech_icon_ tech_show2" : "col-6 tech_icon_"} ref={contentTwoRef}>
                <img src="assets/solution/riskassets.svg" alt="img1" />
                <div className="icon_title_">
                  위험 자산 비중 조절
                </div>
               
            </div>
   */}

<img src='assets/solution/risk_pic.png' className='sol_img' alt='arrow'></img>

      
        </div>
        <div
    className={"spop_container"}
    style={{ flexDirection: "column", backgroundColor: "#394350" }}
  >
        <div className="service_intro">테스트 성과</div>
        <div className="row gx-0 tech_icon_container">
          
        <div className="register_normal_text" style={{marginBottom:"20px", marginTop:"20px"}}>
     <div style={{color:"#FFF",fontSize: "1.2vw"}}> <ul><li> 코스피 대비 111.5% 수익 달성 (지난 10년 기준)</li><li>25.57% MDD 달성 (지난 10년 기준)</li></ul></div>
<br/>
{/* <div style={{color:"#FFF", fontSize: "1.2vw"}}>* Y% MDD 달성 (지난 10년 기준)</div> */}

            </div>
       <img src='../../../assets/solution/riskchart_new2.png'/>

            </div>
      
        </div>
  </div>
  )
}

export default RiskManagement