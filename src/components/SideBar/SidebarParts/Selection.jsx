import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SelectionItem from "./SelectionItem/SelectionItem";

export default function Selection() {
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to handle window resize and set window width
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call once to set initial width
    handleResize();

    // Cleanup event listener when component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="select-items">
      <NavLink
        to={location.pathname === "/" ? "/" : "/dashboard"}
        className="select-item flex-center"
      >
        <div className="select-icons">
          <img
            className="icons"
            src="/assets/dark/dashboard.svg"
            alt="dashboard"
          />
        </div>
        <p className="select-text">dashboard</p>
      </NavLink>

      <SelectionItem
        path="/livetracking"
        icon="livetracking"
        name="live tracking"
      />
      <SelectionItem path="/geofences" icon="Geofence" name="geofences" />
      {windowWidth >= 575 && (
        <>
          <SelectionItem path="reports" icon="reports" name="reports" />
          <SelectionItem
            path="historical"
            icon="historical"
            name="historical"
          />
          <SelectionItem
            path="maintenance"
            icon="maintenance"
            name="maintenance"
          />
          <SelectionItem path="insurance" icon="insurance" name="insurance" />
          <SelectionItem path="accidents" icon="accidents" name="accidents" />
        </>
      )}
      <SelectionItem
        path="/notifications"
        icon="notifications"
        name="notifications"
      />
    </div>
  );}