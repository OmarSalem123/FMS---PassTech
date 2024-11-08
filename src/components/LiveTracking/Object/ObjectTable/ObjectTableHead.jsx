import React from "react";
import { useLocation } from "react-router-dom";

export default function ObjectTableHead() {
  let { pathname } = useLocation();

  return (
    <>
      <div className="object-table">
        <div className="table-checkbox">
          <input type="checkbox" name="" id="" />
        </div>
        {pathname === "/livetracking" ? (
          <>
            <div className="fs-14 fw-600 object-table-element">
              Vehicle Name
            </div>
            <div className="fs-14 fw-600 object-table-element">Speed</div>
            <div className="fs-14 fw-600 object-table-element">Last Update</div>
            <div className="fs-14 fw-600 object-table-element">Status</div>
            <div className="fs-14 fw-600 object-table-element">Actions</div>

          </>
        ) : (
          <>
            <div className="fs-14 fw-600 object-table-element">
              Geofence Name
            </div>
            <div className="fs-14 fw-600 object-table-element">Actions</div>
          </>
        )}
      </div>
    </>
  );
}
