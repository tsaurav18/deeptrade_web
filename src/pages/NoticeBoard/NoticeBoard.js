import React, { useState } from "react";
import "./NoticeBoard.css";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { noticeDetailData } from "../../redux/slices/noticeSlice";
import file_230327_2 from "./files/file_230327_2.hwp";
import file_230517 from "./files/file_230517.hwp";
import file_230825 from "./files/file_230825.hwp";
import file_230901 from "./files/file_230901.hwp";
import file_231115 from "./files/file_231115.hwp";
import file_240111 from "./files/file_240111.hwp";
import file_250630 from "./files/250630_정기주주총회 결과 공시.pdf";
import file_250228 from "./files/250228_임원사임보고_v2.pdf";
import file_241231 from "./files/241231_임원사임보고.pdf";
import file_240627 from "./files/240627_임원사임선임보고.pdf";
import file_240626 from "./files/240626_정기주주총회 결과 공시.pdf";


const TableData = [
  {
    id: 12,
    title: "정기주주총회 결과 공시",
    created_at: "2025년 06월 30일",
    file_name: "250630_정기주주총회",
    data_file: file_250630,
    sub_text: [
      "[금융회사의 지배구조에 관한 법률] 제41조 및 동법 시행령 제32조에 의거 당사의 정기주주총회 결과를 첨부파일과 같이 공시합니다.",
      "제1호 의안 : 제 8기 재무제표 승인의 건",
      "제2호 의안 : 이사 및 감사 보수 한도 승인의 건",
    ],
  },
  {
    id: 11,
    title: "임원 사임 공시",
    created_at: "2025년 02월 28일",
    file_name: "250228_임원사임공시",
    data_file: file_250228,
    sub_text: [
      "‘금융회사의 지배구조에 관한 법률‘ 제7조 제2항 및 ‘금융회사의 지배구조 감독규정‘ 제3조 제1항에 따라 임원 선임 내용을 첨부와 같이 공시합니다.",
      "사내이사 이동호 사임",
    ],
  },
  {
    id: 10,
    title: "임원 사임 공시",
    created_at: "2024년 12월 31일",
    file_name: "241231_임원사임공시",
    data_file: file_241231,
    sub_text: [
      "‘금융회사의 지배구조에 관한 법률‘ 제7조 제2항 및 ‘금융회사의 지배구조 감독규정‘ 제3조 제1항에 따라 임원 선임 내용을 첨부와 같이 공시합니다.",
      "사내이사 조인산 사임",
    ],
  },
  {
    id: 9,
    title: "임원 사임 · 선임 공시",
    created_at: "2024년 06월 27일",
    file_name: "240627_임원사임공시",
    data_file: file_240627,
    sub_text: [
      "‘금융회사의 지배구조에 관한 법률‘ 제7조 제2항 및 ‘금융회사의 지배구조 감독규정‘ 제3조 제1항에 따라 임원 선임 내용을 첨부와 같이 공시합니다.",
      "사내이사 김남균 사임",
    ],
  },
  {
    id: 8,
    title: "정기주주총회 결과 공시",
    created_at: "2024년 06월 26일",
    file_name: "240626_정기주주총회",
    data_file: file_240626,
    sub_text: [
      "[금융회사의 지배구조에 관한 법률] 제41조 및 동법 시행령 제32조에 의거 당사의 정기주주총회 결과를 첨부파일과 같이 공시합니다.",
      "제1호 의안 : 제 7기 재무제표 승인의 건",
      "제2호 의안 : 사내이사 김남균 사임 및 대표이사 채은도 선임 의 건",
      "제3호 의안 : 이사 보수 한도 승인의 건",
      "제4호 의안 : 사내이사 이동호 선임의 건",
      "제5호 의안 : 임직원 주식매수선택권 부여의 건",
    ],
  },
  {
    id: 7,
    title: "임시주주총회 결과보고",
    created_at: "2024년 01월 11일",
    file_name: "240111_임시주주총회",
    data_file: file_240111,
    sub_text: [
      "[금융회사의 지배구조에 관한 법률] 제41조 및 동법 시행령 제32조에 의거 당사의 정기주주총회 결과를 첨부파일과 같이 공시합니다.",
      "제1호 의안 : 신규 업무의 등록 (투자 일임업)",
      "제2호 의안 : 정관의 변경",
    ],
  },
  {
    id: 6,
    title: "임시주주총회 결과보고",
    created_at: "2023년 11월 15일",
    file_name: "231115_임시주주총회",
    data_file: file_231115,
    sub_text: [
      "[금융회사의 지배구조에 관한 법률] 제41조 및 동법 시행령 제32조에 의거 당사의 정기주주총회 결과를 첨부파일과 같이 공시합니다.",
      "제1호 의안 : 직원 주식매수선택권 부여 (김남균 사내이사)",
    ],
  },
  {
    id: 5,
    title: "임원 사임 및 선임 공시",
    created_at: "2023년 09월 01일",
    data_file: file_230901,
    file_name: "230901_임원사임선임보고",
    sub_text: [
      "‘금융회사의 지배구조에 관한 법률‘ 제7조 제2항 및 ‘금융회사의 지배구조 감독규정‘ 제3조 제1항에 따라 임원 선임 내용을 첨부와 같이 공시합니다.",
      "사내이사 손예준 사임",
      "사내이사 김남균 선임",
    ],
  },
  
  {
    id: 4,
    title: "임시주주총회 결과보고",
    created_at: "2023년 08월 05일",
    data_file: file_230825,
    file_name: "230825_임시주주총회",
    sub_text: [
      "[금융회사의 지배구조에 관한 법률] 제41조 및 동법 시행령 제32조에 의거 당사의 정기주주총회 결과를 첨부파일과 같이 공시합니다.",
      "제 1호 의안 : 사내이사 손예준의 사임의 건",
      "제 2호 의안 : 신임 사내이사 김남균 선임의 건",
    ],
  },

  {
    id: 3,
    title: "임시주주총회 결과보고",
    created_at: "2023년 05월 17일",
    file_name: "230517_임시주주총회",
    data_file: file_230517,
    sub_text: [
      "[금융회사의 지배구조에 관한 법률] 제41조 및 동법 시행령 제32조에 의거 당사의 정기주주총회 결과를 첨부파일과 같이 공시합니다.",
      "제 1호 의안 : 직원 주식매수선택권 부여 ( 사원 박찬희)",
    ],
  },
  {
    id: 2,
    title: "임원 선임 공시",
    created_at: "2023년 03월 27일",
    file_name: "230327_임원선임(중임)보고",
    data_file: file_230327_2,
    sub_text: [
      "‘금융회사의 지배구조에 관한 법률‘ 제7조 제2항 및 ‘금융회사의 지배구조 감독규정‘ 제3조 제1항에 따라 임원 선임 내용을 첨부와 같이 공시합니다.",
      "감사 이귀현 중임",
    ],
  },

  {
    id: 1,
    title: "임시주주총회 결과보고",
    created_at: "2023년 03월 27일",
    data_file: file_230327_2,
    file_name: "230327_임시주주총회_추가검토필요",
    sub_text: [
      "[금융회사의 지배구조에 관한 법률] 제41조 및 동법 시행령 제32조에 의거 당사의 정기주주총회 결과를 첨부파일과 같이 공시합니다.",
      "제 1호 의안 : 법인 분할 승인의 건 : 임시주총에서 결의 했으나 중지됨",
      "제 2호 의안 : 감사 이귀현 재선임의 건",
    ],
  }

  
  
];
function NoticeBoard(props) {
  const dispatch = useDispatch();

  const [dataList, setDataList] = useState(TableData);
  console.log("datalist", dataList);
  return (
    <div className="noticeborad_container" ref={props.refProp} style={{zIndex:10000}}> 
      <div
        className="row gx-0"
        style={{ justifyContent: "center", marginBottom: "60px" }}
      >
        <div className="notice_board_title">Notice</div>
      </div>
      <div className="container">
        <ListGroup>
          {dataList.length <= 0 ? (
            <div>등록된 공지가 없습니다.</div>
          ) : (
            dataList.map((item, index) => (
              <ListGroup.Item
                key={index}
                onClick={() => {
                  dispatch(noticeDetailData(item));
                }}
              >
                <Link
                  className="notice_board_list_content"
                  state={{ data: item }}
                  to={{
                    pathname: `/noticedetails/${item.id}`,
                  }}
                >
                     <div style={{flexDirection:"row", display:"flex", alignItems:"center"}}> <h6 style={{ color: "#000" , marginRight:"10px"}}> {index+1}.</h6>
                  <h6 style={{ color: "#000" }}> {item.title}</h6></div>
                  <p style={{ color: "#000" }}>{item.created_at}</p>
                </Link>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </div>
    </div>
  );
}

export default NoticeBoard;
