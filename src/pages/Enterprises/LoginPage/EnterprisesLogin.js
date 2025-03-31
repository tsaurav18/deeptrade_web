import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EnterprisesLogin.css";
import { loginAPI } from "../../../api";
import { loginInfo, resetState } from "../../../redux/slices/loginSlice";
import { useTitle } from "../../../routing/DocumentNameChanger";
import { Oval } from "react-loader-spinner";
import { useResponsive } from "../../../hooks/useResponsive";
import { WhiteSpace } from "../../../style/globalStyled";
import { saveDataState } from "../../../redux/slices/dataSlice";
import { PhoneFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { saveSimulationDataState } from "../../../redux/slices/simulationSlice";
function EnterprisesLogin() {
  const { responsiveValue } = useResponsive()
  useTitle("딥트레이드 엔터프라이즈");
  const [loader, setLoader] = useState(false);
  const [formInput, setFormInput] = useState({
    company_usrnm: "",
    company_pass: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitLogin = async (event) => {
    event.preventDefault();

    if (formInput.company_usrnm === "") {
      toast("아이디를 입력해주세요.");
      return;
    } else if (formInput.company_pass === "") {
      toast("비밀번호를 입력해주세요.");
      return;
    }
    setLoader(true);
    const res = await loginAPI.dtLogin(formInput);
    if (res.status === 200) {
      if (res.data) {
        if(res.data.username ==="test"){
          dispatch(loginInfo(res.data));
          navigate("/enterprise/simulation")
          // dispatch(saveSimulationDataState(res.data));
        }
        // console.log("res.data in login", res.data)
        dispatch(loginInfo(res.data));
        dispatch(saveDataState(res.data.result));
        // toast("로그인 되었습니다.");
        setFormInput({ company_usrnm: "", company_pass: "" });
        navigate("/enterprise/service");
      }
    } else if (res.status == 400) {
      // toast("인터넷 장애로 인하여 정보를 못 가져왔습니다. 다시 로그인하세요.");
      const res = await loginAPI.dtLogin(formInput);
      if (res.status === 200) {
        if (res.data) {
     
          dispatch(resetState())
          dispatch(loginInfo(res.data));
          dispatch(saveDataState(res.data.result));
          // toast("로그인 되었습니다.");
          setFormInput({ company_usrnm: "", company_pass: "" });
  
          navigate("/enterprise/service");
        }
      }
      setLoader(false);
    } else {
      if (res.data.msg) {
        toast(res.data.msg);

        setLoader(false);
      }
    }
    setLoader(false);
  };

  return (
    <div className="loginContainer">
      <div style={{ width: responsiveValue(600, 500, 327), marginBottom:20 }}>
        {/* Your logo */}
        <div style={{ width: responsiveValue(600, 500, 327) }}>
          <img src={"/assets/enterprise_logo.png"} alt="logo" style={{ width: responsiveValue(600, 500, 327) }} />
        </div>
        {/* <img src="logo.png" alt="Logo" /> */}
      </div>
      <div className="formSection" style={{ width: responsiveValue(600, 500, 327) }}>
        <form onSubmit={submitLogin} className="enterprise_form_wrapper" style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <div className="enterprise_form_input_group" style={{ flex: 1 }}>
            <div className="inputGroup" style={{ width: "100%" }}>
              {/* <label htmlFor="id">ID:</label> */}

              <input
                type="text"
                placeholder="아이디 입력해주세요"
                onChange={(e) => {
                  setFormInput((prevFormInput) => ({
                    ...prevFormInput,
                    company_usrnm: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="inputGroup" style={{ width: "100%" }}>
              {/* <label htmlFor="pass">Pass:</label> */}
              <input
                type="password"
                id="pass"
                placeholder="비밀번호 입력해주세요"
                onChange={(e) => {
                  setFormInput((prevFormInput) => ({
                    ...prevFormInput,
                    company_pass: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <WhiteSpace width={10} />
          <button
            className="enterprise_login_btn"
            type="submit"
            onClick={(e) => submitLogin(e)}
            style={{ width: responsiveValue(150, 95, 85) }}
          >
            {loader == true ? (
              <Oval
                height={50}
                width={50}
                color="#fff"
                wrapperStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#fff"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            ) : (
              "로그인"
            )}
          </button>
        </form>
      </div>
      {/* <div
        style={{
          display: 'flex',
          gap: 10
        }}
      >
        <div className="service_button" style={{paddingLeft: 10, paddingRight: 10, width: 150, backgroundColor: 'rgb(22, 51, 79)'}}>
          서비스 안내 가이드
        </div>
        <div className="service_button" style={{paddingLeft: 10, paddingRight: 10, width: 150, display: 'flex', 'alignItems': 'center', justifyContent: 'center', gap: 5}}>
          <ExclamationCircleFilled /> 서비스 오류 신고
        </div>
        <div className="service_button" style={{paddingLeft: 10, paddingRight: 10, width: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5}}>
          <PhoneFilled /> 문의하기
        </div>
      </div> */}
      <ToastContainer />
    </div>
  );
}

export default EnterprisesLogin;
