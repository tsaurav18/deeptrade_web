import "./Footer.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FaInstagram, FaFacebook } from "react-icons/fa";
function Footer() {
  return (
    <div className="footer_container">
      <div className="row gx-0" style={{ justifyContent: "center" }}>
        <div className="footer_title">
          <div>제휴문의</div>
        </div>
      </div>
      <div className="row gx-0">
        <div className="col-10 col-xl-8 col-lg-10 col-md-10">
          <div className="footer_body_title" >딥트레이드테크놀로지스의 AI 로보 어드바이저를 활용하는 비즈니스</div>
        </div>
      </div>
      {/* <div className="row gx-0">
        <div className="col-10 col-xl-8 col-lg-10 col-md-10">
          <div className="footer_body_content">
            딥트레이드테크놀로지스 AI 로보 어드바이저를 활용하는 비즈니스
          </div>
        </div>  
      </div> */}
      <div className="row gx-0">
        <div className="col-10 col-xl-8 col-lg-10 col-md-10">
          <div className="footer_body_title">안정적인 지수 초과 수익을 제공하는 딥트레이드테크놀로지스의 SHANNON 엔진을 활용한 AI 펀드 개설 및 자문</div>
        </div>
      </div>
      {/* <div className="row gx-0">
        <div className="col-10 col-xl-8 col-lg-10 col-md-10">
          <div className="footer_body_content">
            안정적인 지수 초과 수익을 제공하는 딥트레이드테크놀로지스의 SHANNON
            엔진을 활용한 AI 펀드 개설 및 자문
          </div>
        </div>
      </div> */}
      <div className="row gx-0">
        <div className="col-10 col-xl-8 col-lg-10 col-md-10">
          <div className="footer_grid_button">
            <div
              className="footer_button"
              onClick={() => {
                window.location.href = "mailto:contact@deeptrade.co";
              }}
            >
              제휴 문의 바로가기
              <ArrowRightOutlined style={{ marginLeft: 10 }} />
            </div>
          </div>
        </div>
      </div>
      <div className="row gx-0">
        <div className="col-10">
          <div className="divider_2"></div>
        </div>
      </div>
      <div className="row gx-0" style={{ justifyContent: "center" }}>
        <div className="footer_title">
          <div>Service Contact</div>
        </div>
      </div>
      <div className="row gx-0">
        <div className="col-9 col-xl-8 col-lg-10 col-md-10">
          <div className="row gx-0 service_contact">
            <div className="col-4">
              <div className="footer_body_content">
                DeepTrade Technologies 블로그
              </div>
              <div
                className="footer_body_content_und block_1"
                onClick={() => {
                  window.open("https://blog.naver.com/deeptrade", "_blank");
                }}
              >
                <div>
                  <div> 네이버 블로그</div>
                  <div>
                    바로가기 <FontAwesomeIcon icon={faArrowRight} />
                    {/* <FontAwesomeIcon icon="fa-sharp fa-light fa-arrow-right" /> */}
                  </div>
                  {/* <ArrowRightOutlined style={{ marginLeft: 10 }} /> */}
                </div>
              </div>
              <div className="social-icons">
                <div className="footer_body_content_sns">
                  <a
                    href="https://www.facebook.com/deeptrade.co"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook className="icon" color="#fff" />
                  </a>
                </div>
                <div className="footer_body_content_sns">
                  <a
                    href="https://www.instagram.com/deeptradetechnologies/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="icon" color="#fff" />
                  </a>
                </div>
              </div>
              <div></div>
            </div>
            <div className="col-4">
              <div className="footer_body_content">담당자 이메일</div>
              <div className="footer_body_content_und block_2">
                contact@deeptrade.co
              </div>
            </div>
            <div className="col-4">
              <div className="footer_body_content">오시는 길</div>
              <div className="footer_body_content_und block_3">
                <div>
                  <div> 서울시 관악구 관악로1</div>
                  <div> 서울대학교 컴퓨터연구소</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
