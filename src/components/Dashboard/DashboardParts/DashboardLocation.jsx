import React from "react";
import DashboardLeafMap from "./DashboardMap/DashboardMapLeaf";

export default function DashboardLocation() {
  return (
    <>
      <div className="dashboard-location bg-white-rounded h-100">
        <p className="fs-16 fw-600 neutral-500">Fleet Location</p>
        <DashboardLeafMap />
      </div>
    </>
  );
}
