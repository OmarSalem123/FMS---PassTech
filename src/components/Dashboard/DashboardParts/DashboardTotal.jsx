/* eslint-disable react/style-prop-object */
import React, { useContext, useEffect, useState } from "react";
import TotalComponent from "./DashboardTotal/TotalComponent";
import { useGetAllVehiclesQuery } from "../../../Redux/service/Vehicles/Vehicles";
import { filtrationcontext } from "../../../context/Filtercontext";
import { useGetAllDriversQuery } from "../../../Redux/service/Drivers/Drivers";
import { useDispatch } from "react-redux";
import { setTotalCount } from "../../../Redux/service/Vehicles/VehiclesSlice";
import { useGetAllUsersQuery } from "../../../Redux/service/Users/Users";
 
export default function DashboardTotal() {
  const { limit } = useContext(filtrationcontext);
  const [currentPage] = useState(Number(sessionStorage.getItem("page")) || 1);
  const dispatch = useDispatch();
  const { data: vehiclesData, isLoading } = useGetAllVehiclesQuery(
    { page: currentPage, limit: limit },
    {
      skip: !currentPage || !limit,
    }
  );
  let { data: DriverData, isLoading: DriverLoading } = useGetAllDriversQuery(
    { page: currentPage, limit: limit },
    {
      skip: !currentPage || !limit,
    }
  );
  let { data: UserData } = useGetAllUsersQuery();
  useEffect(() => {
    dispatch(setTotalCount(vehiclesData?.totalCount));
  }, [dispatch, vehiclesData?.totalCount]);
  return (
    <>
      <div className="bg-white-rounded">
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <TotalComponent
            title="Total Vehicles"
            percent="+2.4% in last month"
            number={isLoading ? "Loading..." : `${vehiclesData?.totalCount}`}
            chart="Purplechart"
            status="Increase"
          />
          <div className="vertical-line vertical-line-1"></div>
          <TotalComponent
            title="Total Drivers"
            percent="+2.4% in last month"
            number={DriverLoading ? "Loading..." : `${DriverData?.totalCount}`}
            chart="Bluechart"
            status="Increase"
          />
          <div className="vertical-line vertical-line-2"></div>
          <TotalComponent
            title="Total Users"
            percent="-2.4% in last month"
            number={!UserData ? "Loading..." : `${UserData?.length}`}
            chart="Redchart"
            status="Decrease"
          />
          <div className="vertical-line vertical-line-3"></div>
          <TotalComponent
            title="Maintenance Requests"
            percent="+2.4% in last month"
            number="500"
            chart="Greenchart"
            status="Increase"
          />
        </div>
      </div>
    </>
  );
}
