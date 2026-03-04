// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getDtData } from "../../../api";
// import Calendar from "react-calendar";
// import { useNavigate } from "react-router-dom";
// import { resetState } from "../../../redux/slices/loginSlice";
// import { Oval } from "react-loader-spinner";
// import { useMediaQuery } from "react-responsive";
// import { resetDataState, saveDataState } from "../../../redux/slices/dataSlice";
// import { AiOutlineCalendar } from "react-icons/ai";
// import "./EnterpriseServiceText.css";
// import { useTitle } from "../../../routing/DocumentNameChanger";
// import Modal from "react-modal";
// import classNames from "classnames";
// Modal.setAppElement("#root");


// function EnterpriseServiceTest() {
//     useTitle("딥트레이드 엔터프라이즈");
//   const isPc = useMediaQuery({
//     query: "(min-width:1024px)",
//   });
//   const isTablet = useMediaQuery({
//     query: "(min-width:768px) and (max-width:1023px)",
//   });
//   const isMobile = useMediaQuery({
//     query: "(max-width:767px)",
//   });
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user_info_reducer = useSelector((state) => state.loginReducer);
//   const data_reducer = useSelector((state) => state.dataReducer);
// console.log("data_reducer",data_reducer)
//   const [asideButtonState, setAsideButtonState] = useState(data_reducer.shannon_stock ? "SHANNON_STOCK":'SHANNON_INDEX');
//   const [tableDataList, setTableDataList] = useState(null);
//   const [value, onChange] = useState(new Date());
//   const [showCalendar, setShowCalendar] = useState(false);
//   const initializeSelected =()=>{
//     let result;
 


//     // Check for shannon_top5
//     if(data_reducer.shannon_top5!=undefined){
//         if (Object.keys(data_reducer.shannon_top5).length>0) {
//             const keys = Object.keys(data_reducer.shannon_top5)
            
//              result = keys[0]
//              return result
//         }
//     }
   

//     // Check for shannon_top20
//     if(data_reducer.shannon_top20!=undefined){
//     if (Object.keys(data_reducer.shannon_top20).length>0) {
      
//         const keys = Object.keys(data_reducer.shannon_top20)
        
//          result = keys[0]
     
//         return result
//     }
// }
// if(data_reducer.Daily!=undefined){
//     return "Daily"
// }else{
//     if(data_reducer.Weekly!=undefined){
//         return "Weekly"
//     }
// }
// // if(data_reducer.Weekly!=undefined){
// //     return "Weekly"
// // }

//     }

// const initializeModelType =()=>{

   
//     if(data_reducer.shannon_top5!=undefined){
//         return "shannon_top5"
       
//     }else{
//         if(data_reducer.shannon_top20!=undefined){
//             return "shannon_top20"
//            }
//     }
   
//    if(data_reducer.Daily!=undefined){
//     return "Daily"
   
// }else{
//     if(data_reducer.Weekly!=undefined){
//         return "Weekly"
//     }
 
// }

// }

//   const [selected, setSelected] = useState(initializeSelected());  //1주 Top5
//   const [modelType, setModelType] = useState(initializeModelType()) //"shannon_top5"
//   const [isMobilePcVersion, setIsMobilePcVersion] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const dateObjects = user_info_reducer.date_list.map(
//     (dateString) => new Date(dateString)
//   );

//   const [vaildSignalDateList, setVaildSignalDateList] = useState(dateObjects);
//   const [selectedDate, setSelectedDate] = useState(
//     vaildSignalDateList.slice(-1)[0]
//   );
//   const convertDate = () => {
//     const date = new Date(selectedDate);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
//     const day = String(date.getDate()).padStart(2, "0");

//     const formattedDate = `${year}-${month}-${day}`;
//     return formattedDate;
//   };
//   const [currentSelectedDate, setCurrentSelectedDate] = useState(convertDate());

//   const getModelData = async (currentdate) => {
//     resetDataState()
//     setLoader(true);
//     const res = await getDtData.fetchDtDataTest(
//       user_info_reducer.company_name,
//       currentdate
//     );
//     if (res.status === 200) {
//         console.log("res.data", res.data)
//       dispatch(saveDataState(res.data));
//     //   setTableDataList(res.data);

//       setLoader(false);
//       //   console.log("data is feteched successfully", res.data);
//     } else {
//       setLoader(false);
//       console.log("something went wrong");
//     }
//   };

//   // Get Model data New Function
//   useEffect(() => {
//     let isComponentRender = true;
//     if (isComponentRender) {
//       getModelData(currentSelectedDate);
//     }

//     return () => {
//       isComponentRender = false;
//     };
//   }, []);
//   const onLogout = () => {
//     dispatch(resetState());
//     navigate("/enterprise", { replace: true });
//   };

// //Calendar logic
// function closeModal() {
//     setShowCalendar(false);
//   }

//   // Calculate min and max dates based on your clickable dates
//   const minDate = new Date(Math.min(...vaildSignalDateList));
//   minDate.setFullYear(minDate.getFullYear() - 3); // Adjust the range as needed

//   const maxDate = new Date(Math.max(...vaildSignalDateList));
  

//   const isDateDisabled = (date) => {
  
//     return !vaildSignalDateList.some(
//       (d) => d.toDateString() === date.toDateString()
//     );
//   };

//   const handleDateSelection = (date) => {

//     setSelectedDate(date);
//     const _date = new Date(date);
//     const year = _date.getFullYear();
//     const month = String(_date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
//     const day = String(_date.getDate()).padStart(2, "0");

//     const formattedDate = `${year}-${month}-${day}`;
//     setCurrentSelectedDate(formattedDate);
//     setShowCalendar(false);
//     resetDataState()
//     getModelData(formattedDate);

    
//   };

// useEffect(() => {
//   let isComponentRender  = true
//   if(isComponentRender){
//     if(data_reducer){
    
//     if(selected!="" && asideButtonState!=""){
//         if(asideButtonState ==="SHANNON_STOCK"){
          
//         Object.keys(data_reducer).forEach(key=>{
//            const value = data_reducer[key]
//            if(value!=undefined){
           
//             if(modelType===key){
             
//                 Object.keys(value).forEach(innerKey => {
//                 if(innerKey ===selected){
//                     setTableDataList(value[innerKey])
//                    }
//                 })
//                }
//            }
      
          
//         })
        
   
//       }
//       else if(asideButtonState ==="SHANNON_INDEX"){

//         Object.keys(data_reducer).forEach(key=>{
      
//             const value = data_reducer[key]
//             if(value!=undefined){
//                 if(modelType===key){
//                     setTableDataList(value)
           
//                 }
//             }
            
           
//          })
//     }
//     else{
//         console.log("Model does not match")
//     }
//     }
// }
//     }
    
//   return () => {
//     isComponentRender = false
//   }
// }, [selected, modelType, data_reducer])


// const handlePcClick = () => {
//     setIsMobilePcVersion(!isMobilePcVersion);
  
//   };




//   function StockTable({ data ,tableType}) {
    
//     if(tableType==="SHANNON_STOCK"){
//     return (
//       <div className={
//         isPc
//           ? "enterprises_service_table_responsive_pc"
//           : isTablet
//           ? "enterprises_service_table_responsive_tab"
//           : "enterprises_service_table_responsive_mob"
//       }>
//         {loader ? (
//           <Oval
//             height={50}
//             width={50}
//             color="#4fa94d"
//             wrapperStyle={{ alignItems: "center", justifyContent: "center" }}
//             wrapperClass=""
//             visible={true}
//             ariaLabel="oval-loading"
//             secondaryColor="#4fa94d"
//             strokeWidth={2}
//             strokeWidthSecondary={2}
//           />
//         ) : (
//           <table 
//           className={
//             isPc
//               ? "enterprises_service_table_pc enterprises_service_table_bordered_pc"
//               : isTablet
//               ? "enterprises_service_table_tab enterprises_service_table_bordered_tab"
//               : "enterprises_service_table_mob enterprises_service_table_bordered_mob"
//           }
//           >
//             <thead
//               className={
//                 showCalendar
//                   ? "nonsticky_table_header"
//                   : "sticky_table_header"
//               }
//             >
//               <tr>
//                 <th>Stock ID</th>
//                 <th>Name</th>
//                 <th>Buying Date</th>
//                 <th>Selling Date</th>
//                 <th>Sector</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((row, index) => (
//                 <tr key={index}>
//                   <td>{row.stock_id}</td>
//                   <td>{row.name}</td>
//                   <td>{row.buying_date}</td>
//                   <td>{row.selling_date}</td>
//                   <td>{row.sector}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     );
//               }else{
//                 return(
//                     <div className={
//                         isPc
//                           ? "enterprises_service_table_responsive_pc"
//                           : isTablet
//                           ? "enterprises_service_table_responsive_tab"
//                           : "enterprises_service_table_responsive_mob"
//                       }>
//                     {loader ? (
//                       <Oval
//                         height={50}
//                         width={50}
//                         color="#4fa94d"
//                         wrapperStyle={{ alignItems: "center", justifyContent: "center" }}
//                         wrapperClass=""
//                         visible={true}
//                         ariaLabel="oval-loading"
//                         secondaryColor="#4fa94d"
//                         strokeWidth={2}
//                         strokeWidthSecondary={2}
//                       />
//                     ) : (
//                       <table className={
//                         isPc
//                           ? "enterprises_service_table_pc enterprises_service_table_bordered_pc"
//                           : isTablet
//                           ? "enterprises_service_table_tab enterprises_service_table_bordered_tab"
//                           : "enterprises_service_table_mob enterprises_service_table_bordered_mob"
//                       }>
//                         <thead
//                           className={
//                             showCalendar
//                               ? "nonsticky_table_header"
//                               : "sticky_table_header"
//                           }
//                         >
//                           <tr>
//                           <th>Date</th>
//               <th>Long</th>
//               <th>Cash</th>
//               <th>Short</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {data.map((row, index) => (
//                             <tr key={index}>
//                            <td>{row.date}</td>
//                 <td>{row.adj_Long}</td>
//                 <td>{row.adj_Cash}</td>
//                 <td>{row.adj_Short}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     )}
//                   </div>
//                 )
//               }
//   }
//   const customStyles = isPc?  
//   {
//     content: {
//       top: "50%",
//       left: "50%",
//       right: "auto",
//       bottom: "auto",
//       marginRight: "-50%",
//       transform: "translate(-76%, -92%)",
//       background: "white", // Set the background color
//       border: "1px solid #ccc", // Add a border
//       borderRadius: "5px", // Add rounded corners
//       padding: "10px", // Add padding
//       maxWidth: "500px", // Set a maximum width
//       width: "454px",
//       boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Add a
//     },
//   }:isTablet?{
//     content: {
//         top: "50%",
//         left: "50%",
//         right: "auto",
//         bottom: "auto",
//         marginRight: "-50%",
//         transform: "translate(-65%, -109%)",
//         background: "white", // Set the background color
//         border: "1px solid #ccc", // Add a border
//         borderRadius: "5px", // Add rounded corners
//         padding: "10px", // Add padding
//         maxWidth: "500px", // Set a maximum width
//         width: "390px",
//         boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Add a
//       },
    
//   }: {
//     content: {
//       top: "50%",
//       left: "50%",
//       right: "auto",
//       bottom: "auto",
//       marginRight: "-50%",
//       transform: "translate(-50%, -69%)",
//       background: "white", // Set the background color
//       border: "1px solid #ccc", // Add a border
//       borderRadius: "5px", // Add rounded corners
//       padding: "10px", // Add padding
//       maxWidth: "500px", // Set a maximum width
//       width: "356px",
//       boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Add a
//     },
//   };

//   return (
//     <div style={{height:"149vh",     display: "flex",
//     flexDirection: "column"}}>
//       {(user_info_reducer && user_info_reducer.is_staff) && data_reducer ? 
//     isMobilePcVersion?  <div
//     className="enterprise_container_pc"
//   >
//     <div
//     style={{width:"1000px",  margin: "0 auto"}}
//       className="enterprise_header_pc"
//     >
//       <div
//         className="enterprise_header_left_pc"
//       >
//         <img src={"/assets/enterprise_logo.png"} alt="logo" />
//       </div>
//       <div
//         className="enterprise_header_right_pc"
//       >
//         <div
//           className="enterprise_header_right_id_pc"
//           style={{ marginRight: "10px" }}
//         >
//           <span style={{ fontWeight: 900 }}> ID:</span>{" "}
//           {user_info_reducer.company_usrnm}
//         </div>
//         <div
//           onClick={onLogout}
//           className="enterprise_header_right_logout_pc"
//           style={{ marginRight: "10px" }}
//         >
//           로그아웃
//         </div>
//         {isMobile && <div
//     onClick={() => handlePcClick()}
//     className={isMobilePcVersion?"enterprise_pc_version_text_pc":"enterprise_pc_version_text_pc"} 
//   >
//    <span>{isMobilePcVersion ? "모바일 버전" : "PC 버전"}</span> 
   
//   </div>
//   }
//       </div>
//     </div>
//     <div
//       className="enterprise_center_container_pc"
//     >
//       <div
//         className="enterprise_content_container_pc"
//       >
//         <div
//           className="enterprise_content_left_pc"
//         >
//           {data_reducer && data_reducer.shannon_stock == true && (
//             <button
//               className="enterprise_content_left_button_pc"
//               onClick={() => {
//                 setAsideButtonState("SHANNON_STOCK");
                     
//                      const  modelres = initializeModelType()
                     
//                      setModelType(modelres)
//                       const res =  initializeSelected()
                   
//                       setSelected(res)
//               }}
//               style={{
//                 backgroundColor:
//                   asideButtonState === "SHANNON_STOCK"
//                     ? "#007bff"
//                     : "rgb(100 100 100)",
//               }}
//             >
//               Shannon 개별종목
//             </button>
//           )}
//           {data_reducer && data_reducer.shannon_index == true && (
//             <button
//               className="enterprise_content_left_button_pc"
//               onClick={() => {
//                 setAsideButtonState("SHANNON_INDEX");
//                 if(data_reducer.Daily!=undefined){
//                   setModelType("Daily")
//                   setSelected("Daily")
//               }else{
//                 if(data_reducer.Weekly!=undefined){
                  
//                     setModelType("Weekly")
//                 setSelected("Weekly")
//                 }
//               }
            
           
             
             
//               }}
//               style={{
//                 backgroundColor:
//                   asideButtonState === "SHANNON_INDEX"
//                     ? "#007bff"
//                     : "rgb(100 100 100)",
//               }}
//             >
//               Shannon 지수
//             </button>
//           )}
//         </div>
//         <div
//           className="enterprise_content_parent_right_pc"
//         >
//           <div
//             className="enterprise_content_right_text_pc"
//           >
//            {asideButtonState==="SHANNON_STOCK"?"딥트레이드테크놀로지스에서 개발한 주가 예측 모델, Shannon으로 예측하여 전체 주가 방향성을 산출하고 이를 바탕으로한 추천하는 상위 종목들을 보여줍니다.":"딥트레이드테크놀로지스에서 개발한 위험 관리 시스템으로 시장 움직임을 예측하여 롱숏 포트폴리오 비중을 산출하여 투자 방향성을 보여줍니다."}
//           </div>

//           <div
//             className="enterprise_content_right_pc"
//           >
//             <div
//               className="enterprise_content_right_left_pc"
//             >
//               {asideButtonState === "SHANNON_STOCK"
//                 ? Object.keys(data_reducer).map((key) => {
//                     const value = data_reducer[key];
                  

//                     if (key === "shannon_top5") {
//                         if(value!=undefined){
//                       return Object.keys(value).map((innerKey) => {
                      
//                         return (
//                           <button
//                             key={innerKey} // Add a unique key for each button
//                             style={{
//                               backgroundColor:
//                                 selected === innerKey
//                                   ? "#007bff"
//                                   : "rgb(100 100 100)",
//                             }}
//                             className="enterprise_content_right_left_button_pc"
                       
//                             onClick={() => {
//                               setSelected(innerKey)
//                               setModelType(key)
//                               // Your click handler logic here
//                             }}
//                           >
//                       {innerKey}
//                           </button>
//                         );
//                       });}
//                     }
//                     //for top 20 

//                     if (key === "shannon_top20") {
//                         if(value!=undefined){
//                       return Object.keys(value).map((innerKey) => {
                      
//                         return (
//                           <button
//                             key={innerKey} // Add a unique key for each button
//                             style={{
//                               backgroundColor:
//                                 selected === innerKey
//                                   ? "#007bff"
//                                   : "rgb(100 100 100)",
//                             }}
//                             className="enterprise_content_right_left_button_pc"
                       
//                             onClick={() => {
//                               setSelected(innerKey)
//                               setModelType(key)
//                               // Your click handler logic here
//                             }}
//                           >
//                       {innerKey}
//                           </button>
//                         );
//                       });}
//                     }

//                     return null; // Return null for other keys if you don't want to render anything
//                   })
//                 : asideButtonState === "SHANNON_INDEX"? Object.keys (data_reducer).map((key) => {
//                     const value = data_reducer[key];
                  
               
//                     if (key === "Daily" ) {
//                         if(value!=undefined){
//                             return(
              
//                                 <button
                          
//                                   style={{
//                                     backgroundColor:
//                                       selected === key
//                                         ? "#007bff"
//                                         : "rgb(100 100 100)",
//                                   }}
//                                   className="enterprise_content_right_left_button_pc"
                             
//                                   onClick={() => {
      
//                                     setSelected(key)
//                                     setModelType(key)
                               
//                                   }}
//                                 >
//                             {key}
//                                 </button>
//                             )
//                         }
                     
//                     }
//                     if(key==="Weekly"){
//                         if(key!=undefined){
                            
//                       return(
              
//                           <button
                    
//                             style={{
//                               backgroundColor:
//                                 selected === key
//                                   ? "#007bff"
//                                   : "rgb(100 100 100)",
//                             }}
//                             className="enterprise_content_right_left_button_pc"
                       
//                             onClick={() => {
//                               setSelected(key)
//                               setModelType(key)
                         
//                             }}
//                           >
//                       {key}
//                           </button>
//                       )}
//                     }

//                     return null; // Return null for other keys if you don't want to render anything
//                   }):null}
//             </div>
//             <div
//               className="enterprise_content_right_right_pc"
//             >
//                {asideButtonState === "SHANNON_STOCK" &&
//               <div
//                 className="enterprise_content_right_right_calendar_pc"
//               >
//               <div
//             onClick={() => setShowCalendar(!showCalendar)}
//             className="calendar_icon"
//           >
//             <AiOutlineCalendar size={25} />
//             {showCalendar ? convertDate() : convertDate()}
//           </div>
//           <Modal
//             isOpen={showCalendar}
//             onRequestClose={closeModal}
//             style={customStyles}
//           >
//             <Calendar
//               calendarType="US"
//               locale="ko"
//               defaultActiveStartDate={selectedDate}
//               onClickDay={(date) => handleDateSelection(date)}
//               onChange={onChange}
//               value={value}
//               minDate={minDate}
//               maxDate={maxDate}
//               tileClassName={({ date, view }) => {
//                 const isHovered = view === "month" || view === "year"; // Define hoverable views (month/year)

//                 return classNames({
//                   "selected-date":
//                     date.toDateString() === selectedDate.toDateString(),
//                 });
//               }}
//               tileDisabled={({ date }) => isDateDisabled(date)}
//             />
//           </Modal>
       

//               </div>}
//               <div
//                 className="enterprise_content_right_right_table_pc"
//               >
//                 {(selected && tableDataList ) && <StockTable data={tableDataList} tableType={asideButtonState}/>}
                
            
            
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
   
//   </div>
//       :  <div
//           className={
//             isPc
//               ? "enterprise_container_pc"
//               : isTablet
//               ? "enterprise_container_tab"
//               : "enterprise_container_mob"
//           }
//         >
//           <div
//             className={
//               isPc
//                 ? "enterprise_header_pc"
//                 : isTablet
//                 ? "enterprise_header_tab"
//                 : "enterprise_header_mob"
//             }
//           >
//             <div
//               className={
//                 isPc
//                   ? "enterprise_header_left_pc"
//                   : isTablet
//                   ? "enterprise_header_left_tab"
//                   : "enterprise_header_left_mob"
//               }
//             >
//               <img src={"/assets/enterprise_logo.png"} alt="logo" />
//             </div>
//             <div
//               className={
//                 isPc
//                   ? "enterprise_header_right_pc"
//                   : isTablet
//                   ? "enterprise_header_right_tab"
//                   : "enterprise_header_right_mob"
//               }
//             >
//               <div
//                 className={
//                   isPc
//                     ? "enterprise_header_right_id_pc"
//                     : isTablet
//                     ? "enterprise_header_right_id_tab"
//                     : "enterprise_header_right_id_mob"
//                 }
//                 style={{ marginRight: "10px" }}
//               >
//                 <span style={{ fontWeight: 900 }}> ID:</span>{" "}
//                 {user_info_reducer.company_usrnm}
//               </div>
//               <div
//                 onClick={onLogout}
//                 className={
//                   isPc
//                     ? "enterprise_header_right_logout_pc"
//                     : isTablet
//                     ? "enterprise_header_right_logout_tab"
//                     : "enterprise_header_right_logout_mob"
//                 }
//                 style={{ marginRight: "10px" }}
//               >
//                 로그아웃
//               </div>
//               {isMobile && <div
//     onClick={() => handlePcClick()}
//     className={
//   isMobilePcVersion?"enterprise_pc_version_text_pc":"enterprise_pc_version_text"
//       }
   
//   >
//    <span>{isMobilePcVersion ? "모바일 버전" : "PC 버전"}</span> 
   
//   </div>}
//             </div>
//           </div>
//           <div
//             className={
//               isPc
//                 ? "enterprise_center_container_pc"
//                 : isTablet
//                 ? "enterprise_center_container_tab"
//                 : "enterprise_center_container_mob"
//             }
//           >
//             <div
//               className={
//                 isPc
//                   ? "enterprise_content_container_pc"
//                   : isTablet
//                   ? "enterprise_content_container_tab"
//                   : "enterprise_content_container_mob"
//               }
//             >
//               <div
//                 className={
//                   isPc
//                     ? "enterprise_content_left_pc"
//                     : isTablet
//                     ? "enterprise_content_left_tab"
//                     : "enterprise_content_left_mob"
//                 }
//               >
//                 {data_reducer && data_reducer.shannon_stock == true && (
//                   <button
//                     className={
//                       isPc
//                         ? "enterprise_content_left_button_pc"
//                         : isTablet
//                         ? "enterprise_content_left_button_tab"
//                         : "enterprise_content_left_button_mob"
//                     }
//                     onClick={() => {
                    
//                       setAsideButtonState("SHANNON_STOCK");
                     
//                      const  modelres = initializeModelType()
                     
//                      setModelType(modelres)
//                       const res =  initializeSelected()
                   
//                       setSelected(res)
//                     }}
//                     style={{
//                       backgroundColor:
//                         asideButtonState === "SHANNON_STOCK"
//                           ? "#007bff"
//                           : "rgb(100 100 100)",
//                     }}
//                   >
//                     Shannon 개별종목
//                   </button>
//                 )}
//                 {data_reducer && data_reducer.shannon_index == true && (
//                   <button
//                     className={
//                       isPc
//                         ? "enterprise_content_left_button_pc"
//                         : isTablet
//                         ? "enterprise_content_left_button_tab"
//                         : "enterprise_content_left_button_mob"
//                     }
//                     onClick={() => {
                      
//                       setAsideButtonState("SHANNON_INDEX");
//                       if(data_reducer.Daily!=undefined){
//                         setModelType("Daily")
//                         setSelected("Daily")
//                     }else{
//                       if(data_reducer.Weekly!=undefined){
                        
//                           setModelType("Weekly")
//                       setSelected("Weekly")
//                       }
//                     }
                 
                   
//                     }}
//                     style={{
//                       backgroundColor:
//                         asideButtonState === "SHANNON_INDEX"
//                           ? "#007bff"
//                           : "rgb(100 100 100)",
//                     }}
//                   >
//                     Shannon 지수
//                   </button>
//                 )}
//               </div>
//               <div
//                 className={
//                   isPc
//                     ? "enterprise_content_parent_right_pc"
//                     : isTablet
//                     ? "enterprise_content_parent_right_tab"
//                     : "enterprise_content_parent_right_mob"
//                 }
//               >
//                 <div
//                   className={
//                     isPc
//                       ? "enterprise_content_right_text_pc"
//                       : isTablet
//                       ? "enterprise_content_right_text_tab"
//                       : "enterprise_content_right_text_mob"
//                   }
//                 >
//                    {asideButtonState==="SHANNON_STOCK"?"딥트레이드테크놀로지스에서 개발한 주가 예측 모델, Shannon으로 예측하여 전체 주가 방향성을 산출하고 이를 바탕으로한 추천하는 상위 종목들을 보여줍니다.":"딥트레이드테크놀로지스에서 개발한 위험 관리 시스템으로 시장 움직임을 예측하여 롱숏 포트폴리오 비중을 산출하여 투자 방향성을 보여줍니다."}
//                 </div>

//                 <div
//                   className={
//                     isPc
//                       ? "enterprise_content_right_pc"
//                       : isTablet
//                       ? "enterprise_content_right_tab"
//                       : "enterprise_content_right_mob"
//                   }
//                 >
//                   <div
//                     className={
//                       isPc
//                         ? "enterprise_content_right_left_pc"
//                         : isTablet
//                         ? "enterprise_content_right_left_tab"
//                         : "enterprise_content_right_left_mob"
//                     }
//                   >
//                     {asideButtonState === "SHANNON_STOCK"
//                       ? Object.keys(data_reducer).map((key) => {
//                           const value = data_reducer[key];
                        
                         
//                           if (key === "shannon_top5") {
//                               if(value!=undefined){
 
//                                 return Object.keys(value).map((innerKey) => {
                            
//                                     return (
//                                       <button
//                                         key={innerKey} // Add a unique key for each button
//                                         style={{
//                                           backgroundColor:
//                                             selected === innerKey
//                                               ? "#007bff"
//                                               : "rgb(100 100 100)",
//                                         }}
//                                         className={
//                                           isPc
//                                             ? "enterprise_content_right_left_button_pc"
//                                             : isTablet
//                                             ? "enterprise_content_right_left_button_tab"
//                                             : "enterprise_content_right_left_button_mob"
//                                         }
                                   
//                                         onClick={() => {
//                                           setSelected(innerKey)
//                                           setModelType(key)
//                                           // Your click handler logic here
//                                         }}
//                                       >
//                                      {innerKey}
//                                       </button>
//                                     );
//                                   });
//                               }
                  
//                           }
//                           //for top 20 

//                           if (key === "shannon_top20") {
//                            if(value!=undefined){
//                             return Object.keys(value).map((innerKey) => {
                            
//                               return (
//                                 <button
//                                   key={innerKey} // Add a unique key for each button
//                                   style={{
//                                     backgroundColor:
//                                       selected === innerKey
//                                         ? "#007bff"
//                                         : "rgb(100 100 100)",
//                                   }}
//                                   className={
//                                     isPc
//                                       ? "enterprise_content_right_left_button_pc"
//                                       : isTablet
//                                       ? "enterprise_content_right_left_button_tab"
//                                       : "enterprise_content_right_left_button_mob"
//                                   }
                             
//                                   onClick={() => {
//                                     setSelected(innerKey)
//                                     setModelType(key)
//                                     // Your click handler logic here
//                                   }}
//                                 >
//                             {innerKey}
//                                 </button>
//                               );
//                             });
//                         }
//                           }

//                           return null; // Return null for other keys if you don't want to render anything
//                         })
//                       : asideButtonState === "SHANNON_INDEX"? Object.keys(data_reducer).map((key) => {
//                           const value = data_reducer[key];
                        

//                           if (key === "Daily" ) {
//                             if(value!=undefined){
//                             return(
                    
//                                 <button
                          
//                                   style={{
//                                     backgroundColor:
//                                       selected === key
//                                         ? "#007bff"
//                                         : "rgb(100 100 100)",
//                                   }}
//                                   className={
//                                     isPc
//                                       ? "enterprise_content_right_left_button_pc"
//                                       : isTablet
//                                       ? "enterprise_content_right_left_button_tab"
//                                       : "enterprise_content_right_left_button_mob"
//                                   }
                             
//                                   onClick={() => {
//                                     setSelected(key)
//                                     setModelType(key)
                               
//                                   }}
//                                 >
//                             {key}
//                                 </button>
//                             )}
//                           }
//                           if(key==="Weekly"){
//                             if(value!=undefined){
//                             return(
                    
//                                 <button
                          
//                                   style={{
//                                     backgroundColor:
//                                       selected === key
//                                         ? "#007bff"
//                                         : "rgb(100 100 100)",
//                                   }}
//                                   className={
//                                     isPc
//                                       ? "enterprise_content_right_left_button_pc"
//                                       : isTablet
//                                       ? "enterprise_content_right_left_button_tab"
//                                       : "enterprise_content_right_left_button_mob"
//                                   }
                             
//                                   onClick={() => {
//                                     setSelected(key)
//                                     setModelType(key)
                               
//                                   }}
//                                 >
//                             {key}
//                                 </button>
//                             )}
//                           }

//                           return null; // Return null for other keys if you don't want to render anything
//                         }):null}
//                   </div>
//                   <div
//                     className={
//                       isPc
//                         ? "enterprise_content_right_right_pc"
//                         : isTablet
//                         ? "enterprise_content_right_right_tab"
//                         : "enterprise_content_right_right_mob"
//                     }
//                   >
//                      {asideButtonState === "SHANNON_STOCK" &&
//                     <div
//                       className={
//                         isPc
//                           ? "enterprise_content_right_right_calendar_pc"
//                           : isTablet
//                           ? "enterprise_content_right_right_calendar_tab"
//                           : "enterprise_content_right_right_calendar_mob"
//                       }
//                     >
//                     <div
//                   onClick={() => setShowCalendar(!showCalendar)}
//                   className="calendar_icon"
//                 >
//                   <AiOutlineCalendar size={25} />
//                   {showCalendar ? convertDate() : convertDate()}
//                 </div>
//                 <Modal
//                   isOpen={showCalendar}
//                   onRequestClose={closeModal}
//                   style={customStyles}
//                 >
//                   <Calendar
//                     calendarType="US"
//                     locale="ko"
//                     defaultActiveStartDate={selectedDate}
//                     onClickDay={(date) => handleDateSelection(date)}
//                     onChange={onChange}
//                     value={value}
//                     minDate={minDate}
//                     maxDate={maxDate}
//                     tileClassName={({ date, view }) => {
//                       const isHovered = view === "month" || view === "year"; // Define hoverable views (month/year)

//                       return classNames({
//                         "selected-date":
//                           date.toDateString() === selectedDate.toDateString(),
//                       });
//                     }}
//                     tileDisabled={({ date }) => isDateDisabled(date)}
//                   />
//                 </Modal>
             

//                     </div>}
//                     <div
//                       className={
//                         isPc
//                           ? "enterprise_content_right_right_table_pc"
//                           : isTablet
//                           ? "enterprise_content_right_right_table_tab"
//                           : "enterprise_content_right_right_table_mob"
//                       }
//                     >
//                       {(selected && tableDataList ) && <StockTable data={tableDataList} tableType={asideButtonState}/>}
                      
                  
                  
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
         
//         </div>
//        : (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           404 Page not found
//         </div>
//       )}
     
//     </div>
//   );
// }

// export default EnterpriseServiceTest;
