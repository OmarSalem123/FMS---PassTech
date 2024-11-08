import React from "react";
import { useGetAllDevicesStatusQuery } from "../../../../Redux/service/Alerts/Alerts";

export default function DashboardChart() {
  const { data, isLoading, isError } = useGetAllDevicesStatusQuery();

  if (isLoading) return <>Loading...</>;

  const calculateHeight = (count) =>
    Math.max((count / data.data.totalDevices) * 100, 2);

  if (isError)
    return (
      <>
        <div className="dashboard-chart flex-between-end">
          {/* <div
            className="white chart"
            style={{
              height: (data.data.noData / data.data.totalDevices) * 100,
            }}
          /> */}
          <div
            className="tomato chart"
            style={{
              height: 2,
            }}
          />
          <div
            className="purple chart"
            style={{
              height: 2,
            }}
          />
          <div
            className="green chart"
            style={{
              height: 2,
            }}
          />
          <div
            className="blue chart"
            style={{
              height: 2,
            }}
          />
          <div
            className="orange chart"
            style={{
              height: 2,
            }}
          />
          <div
            className="grey chart"
            style={{
              height: 2,
            }}
          />
          <div
            className="brown chart"
            style={{
              height: 2,
            }}
          />
        </div>
      </>
    );

  return (
    <>
      {data.data && (
        <div className="dashboard-chart flex-between-end">
          {/* <div
            className="white chart"
            style={{
              height: (data.data.noData / data.data.totalDevices) * 100,
            }}
          /> */}
          <div
            className="tomato chart"
            style={{
              height: calculateHeight(data.data.offline),
            }}
          />
          <div
            className="purple chart"
            style={{
              height: calculateHeight(data.data.unknown),
            }}
          />
          <div
            className="green chart"
            style={{
              height: calculateHeight(data.data.running),
            }}
          />
          <div
            className="blue chart"
            style={{
              height: calculateHeight(data.data.online),
            }}
          />
          <div
            className="orange chart"
            style={{
              height: calculateHeight(data.data.idle),
            }}
          />
          <div
            className="grey chart"
            style={{
              height: calculateHeight(data.data.noData),
            }}
          />
          <div
            className="brown chart"
            style={{
              height: calculateHeight(data.data.stopped),
            }}
          />
        </div>
      )}
    </>
  );
}
