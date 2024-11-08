import React from "react";
import { useMap } from "react-leaflet";
import { useLocation } from "react-router-dom";

export default function ObjectMinimized({ title, minimize }) {
  const map = useMap();
  map.scrollWheelZoom.enable();
  let { pathname } = useLocation();

  return (
    <>
      <div
        className={
          title === "object"
            ? "object-minimized object-details"
            : "object-minimized object-selected"
        }
        role="button"
        onClick={minimize}
      >
        <div>{pathname === "/livetracking" ? "vehicles" : "geofences"}</div>
        <img src="/assets/Double-revarrow.svg" alt="doublearrow" />
      </div>
    </>
  );
}
