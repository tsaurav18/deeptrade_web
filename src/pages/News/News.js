import "./News.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import React, {useState} from "react";
function News(props) {
  const [toggleStatus, setToggleStatus] = useState(false)
  const [toggleFundStatus, setToggleFundStatus] = useState(false)
  
  return (
    <div className="news_container" ref={props.refProp}>
      <div className="news_title_container">
        <div className="news_title">News</div>
      </div>
      <div className="news_slide_container">
        <Swiper
          modules={[Navigation]}
          breakpoints={{
            600: {
              slidesPerView: 1,
              width: 480,
            },
            800: {
              slidesPerView: 2,
              width: 800,
            },
            1200: {
              slidesPerView: 2,
              width: 1200,
            },
            1600: {
              slidesPerView: 3,
              width: 1600,
            },
            2000: {
              slidesPerView: 3,
              width: 2000,
            },
          }}
          width="350"
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation={true}
        >
                          <SwiperSlide>
                  {!toggleFundStatus?   <div className="news_slide">
              <div className="news_image" style={{ paddingTop: 15 }}>
                <img src="assets/news/news22.png" alt="news22"/>
              </div>
              <div className="news_content">
                <h6>
                
                딥트레이드테크놀로지스, 펀드 추천 장치 및 펀드 추천 방법 특허 등록 완료
                </h6>
                <p>2024/01</p>
                <p>
         
                딥트레이드테크놀로지스가 '펀드 추천 장치 및 펀드 추천 방법' 기술에 대해 특허 등록을 완료하였습니다. 이 기술은 다양한 자산 유형 (주식형, 채권형, 혼합형)의 펀드에 대하여 인공지능이 글로벌 매크로 현황을 충분히 반영한 후 펀드 유형 및 해당 유형에 속하는 개별 펀드 중 가장 투자 수익률이 높게 예상되는 유형의 펀드에 투자하는 기술입니다. 딥트레이드는 현재까지 총 5건의 금융 AI관련 특허를 출원했으며 (등록 2건) AI 금융을 선도하고 있습니다.
              
                </p>
                <button
                    className="news_link_button"
                    onClick={() =>{
                      console.log("click")
                      setToggleFundStatus(!toggleFundStatus)
                    }
                  
                    }
                  >
                   딥트레이드 특허 목록 보기
                  </button>
              </div>
            </div>:
            <div className="news_slide" style={{  height:"610px"}}>
            
              <div className="news_content news_content_patent" style={{paddingTop:20}}>
                <div style={{border:"1px solid #990000", padding:5, marginBottom:10, borderRadius:4}}>
              <div className="headlines" style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between"}}> <span style={{fontWeight:700, fontSize:"13px"}}>
                
                 EMP 운용 장치 및 방법
                </span>
                <span>2023/12</span></div>
                <p style={{fontSize:"12px"}}>
       
                강화학습을 이용하여 ETF Managed Portfolio의 자산을 효과적으로 동적 배분하는 기술
              
                </p>
                </div>
                <div style={{border:"1px solid #990000", padding:5, marginBottom:10, borderRadius:4}}>
              <div className="headlines" style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between"}}> <span style={{fontWeight:700, fontSize:"13px"}}>
                
              가격 상관관계와 콘텐츠의 관련도를 동시에 반영한 주식 종목 관련 뉴스 추천 시스템
                </span>
                <span>2023/05</span></div>
                <p style={{fontSize:"12px"}}>
       
                특정 종목에 대하여 가격 움직임의 관련성이 높은 종목과 뉴스 콘텐츠의 관련성이 높은 종목의 뉴스를 요약하고 추천하는 특허 기술
              
                </p>
                </div>


                <div style={{border:"1px solid #990000", padding:5, marginBottom:10, borderRadius:4}}>
              <div className="headlines" style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between"}}> <span style={{fontWeight:700, fontSize:"13px"}}>
                
              펀드 추천 장치 및 펀드 추천 방법 (등록 완료)
                </span>
                <span>2023/01</span></div>
                <p style={{fontSize:"12px"}}>
       다양한 운용 스타일을 보유한 개별 펀드가 경제 상황에 따라 움직이는 패턴을 학습하여 펀드별 가격 방향성을 예측하는 기술
              
                </p>
                </div>

                <div style={{border:"1px solid #990000", padding:5, marginBottom:10, borderRadius:4}}>
              <div className="headlines" style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between"}}> <span style={{fontWeight:700, fontSize:"13px"}}>
                
              연금 투자를 위한 변동성 최소화 기반 포트폴리오 관리 방법 및 장치 (등록 완료)
                </span>
                <span>2023/01</span></div>
                <p style={{fontSize:"12px"}}>
       
             개별 종목의 상승폭 및 하락폭을 예측하여 변동성을 최소화하고, 이를 통해 안정적인 연금 투자를 하는 기술
              
                </p>
                </div>
                <div style={{border:"1px solid #990000", padding:5,borderRadius:4}}>
              <div className="headlines" style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between"}}> <span style={{fontWeight:700, fontSize:"13px"}}>
                
              로보어드바이저를 이용한 위험 관리 장치 및 방법
                </span>
                <span>2022/12</span></div>
                <p style={{fontSize:"12px"}}>
       
            시장의 방향성과 임의의 알고리즘의 성능을 기반으로 투자 비중을 조절하여 샤프 지수와 최대 하락폭을 개선하는 시스템
              
                </p>
                </div>
                <button
                //  style={{marginBottom:-15}}
                    className="news_link_button"
                    onClick={() =>{
                      console.log("click")
                      setToggleFundStatus(!toggleFundStatus)
                    }
                  
                    }
                  >
                    뉴스 보기
                  </button>
              </div>
        
            </div>
            
            }
                     
          </SwiperSlide>


            <SwiperSlide>
            <div className="news_slide">
              <div className="news_image" style={{ paddingTop: 15 }}>
                <img src="assets/news/news21.png" alt="news20" />
              </div>
              <div className="news_content">
                <h6>
                
                딥트레이드테크놀로지스, 삼성증권 신규 MP 3종 출시
                </h6>
                <p>2024/01</p>
                <p>
                딥트레이드테크놀지스가 삼성증권 mPOP 서비스에 신규 MP 3종을 출시하였습니다. 딥트레이드테크놀로지스가 보유한 고도의 인공지능 전체 종목 예측 기술을 기반으로, 고객이 성향에 맞게 적절한 상품을 선택할 수 있도록 3단계로 출시하였습니다. 이를 통해 고객은 딥트레이드테크놀로지스의 금융 인공지능 기술력을 삼성증권 mPOP 채널을 통해 경험할 수 있습니다.
<br />
              
                </p>
              </div>
            </div>
          </SwiperSlide>

                <SwiperSlide>
                  {!toggleStatus?   <div className="news_slide">
              <div className="news_image" style={{ paddingTop: 15 }}>
                <img src="assets/news/news20.png" alt="news20"/>
              </div>
              <div className="news_content">
                <h6>
                
                딥트레이드테크놀로지스, EMP 운용 장치 및 방법 특허 출원 완료 
                </h6>
                <p>2023/12</p>
                <p>
         
            딥트레이드테크놀로지스가 강화학습을 이용한 EMP 운용 시스템 특허를 출원 완료하였습니다. 해당 기술은 강화학습에 기반하여 수익률과 안정성을 동시에 추구하는 ETF 포트폴리오를 구성하며, 투자 유니버스와 비중을 사용자와 시장 상황에 맞게 제시합니다. 딥트레이드는 현재까지 총 4건의 금융 AI 관련 특허를 출원하며 AI 금융을 선도하고 있습니다.
              
                </p>
                <button
                    className="news_link_button"
                    onClick={() =>{
                      console.log("click")
                      setToggleStatus(!toggleStatus)
                    }
                  
                    }
                  >
                   딥트레이드 특허 목록 보기
                  </button>
              </div>
            </div>:
            <div className="news_slide" style={{  height:"610px"}}>
            
              <div className="news_content news_content_patent" style={{paddingTop:20}}>
                <div style={{border:"1px solid #990000", padding:5, marginBottom:10, borderRadius:4}}>
              <div className="headlines" style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between"}}> <span style={{fontWeight:700, fontSize:"13px"}}>
                
                 EMP 운용 장치 및 방법
                </span>
                <span>2023/12</span></div>
                <p style={{fontSize:"12px"}}>
       
                강화학습을 이용하여 ETF Managed Portfolio의 자산을 효과적으로 동적 배분하는 기술
              
                </p>
                </div>
                <div style={{border:"1px solid #990000", padding:5, marginBottom:10, borderRadius:4}}>
              <div className="headlines" style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between"}}> <span style={{fontWeight:700, fontSize:"13px"}}>
                
              가격 상관관계와 콘텐츠의 관련도를 동시에 반영한 주식 종목 관련 뉴스 추천 시스템
                </span>
                <span>2023/05</span></div>
                <p style={{fontSize:"12px"}}>
       
                특정 종목에 대하여 가격 움직임의 관련성이 높은 종목과 뉴스 콘텐츠의 관련성이 높은 종목의 뉴스를 요약하고 추천하는 특허 기술
              
                </p>
                </div>


                <div style={{border:"1px solid #990000", padding:5, marginBottom:10, borderRadius:4}}>
              <div className="headlines" style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between"}}> <span style={{fontWeight:700, fontSize:"13px"}}>
                
              펀드 추천 장치 및 펀드 추천 방법 (등록 완료)
                </span>
                <span>2023/01</span></div>
                <p style={{fontSize:"12px"}}>
       다양한 운용 스타일을 보유한 개별 펀드가 경제 상황에 따라 움직이는 패턴을 학습하여 펀드별 가격 방향성을 예측하는 기술
              
                </p>
                </div>

                <div style={{border:"1px solid #990000", padding:5, marginBottom:10, borderRadius:4}}>
              <div className="headlines" style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between"}}> <span style={{fontWeight:700, fontSize:"13px"}}>
                
              연금 투자를 위한 변동성 최소화 기반 포트폴리오 관리 방법 및 장치 (등록 완료)
                </span>
                <span>2023/01</span></div>
                <p style={{fontSize:"12px"}}>
       
             개별 종목의 상승폭 및 하락폭을 예측하여 변동성을 최소화하고, 이를 통해 안정적인 연금 투자를 하는 기술
              
                </p>
                </div>
                <div style={{border:"1px solid #990000", padding:5,borderRadius:4}}>
              <div className="headlines" style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between"}}> <span style={{fontWeight:700, fontSize:"13px"}}>
                
              로보어드바이저를 이용한 위험 관리 장치 및 방법
                </span>
                <span>2022/12</span></div>
                <p style={{fontSize:"12px"}}>
       
            시장의 방향성과 임의의 알고리즘의 성능을 기반으로 투자 비중을 조절하여 샤프 지수와 최대 하락폭을 개선하는 시스템
              
                </p>
                </div>
                <button
                //  style={{marginBottom:-15}}
                    className="news_link_button"
                    onClick={() =>{
                      console.log("click")
                      setToggleStatus(!toggleStatus)
                    }
                  
                    }
                  >
                    뉴스 보기
                  </button>
              </div>
        
            </div>
            
            }
                     
          </SwiperSlide>

        

           <SwiperSlide>
            <div className="news_slide">
              <div className="news_image" style={{ paddingTop: 15 }}>
                <img src="assets/news/news16.png" alt="news19" />
              </div>
              <div className="news_content">
                <h6>
                
딥트레이드테크놀로지스, DB금융투자 대상 국면 예측 솔루션 제공 계약 체결
                </h6>
                <p>2023/12</p>
                <p>
                딥트레이드테크놀로지스가 DB금융투자에 국면 예측 솔루션 제공 계약을 체결하였습니다.
딥트레이드테크놀로지스가 개발한 고도의 인공지능으로 거시 경제 국면에 대해 예측하고, 예측 결과를 토대로 투자 자산에 대한 배분 결과를 제공합니다. 이를 통해 고객은 안정성 높은 투자 포트폴리오를 구성할 수 있게 됩니다.

<br />
              
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image" style={{ paddingTop: 15 }}>
                <img src="assets/news/news18.png" alt="news18" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스, 한국투자신탁운용과 인공지능 자산 관리
                  기술 사업화를 위한 MOU 체결
                </h6>
                <p>2023/05</p>
                <p>
                  딥트레이드테크놀로지스가 국내 AUM 최대 규모 한국투자신탁운용과
                  인공지능 기술을 활용한 자산관리 기술 사업화를 위한 MOU를
                  체결하였습니다. 본 협업을 통해 딥트레이드테크놀로지스의 최신
                  인공지능 기술이 적용된 주가 예측 AI SHANNON의 성능을
                  한국투자신탁운용의 주식운용본부와 함께 객관적인 성능 검증을
                  수행하고 결과적으로 인공지능을 활용한 금융 상품 및 서비스
                  개발을 통한 사업화를 목표로 합니다. <br />
                  {/* <a
                    href="https://www.datanet.co.kr/news/articleView.html?idxno=183674"
                    target="_blank"
                  >
                    (데이터넷 신문 2023/05)
                  </a> */}
                  <button
                    className="news_link_button"
                    onClick={() =>
                      window.open(
                        "https://www.datanet.co.kr/news/articleView.html?idxno=183674",
                        "_blank"
                      )
                    }
                  >
                    기사 보기
                  </button>
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image" style={{ paddingTop: 15 }}>
                <img src="assets/news/news17.png" alt="news17" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스, DS 자산운용과 인공지능 펀드 개발 MOU
                  체결
                </h6>
                <p>2023/01</p>
                <p>
                  딥트레이드테크놀로지스가 DS 자산운용과 인공지능 펀드 개발을
                  위한 협업을 개시했습니다. 본 협업을 통해
                  딥트레이드테크놀로지스의 최신 인공지능 기술이 적용된 주가 예측
                  AI SHANNON의 성능을 DS 자산운용이 실제 투자를 통해 검증합니다.
                  딥트레이드테크놀로지스는 객관적인 성능 검증 이후 DS
                  자산운용과의 인공지능 공모 펀드 개발을 목표로 합니다. <br />
                  <button
                    className="news_link_button"
                    onClick={() =>
                      window.open(
                        "https://www.aitimes.kr/news/articleView.html?idxno=27312",
                        "_blank"
                      )
                    }
                  >
                    기사 보기
                  </button>
                  {/* <a
                    href="https://www.aitimes.kr/news/articleView.html?idxno=27312"
                    target="_blank"
                  >
                    (인공지능신문 2023/02/07)
                  </a> */}
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image" style={{ paddingTop: 15 }}>
                <img src="assets/news/news16.png" alt="news16" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스, DB금융투자 및 펀도라의 고객을 대상으로
                  자문 상품 제공 개시
                </h6>
                <p>2023/01</p>
                <p>
                  딥트레이드테크놀로지스가 코스콤의 자문 플랫폼인 펀도라에서
                  DB금융투자의 고객을 대상으로 자문 상품 판매를 개시했습니다.
                  딥트레이드테크놀로지스는 DB금융투자의 고객을 대상으로 자체
                  개발한 인공지능 기술을 활용하여 매시점 경제 상황을 고려하여
                  상승 확률이 가장 높은 펀드 및 ETF로 구성된 포트폴리오를 고객
                  유형 별로 제공합니다.{" "}
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image" style={{ paddingTop: 15 }}>
                <img src="assets/news/new15.png" alt="news15" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스, NH투자증권 및 펀도라의 고객을 대상으로
                  자문 상품 제공 개시
                </h6>
                <p>2022/12</p>
                <p>
                  딥트레이드테크놀로지스가 코스콤의 자문 플랫폼인 펀도라에서
                  NH투자증권의 고객을 대상으로 자문 상품 판매를 개시했습니다.
                  딥트레이드테크놀로지스는 NH투자증권의 고객을 대상으로 자체
                  개발한 인공지능 기술을 활용하여 위험자산과 안전자산의 비중을
                  조절하여 다양한 펀드 및 ETF로 구성된 포트폴리오를 고객
                  유형별로 제공합니다.{" "}
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image" style={{ paddingTop: 15 }}>
                <img src="assets/news/new14.png" alt="news14" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스, 데이터 마이닝 우수 학회에 텍스트 활용
                  주가 예측을 주제로 논문 게재
                </h6>
                <p>2022/10</p>
                <p>
                  딥트레이드테크놀로지스가 데이터 마이닝 우수 학회인 BigData
                  22에 텍스트와 가격 데이터를 결합하여 정확한 주가 예측을
                  수행하는 인공지능 기술을 주제로 논문을 게재했습니다.
                  딥트레이드테크놀로지스는 본 논문에서 경쟁 인공지능 기술 대비
                  가장 우수한 예측 정확도를 보였습니다.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image" style={{ paddingTop: 15 }}>
                <img src="assets/news/new13.png" alt="news13" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스, X KB증권 로보어드바이저 개발 MOU 체결
                </h6>
                <p>2022/09</p>
                <p>
                  딥트레이드테크놀로지스가 KB증권과 로보어드바이저 개발을 위한
                  API 사용에 대한 MOU를 체결하였습니다(2022.09).
                  딥트레이드테크놀로지스는 인공지능 로보어드바이저 XPercent의
                  사용자 편의성을 향상시키기 위한 고도화 협업을 KB 증권과
                  진행합니다. 본 협업을 통해 XPercent의 사용자는 계좌 개설 및
                  포트폴리오 자문 내역에 대한 매매를 KB증권을 통해 편리하게
                  편리하게 사용할 수 있을 것으로 기대됩니다. 그 외에도 KB
                  증권과의 협업을 통해 XPercent에 다양한 편의 기능을 추가할
                  예정이며 완성된 XPercent는 앱 버전으로 연내 출시 예정입니다.{" "}
                  <br />
                  <button
                    className="news_link_button"
                    onClick={() =>
                      window.open(
                        "https://news.mt.co.kr/mtview.php?no=2022100517433057424)%EA%B0%80",
                        "_blank"
                      )
                    }
                  >
                    기사 보기
                  </button>
                  {/* <a
                    href="https://news.mt.co.kr/mtview.php?no=2022100517433057424)%EA%B0%80"
                    target="_blank"
                  >
                    (머니투데이 2022/10/6)
                  </a> */}
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image" style={{ paddingTop: 15 }}>
                <img src="assets/news/new12.png" alt="news12" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스, X 퀀팃 로보어드바이저 공동 연구/사업화
                  MOU 체결
                </h6>
                <p>2022/08</p>
                <p>
                  딥트레이드테크놀로지스가 금융 투자 및 운용 솔루션 공급 핀테크
                  기업인 퀀팃과 AI 로보어드바이저 서비스 고도화를 위한 협업
                  MOU를 체결하였습니다 (2022.08.22). 본 협약은
                  딥트레이드테크놀로지스의 AI 로보 어드바이저와 퀀팃의
                  로보어드바이저 및 운영 플랫폼 기술을 접목하여 성능 향상 및
                  사업화를 목표로 합니다.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image" style={{ paddingTop: 15 }}>
                <img src="assets/news/new11.png" alt="news11" />
              </div>
              <div className="news_content">
                <h6>딥트레이드테크놀로지스, 삼성증권에서 자문사 서비스 제공</h6>
                <p>2022/06</p>
                <p>
                  딥트레이드테크놀로지스가 삼성증권 고객들에게 자문 서비스를
                  제공합니다. 해당 서비스는 일반형, 연금형, IRP 형 등 다양한
                  고객 자산 유형별로 고객에게 투자 포트폴리오를 제공하며 고객은
                  일괄매매형 및 자율형 거래를 통해 편하게 포트폴리오를 매매할 수
                  있습니다. 딥트레이드테크놀로지스는 더 많은 고객들의 자산을
                  안정적으로 증식시키기 위해 꾸준히 노력하고 있습니다.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image" style={{ paddingTop: 15 }}>
                <img src="assets/news/new10.png" alt="news10" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스, 2022 창업도약패키지 대기업협업형 최종
                  선정
                </h6>
                <p>2022/05</p>
                <p>
                  딥트레이드테크놀로지스가 한국기술벤처재단과 KB금융 그룹이
                  주관하는 창업도약패키지 대기업협업형 프로그램에 최종
                  선정되었습니다. 창업도약패키지 프로그램은 21년 기준 13.5:1의
                  매우 높은 경쟁률을 보인 프로그램으로, 딥트레이드테크놀로지스는
                  KB 금융 그룹과 AI 기반 로보어드바이저 관련 다양한 협력을
                  진행할 계획입니다.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image">
                <img src="assets/news/new7.png" alt="news7" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스 XPercent, 6개월만에 약 30%의 지수 대비
                  초과 수익 확보
                </h6>
                <p>2022/03</p>
                <p>
                  딥트레이드테크놀로지스의 유진투자증권내 XPercent 서비스가
                  서비스를 개시한 2021년 9월 이후 2022/2 까지 14.73%의 수익율을
                  기록했습니다 (1주 모델). 이는 동 기간 코스피 지수 대비 29.18%,
                  코스닥 지수 대비 29.7% 의 초과 수익을 올린 것입니다.
                  딥트레이드테크놀로지스 로보 어드바이저는 금융 서비스에 혁신을
                  가져오고 있습니다.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image">
                <img src="assets/news/new7.png" alt="news7" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스,유진투자증권 '종목쏙쏙' 내 XPercent
                  서비스 개시
                </h6>
                <p>2021/09</p>
                <p>
                  딥트레이드테크놀로지스의 인공지능 기술을 통해 주식 종목을
                  추천하는 XPercent 서비스를 유진투자증권의 '종목쏙쏙' MTS/HTS
                  서비스에서 제공을 시작하였습니다. 딥트레이드테크놀로지스의
                  추천 종목을 유진투자증권 계좌와 연결하여 바로 매매할 수
                  있습니다.
                  <br />
                  <button
                    className="news_link_button"
                    onClick={() =>
                      window.open(
                        "https://www.hankyung.com/finance/article/2021091314766",
                        "_blank"
                      )
                    }
                  >
                    기사 보기
                  </button>
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image">
                <img src="assets/news/news9.png" alt="news1" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스, 서울대학교-동서스타트업 프로듀스34
                  대회 수상
                </h6>
                <p>2021/09</p>
                <p>
                  딥트레이드테크놀로지스가 서울대학교와 동서 기업이 함께 주최한
                  프로듀스34 대회에서 IR부문 금상(1위) 및 특별상을
                  수상하였습니다.
                  <br />
                  <button
                    className="news_link_button"
                    onClick={() =>
                      window.open(
                        "http://www.aitimes.kr/news/articleView.html?idxno=22145",
                        "_blank"
                      )
                    }
                  >
                    기사 보기
                  </button>
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image">
                <img src="assets/news/news8.jpg" alt="news2" />
              </div>
              <div className="news_content">
                <h6>딥트레이드테크놀로지스, 투자자문업 등록 완료</h6>
                <p>2021/09</p>
                <p>
                  딥트레이드테크놀로지스가 금융감독원으로부터 투자자문업 운영
                  적격 판전을 받았으며, 엄격한 심사 끝에 투자자문업 자격을
                  취득하였고 등록 완료 하였습니다.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image">
                <img src="assets/news/news5.png" alt="news5" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스, 인공지능 분야 최우수 학회 KDD 2021에
                  논문 게재 승인
                </h6>
                <p>2021/05</p>
                <p>
                  인공지능 분야 최고 학회 중 하나인 SIGKDD 2021에 주가 예측을
                  주제로 한 딥트레이드테크놀로지스의 “Accurate Multivariate
                  Stock Movement Prediction via Data-Axis Transformer with
                  Multi-Level Contexts” 논문 게재가 승인되었습니다. 해당 논문은
                  미국, 중국, 영국, 일본 시장에서 기존 State Of The
                  Art(SOTA)보다 우수한 성능을 낸 주가 예측 방법을 제시합니다.
                  <br />
                  <button
                    className="news_link_button"
                    onClick={() =>
                      window.open(
                        "http://www.startupn.kr/news/articleView.html?idxno=12746",
                        "_blank"
                      )
                    }
                  >
                    기사 보기
                  </button>
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image">
                <img src="assets/news/news1.png" alt="news4" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스, 2021 해동 주니어 지원 프로그램 수상
                </h6>
                <p>2021/03</p>
                <p>
                  해동 과학 문화 재단이 주관하는 서울대학교 내 스타트업 경진
                  대회에서 딥트레이드테크놀로지스는 우수 스타트업으로 선정되어
                  창업 지원금 1천만원을 수상하였습니다.
                  <br />
                  <button
                    className="news_link_button"
                    onClick={() =>
                      window.open(
                        "http://press.newslook.co.kr/newsRead.php?no=919731",
                        "_blank"
                      )
                    }
                  >
                    기사 보기
                  </button>
                </p>
              </div>
            </div>
          </SwiperSlide>
          {/* <SwiperSlide>
            <div className="news_slide">
              <div className="news_image">
                <img src="assets/news/news4.png" alt="news5" />
              </div>
              <div className="news_content">
                <h6>딥트레이드테크놀로지스, 강화학습 포트폴리오 관리 특허 출원</h6>
                <p>2021/03</p>
                <p>
                  딥트레이드테크놀로지스가 포트폴리오 관리에 사용하는 개선된 강화학습
                  방법론에 대해 특허를 출원하였습니다.
                </p>
              </div>
            </div>
          </SwiperSlide> */}
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image">
                <img src="assets/news/news2.png" alt="news5" />
              </div>
              <div className="news_content">
                <h6>VC 투자회사 스프링캠프로부터 시드투자 유치</h6>
                <p>2020/12</p>
                <p>
                  딥트레이드테크놀로지스가 '오늘의 집', '클래스 101' 등의 검증된
                  서비스에 투자한 투자 전문 VC 회사인 스프링캠프로부터 시드투자
                  유치를 하였습니다.
                </p>
                <button
                  className="news_link_button"
                  onClick={() =>
                    window.open(
                      "https://www.venturesquare.net/822952",
                      "_blank"
                    )
                  }
                >
                  기사 보기
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="news_slide">
              <div className="news_image">
                <img src="assets/news/news3.png" alt="news5" />
              </div>
              <div className="news_content">
                <h6>
                  딥트레이드테크놀로지스, 데이터 마이닝 분야 최우수 학회 SDM
                  2021에 논문 게재 승인
                </h6>
                <p>2020/12</p>
                <p>
                  데이터 마이닝 분야 최고 학회 중 하나인 SDM 2021에
                  'Attention-Based Autoregression for Accurate and Efficient
                  Multivariate Time Series Forecasting' 논문 게재가
                  승인되었습니다. 해당 논문은 주식 가격, 교통량, 실내 온도 등
                  여러 변수로 이루어진 시계열 데이터(time series)를 예측할 때
                  변수간 관계를 자동으로 학습하는 새로운 예측 모델을 제안합니다.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default News;
