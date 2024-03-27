import "./Partnership.css";
import { ArrowUpOutlined } from "@ant-design/icons";

function Partnership(props) {
  return (
    <div className="partnership_container">
      <div className="row">
        <div className="partnership_title">
          <div>Partnership</div>
        </div>
      </div>
      <div className="row gx-0 gy-2 partnership_content_container">
      <div className="col-4 partnership_icon bottom_row">
          <img src="assets/partnership/DB_investment.png" alt="DB_investment" />
        </div>
        <div className="col-4 partnership_icon bottom_row">
          <img src="assets/samsung_investment.png" alt="img1" />
        </div>
        <div className="col-4 partnership_icon bottom_row">
          <img src="assets/quantit_logo.png" alt="img1" />
        </div>
        <div className="col-4 partnership_icon bottom_row">
          <img src="assets/partnership/korea_investment.png" alt="korea_investment" />
        </div>
        <div className="col-4 partnership_icon bottom_row">
          <img src="assets/kb_investment.png" alt="img1" />
        </div>
        <div className="col-4 partnership_icon bottom_row">
          <img src="assets/partnership/nh_investment.png" alt="nh_investment" />
        </div>

        <div className="col-4 partnership_icon bottom_row">
          <img src="assets/spring_camp.png" alt="img1" />
        </div>
      </div>
      {/* <div
        className="up_arrow"
        onClick={() => props.mainRef.current.scrollIntoView()}
      >
        <ArrowUpOutlined
          style={{ color: "white", fontSize: 20, cursor: "pointer" }}
        />
      </div> */}
    </div>
  );
}

export default Partnership;
