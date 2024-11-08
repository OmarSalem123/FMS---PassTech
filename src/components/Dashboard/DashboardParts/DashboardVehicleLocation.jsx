import React from "react";
import DashboardVehicle from "./DashboardVehicle/DashboardVehicle";
import DashboardLocation from "./DashboardLocation";

export default function DashboardVehicleLocation() {
  return (
    <>
      <div className="row">
        <div className="col-xl-8 col-lg-12">
          <DashboardVehicle />
        </div>
        <div className="col-xl-4 col-lg-12">
          <DashboardLocation />
        </div>
      </div>
    </>
  );
}
