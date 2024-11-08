import React, { useContext, useState } from "react";
import { sidebarcontext } from "../../context/Sidebarcontext";
import Selection from "./SidebarParts/Selection";
import DropdownSelection from "./SidebarParts/DropdownSelection";

export default function Sidebar() {
  let { isSideOpen, handleToggle } = useContext(sidebarcontext);
  return (
    <>
      <div
        className={isSideOpen ? "sidebar sidebar-max" : "sidebar sidebar-min"}
      >
        <div className="sidebar-head flex-between">
          {/**<div className="sidebar-logo">
            <img src="/assets/image.svg" alt="" />
          </div>**/}
          <div className="sidebar-head-title">Vista Tracking</div>
          <div className="head-arrow" role="button">
            <img
              src={
                isSideOpen
                  ? "/assets/dark/leftarrow.svg"
                  : "/assets/dark/rightarrow.svg"
              }
              alt=""
              onClick={handleToggle}
            />
          </div>
        </div>
        <div className="sidebar-logo">
          <img src="/assets/SideBarLogo.svg" alt="Logo" />
        </div>
        <Selection  />
        <DropdownSelection isSideOpen={isSideOpen} />
      </div>
    </>
  );
}
