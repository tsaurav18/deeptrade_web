import React, { useRef, useState, useEffect } from 'react';
import "./StockPortfolio.css"
import useIntersection from '../../useIntersection';
function EMP() {
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
    <div className="service_intro">EMP Shannon</div>
    {/* <div className="text_title" style={{ color: "white" }}>
    개별 종목 기반 포트폴리오
    </div> */}
    <div
      className="spop_center_text spop_service_body"
      style={{ color: "white", }}
    >
      딥트레이드테크놀로지스 연구진은 딥러닝 및 강화학습 등의 최신 인공지능 기술을 결합하여 ETF 활용 포트폴리오 구성 기술을 개발하였습니다.
<br/>
ETF 종목에 구애 받지 않고 사용자 요구에 따라 구성이 가능하며, 구성된 종목들 간의 현 시장 상황에 맞는 적절한 비중을 추천합니다.
    </div>
  </div>
  <div
    className={"spop_container portfolio_outer_container"}
    style={{ flexDirection: "column", backgroundColor: "white" }}
  >
    <div className={"portfolio_container"} style={{paddingBottom:"3vw"}}>
      <div className="text_title" style={{ color: "#394350" }}>
      딥트레이드 EMP Shannon 기술의 특징
      </div>
      {/* <div className="spop_portfolio_center_text">
        서울대학교 주가 예측 스타트업 DeepTrade Technologies가 최신 개발한
        주가 예측 모델입니다.
      </div> */}
      <div className="spop_portfolio_inner_container">
       
        <div className="spop_portfolio_right_container"  >
          <div className="port_top">
            <div className="port_top_title">예측 프로세스
</div>
            <div className="port_top_body">
              <ul>
           <li> ETF 투자 유니버스를 자유롭게 설정할 수 있습니다.</li>

           <li>최신 인공지능 기술이 유니버스 종목 간의 관계를 분석하여 현 주식 상황에 맞게 각 비중을 조절합니다.</li>
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
      <li>국내/해외 및 주식형/채권형/혼합/대체투자 등 다양한 ETF에 대해 적용 가능 합니다.</li>

  <li>수익률 추구 뿐만 아니라 MDD도 모델이 고려하여 안정성과 수익성 둘 다 추구하는 입체적인 모델입니다.</li>

</ul>
            </div>
          </div>
      
        </div>
      </div>
      <div className="spop_portfolio_inner_container">
      
      <div className="spop_portfolio_right_container" >
        <div className="port_top">
          <div className="port_top_title">왜 EMP Shannon일까요?</div>
          <div className="port_top_body">
            <ul>
    <li>서울대학교 출신 연구진이 개발한 고도의 인공지능으로 예측한 ETF 관리 포트폴리오
</li>

<li>고객 투자 유니버스, 리스크 컴플라이언스에 맞춘 맞춤형 포트폴리오 제공 가능</li>
<li>현재 각광받고 있는 연금 운용 등 ETF를 활용하는 다양한 분야에 적용 가능</li>
<li>대고객 투자 컨센서스로 활용 가능</li>
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

        <img src='assets/solution/etf_pic1.png' className='sol_img' alt='arrow'></img>

        </div>
        <div
    className={"spop_container"}
    style={{ flexDirection: "column", backgroundColor: "#394350" }}
  >
        <div className="service_intro">테스트 성과</div>
        <div className="row gx-0 tech_icon_container">
          
        <div className="register_normal_text" style={{marginBottom:"20px", marginTop:"20px"}}>
      <div style={{color:"#FFF",fontSize: "1.2vw"}}> <ul><li> 코스피 대비 144% 수익 달성 (지난 3년 기준)</li><li> 25% MDD 달성 (지난 3년 기준)</li><li>상기 성과는 EMP 섀넌의 판단에 따라 계산한 테스트 결과이고 실제 수익률과 다를 수 있습니다.</li></ul></div>
<br/>
{/* <div style={{color:"#FFF",fontSize: "1.2vw"}}>* Y% MDD 달성 (지난 3년 기준)</div> */}

            </div>
       <img src='../../../assets/solution/etf_pic_new2.png'/>

            </div>
      
        </div>
  
  
  </div>
  )
}

export default EMP