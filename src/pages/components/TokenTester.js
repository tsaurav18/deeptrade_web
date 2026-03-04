// import React, { useState } from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// // accessToken을 authSlice에 저장해둔 전제
// import { setAccessToken, clearAccessToken } from "../../redux/slices/authSlice";

// const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

// export default function TokenTester() {
//   const dispatch = useDispatch();
//   const accessToken = useSelector((state) => state.authReducer?.accessToken); // 이름 확인

//   const [result, setResult] = useState("");

//   const verifyAccess = async () => {
//     setResult("검증 중...");
//     try {
//       const res = await axios.get(`${API_BASE}/auth/me`, {
//         headers: {
//           Authorization: `Bearer ${accessToken || ""}`,
//         },
//       });
//       setResult(`Access OK\n${JSON.stringify(res.data, null, 2)}`);
//     } catch (e) {
//       const msg = e?.response?.data ? JSON.stringify(e.response.data) : String(e);
//       setResult(`Access FAIL\n${msg}`);
//     }
//   };

//   const verifyRefreshAndReissue = async () => {
//     setResult("검증 중...");
//     try {
//       // refresh_token은 httpOnly 쿠키라 JS로 읽지 않음
//       // 대신 withCredentials로 쿠키를 같이 보내서 서버가 검증/재발급
//       const res = await axios.post(
//         `${API_BASE}/refresh`,
//         {},
//         { withCredentials: true }
//       );

//       const newAccess = res.data?.access_token;
//       if (newAccess) {
//         dispatch(setAccessToken(newAccess));
//       }

//       setResult(`✅ Refresh OK (재발급 성공)\n${JSON.stringify(res.data, null, 2)}`);
//     } catch (e) {
//       const msg = e?.response?.data ? JSON.stringify(e.response.data) : String(e);
//       setResult(`Refresh FAIL\n${msg}`);
//       // refresh가 실패하면 보통 로그아웃 처리도 같이 함
//       dispatch(clearAccessToken());
//     }
//   };

//   return (
//     <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
//       <h3>Token Tester</h3>

//       <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
//         <button onClick={verifyAccess} disabled={!accessToken}>
//           Access Token 검증
//         </button>

//         <button onClick={verifyRefreshAndReissue}>
//           Refresh Token 검증(재발급)
//         </button>
//       </div>

//       <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
//         현재 AccessToken: {accessToken ? "있음" : "없음"}
//       </div>

//       <pre style={{ whiteSpace: "pre-wrap", background: "#fafafa", padding: 12 }}>
//         {result}
//       </pre>
//     </div>
//   );
// }