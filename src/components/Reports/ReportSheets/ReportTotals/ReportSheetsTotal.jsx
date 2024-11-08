import React from "react";
import { useLocation } from "react-router-dom";
import ReportTrackingSpeedTotal from "./ReportTrackingSpeedTotal";
import ReportStopDistanceTotal from "./ReportStopDistanceTotal";
import ReportFuelOdoTotal from "./ReportFuelOdoTotal";

export default function ReportSheetsTotal({ data }) {
	let { pathname } = useLocation();
	const getShortPath = () => pathname.split("/").pop();
	return (
		<div className="row">
			{(getShortPath(pathname) === "vehicletracking" ||
				getShortPath(pathname) === "speed") && (
				<ReportTrackingSpeedTotal data={data} />
			)}
			{(getShortPath(pathname) === "stop") && (
				<ReportStopDistanceTotal data={data?.summary} />
			)}
			{(getShortPath(pathname) === "fuel" ||
				getShortPath(pathname) === "odometer") && (
				<ReportFuelOdoTotal data={data?.summary} />
			)}
		</div>
	);
}
