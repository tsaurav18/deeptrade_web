import "./Header.css";
import React from "react";

function Header(props) {
  return (
    <div className="header">
      <div className="col-2 logo">
        <img src="assets/deeptrade_logo.png" alt="logo" />
      </div>
      <div className="col-10">
        <div className="menu">
          <div
            className="menu_item"
            onClick={() => props.missionRef.current.scrollIntoView()}
          >
            Mission
          </div>
          <div
            className="menu_item"
            onClick={() => props.whatRef.current.scrollIntoView()}
          >
            What We Do
          </div>
          <div
            className="menu_item"
            onClick={() => props.technologyRef.current.scrollIntoView()}
          >
            Technology
          </div>
          <div
            className="menu_item"
            onClick={() => props.solutionRef.current.scrollIntoView()}
          >
            Solution
          </div>
          <div
            className="menu_item"
            onClick={() => props.xpercentRef.current.scrollIntoView()}
          >
            Service
          </div>
         
          <div
            className="menu_item"
            onClick={() => props.noticeRef.current.scrollIntoView()}
          >
            Notice
          </div>

          <div
            className="menu_item"
            onClick={() => props.newsRef.current.scrollIntoView()}
          >
            News
          </div>


          <div
            className="menu_item"
            onClick={() => props.newsletterRef.current.scrollIntoView()}
          >
            Newsletter
          </div>
        </div>
      </div>
      <div>
        <input id="toggle" type="checkbox" />
        <label className="toggle-container" htmlFor="toggle">
          <span className="button button-toggle"></span>
        </label>
        <nav className="nav">
          <div
            className="nav-item"
            onClick={() => props.whatRef.current.scrollIntoView()}
          >
            What We Do
          </div>
          <div
            className="nav-item"
            onClick={() => props.missionRef.current.scrollIntoView()}
          >
            Mission
          </div>
          <div
            className="nav-item"
            onClick={() => props.xpercentRef.current.scrollIntoView()}
          >
            XPercent
          </div>
          <div
            className="nav-item"
            onClick={() => props.technologyRef.current.scrollIntoView()}
          >
            Technology
          </div>
          <div
            className="nav-item"
            onClick={() => props.solutionRef.current.scrollIntoView()}
          >
            Solution
          </div>
          <div
            className="nav-item"
            onClick={() => props.xpercentRef.current.scrollIntoView()}
          >
            Service
          </div>
          
          <div
            className="nav-item"
            onClick={() => props.noticeRef.current.scrollIntoView()}
          >
            Notice
          </div>

          <div
            className="nav-item"
            onClick={() => props.newsRef.current.scrollIntoView()}
          >
            News
          </div>
          <div
            className="nav-item"
            onClick={() => props.newsletterRef.current.scrollIntoView()}
          >
            Newsletter
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
