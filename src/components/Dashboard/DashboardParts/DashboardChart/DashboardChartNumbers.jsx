/* eslint-disable react/style-prop-object */
import React from "react";
import ChartItem from "./ChartItem/ChartItem";
import { useGetAllDevicesStatusQuery } from "../../../../Redux/service/Alerts/Alerts";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DashboardChartNumbers() {
  const { data, isLoading, isError } = useGetAllDevicesStatusQuery();

  if (isError) return (
    <>
      {" "}
      <div className="mt-24">
        <div className="row">
          <div className="col-lg-6">
            <ChartItem
              title="Running"
              number={0}
              style="green dots"
            />
            <ChartItem
              title="idle"
              number={0}
              margin="mt-16"
              style="orange dots"
            />
            <ChartItem
              title="Stopped"
              number={0}
              margin="mt-16"
              style="brown dots"
            />
            <ChartItem
              title="No data"
              number={0}
              margin="mt-16"
              style="grey dots"
            />
          </div>
          <div className="col-lg-6">
            <ChartItem
              title="Online"
              number={0}
              style="blue dots"
            />
            <ChartItem
              title="GPS not updated"
              number={0}
              margin="mt-16"
              style="purple dots"
            />
            <ChartItem
              title="Offline"
              number={0}
              margin="mt-16"
              style="tomato dots"
            />
            <ChartItem
              title="In Maintenance"
              number="NA"
              margin="mt-16"
              style="gray-300 dots"
            />
          </div>
        </div>
      </div>
    </>
  );


  return (
    <>
      <div className="mt-24">
        <div className="row">
          <div className="col-lg-6">
            <ChartItem
              title="Running"
              number={isLoading ? <Skeleton width={50} /> : data?.data.running}
              style="green dots"
            />
            <ChartItem
              title="idle"
              number={isLoading ? <Skeleton width={50} /> : data?.data.idle}
              margin="mt-16"
              style="orange dots"
            />
            <ChartItem
              title="Stopped"
              number={isLoading ? <Skeleton width={50} /> : data?.data.stopped}
              margin="mt-16"
              style="brown dots"
            />
            <ChartItem
              title="No data"
              number={isLoading ? <Skeleton width={50} /> : data?.data.noData}
              margin="mt-16"
              style="grey dots"
            />
          </div>
          <div className="col-lg-6">
            <ChartItem
              title="Online"
              number={isLoading ? <Skeleton width={50} /> : data?.data.online}
              style="blue dots"
            />
            <ChartItem
              title="GPS not updated"
              number={isLoading ? <Skeleton width={50} /> : data?.data.unknown}
              margin="mt-16"
              style="purple dots"
            />
            <ChartItem
              title="Offline"
              number={isLoading ? <Skeleton width={50} /> : data?.data.offline}
              margin="mt-16"
              style="tomato dots"
            />
            <ChartItem
              title="In Maintenance"
              number="NA"
              margin="mt-16"
              style="gray-300 dots"
            />
          </div>
        </div>
      </div>
    </>
  );
}
