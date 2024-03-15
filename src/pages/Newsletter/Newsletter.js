import React, { useRef, useState } from "react";
import "./Newsletter.css";

import { ArrowUpOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Newsletter(props) {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const notify = (msg) => toast(msg, { style: { fontSize: 15 } });
  const unsubscribe = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    };
    fetch("https://xpercent.io/api/unsubscribe_email", requestOptions)
      .then((response) => response.json())
      .then((data) => setSuccess(true));
  };
  const subscribeNewsletter = (event) => {
    //  prevent page refresh
    event.preventDefault();
    if (email != "") {
      console.log("form submitted ✅");
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      };
      fetch("https://xpercent.io/api/auth/register_newsletter/", requestOptions)
        .then((response) => response.json())
        .then((response) => {
          console.log(">>>", response.code, response.msg);
          if (response.code === 201) {
            console.log("into success>>>", response.code, response.msg);
            notify(response.msg);
          } else if (response.code === 401) {
            console.log("into else>>>", response.code, response.msg);
            notify(response.msg);
          } else {
            notify(response.msg);
          }
          setSuccess(true);
          setEmail("");
        });
    } else {
      alert("이메일을 입력해주세요");
    }
  };

  return (
    <div className="newsletter_container" ref={props.refProp}>
      <div className="row justify-content-md-center justify-content-sm-center gy-0 gx-0 py-4 newsletter_inner">
        <div className="newsletter_title">
          <div>위험관리 AI 뉴스레터 </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-md-center gx-0 newsletter_content_container">
          <div class="col-md-9 gx-5 left_newletter_container">
            <div className="left_newsletterContainer_title">
              딥트레이드테크놀로지스의 AI 위험관리 뉴스레터는
              딥트레이드테크놀로지스의 AI 섀넌이 국내외 데이터를 통해 분석한
              증시 전망을 제공합니다. AI 섀넌은 한달 후 증시 움직임을 예측하며,
              이를 통해 투자자는 국내외 시장의 움직임에 대하여 다른 투자자보다
              1개월 먼저 대응할 수 있습니다.
            </div>
          </div>
          <div className="col-md-3 gx-5 newsletter_form">
            <form onSubmit={subscribeNewsletter}>
              <div class="mb-3">
                <input
                  placeholder="이메일 주소를 입력해주세요"
                  value={email}
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  style={{ width: 250 }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <button
                type="submit"
                class="btn"
                style={{
                  backgroundColor: "#990000",
                  color: "#fff",
                  width: "100px",
                }}
              >
                구독하기
              </button>
            </form>
          </div>
        </div>
        {/* {!success ? (
          <div
            style={{
              backgroundColor: "#900",
              borderRadius: 5,
              color: "#fff",
              cursor: "pointer",
              fontSize: 15,
              fontWeight: "700",
              marginTop: 10,
              padding: "10px 0",
              textAlign: "center",
              width: 200,
              marginLeft: "auto",
              marginRight: "auto",
            }}
            onClick={() => {
              unsubscribe();
            }}
          >
            Unsubscribe
          </div>
        ) : (
          <div
            style={{
              fontSize: 20,
              textAlign: "center",
              marginTop: 50,
            }}
          >
            You have been unsubscribed from our newsletter service!
          </div>
        )} */}
      </div>
      <div
        className="up_arrow"
        onClick={() => {
          console.log("clicked");
          props.mainRef.current.scrollIntoView();
        }}
      >
        <ArrowUpOutlined
          style={{ color: "white", fontSize: 20, cursor: "pointer" }}
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Newsletter;
