import React, { useContext } from "react";
import Sidebar from "../SideBar/Sidebar";
import { sidebarcontext } from "../../context/Sidebarcontext";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import HeaderDropdown from "../Header/HeaderDropdown";
import { popupcontext } from "../../context/Popupscontext";

export default function Mainlayout() {
  let { isSideOpen } = useContext(sidebarcontext);
  let {options} = useContext(popupcontext)
  const location = useLocation();
  let path = location.pathname;
  const ScreenClass = isSideOpen
    ? path === "/" || path === "/dashboard"
      ? "outlet-content-max p-16"
      : "outlet-content-max"
    : path !== "/" && path !== "/dashboard"
    ? "outlet-content-min"
    : "outlet-content-min p-16";
  return (
    <>
      <Sidebar />
      <div>
        <Header />
        <div className={ScreenClass}>
          <Outlet />
          {options && <HeaderDropdown />}
        </div>
      </div>
    </>
  );
}
