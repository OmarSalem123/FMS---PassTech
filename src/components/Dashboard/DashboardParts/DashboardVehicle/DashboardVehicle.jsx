import React from "react";
import DashboardChart from "../DashboardChart/DashboardChart";
import DashboardChartNumbers from "../DashboardChart/DashboardChartNumbers";
import { useSelector } from "react-redux";

export default function DashboardVehicle() {
  let Totalvehicles = useSelector((state) => state.vehicles.totalCount);
  return (
    <>
      <div className="bg-white-rounded">
        <p className="fs-16 fw-600 neutral-500">Vehicle Status</p>
        <div className="flex-between">
          <div className="mt-3">
            <span className="fs-14 fw-500 neutral-500">
              Number of Total Vehicles
            </span>
            <p className="fs-24 fw-600 neutral-800 mt-2">{Totalvehicles ? Totalvehicles  : "Loading...."}</p>
          </div>
          <div>
            <DashboardChart />
          </div>
        </div>
        <DashboardChartNumbers />
      </div>
    </>
  );
}
