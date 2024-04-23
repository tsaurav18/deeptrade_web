import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { RightOutlined, MenuOutlined } from "@ant-design/icons";

export default function SideBar2({ visible, show }) {
  return (
    <>
      <div className="mobile-ratb-nav">
        <button className="mobile-ratb-nav-btn" onClick={() => show(!visible)}>
          <MenuOutlined />
        </button>
      </div>
      <aside className={!visible ? "ratb_navbar" : ""}>
        {/* <button
					type="button"
					className="ratb-nav-btn"
					onClick={() => show(!visible)}
				>
					{ !visible
						? <FaAngleRight size={30} /> : <FaAngleLeft size={30} />}
				</button> */}
        <div>
          <NavLink
            className="ratb-navbar-logo"
            to="/portfolio_list"
            style={{
              backgroundColor: "white",
			  height: 150,
			  width: 150
            }}
          >
            <img src={"assets/enterprise_logo.png"} alt="logo" style={{objectFit: 'contain'}}/>
          </NavLink>
        </div>

        {/* <div className="links">
					<NavLink to="/settings" className="nav-link">
						<FaCog size={ICON_SIZE} />
						<span>Settings</span> 
					</NavLink>
					<NavLink to="/Sign-out" className="nav-link">
						<FaSignOutAlt size={ICON_SIZE} />
						<span>Logout</span> 
					</NavLink>
				</div> */}
      </aside>
    </>
  );
}
