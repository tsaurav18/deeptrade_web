import "./Header.css";
import React, {useState} from "react";
import Modal from 'react-modal';
import NoticeBoard from "../NoticeBoard/NoticeBoard";
import { useMediaQuery } from "react-responsive";
Modal.setAppElement('#root');


function Header(props) {
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: isMobile?"397px":"635px" , 
      height:isMobile?"48rem":'',
      zIndex: 10000
    },
  };
  let subtitle;
  const [showNoticeBoard, setShowNoticeBoard] = useState(false)
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setShowNoticeBoard(false);
  }

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
            // onClick={() => props.noticeRef.current.scrollIntoView()}
            onClick={() => {setShowNoticeBoard(!showNoticeBoard)}}
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
            // onClick={() => props.noticeRef.current.scrollIntoView()}
            onClick={() => {setShowNoticeBoard(!showNoticeBoard)}}
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

      { showNoticeBoard && <Modal
      
        isOpen={showNoticeBoard}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        
      >
              <NoticeBoard/>
      </Modal> }
    </div>
  );
}

export default Header;
