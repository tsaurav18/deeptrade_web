import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./NoticeBoardDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  noticeDetailData,
  resetNoticeState,
} from "../../redux/slices/noticeSlice";
function NoticeBoardDetails(props) {
  const dispatch = useDispatch();

  const location = useLocation();
  const { data } = location.state;

  const notice_reducer = useSelector((state) => state.noticeReducer);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="col-2 logo">
          <img
            src="/assets/deeptrade_logo.png"
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
      <div className="container notice_detail_container">
        {notice_reducer && notice_reducer.data != "" ? (
          <div className="notice_detail_container_wrapper">
            {" "}
            <div className="notice_details_wrapper">
              <div className="notice_details_wrapper_title">
                {notice_reducer.data.title}
              </div>
              <div className="notice_details_wrapper_date">
                {notice_reducer.data.created_at}
              </div>
            </div>
            <div className="notice_details_body">
              <div className="notice_details_subtitle">
                {notice_reducer.data.sub_text.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div>
              <div className="notice_details_file_box">
                <div className="notice_details_file_btn_txt">첨부파일</div>
                <div className="notice_details_file">
                  {notice_reducer.data.data_file}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>공지 정보를 가져오지 못했습니다.</div>
        )}
      </div>
    </div>
  );
}

export default NoticeBoardDetails;
