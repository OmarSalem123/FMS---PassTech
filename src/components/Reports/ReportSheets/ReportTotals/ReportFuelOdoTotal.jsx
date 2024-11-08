import React from "react";
import ReportTotals from "./ReportTotals";

export default function ReportFuelOdoTotal({ data }) {
	function getValue(value) {
		return value !== undefined && value !== null && !isNaN(value)
			? value
			: "----";
	}
	function convertMillisecondsToTime(ms) {
		if (!ms) return "----";
		const totalMinutes = Math.floor(ms / 60000);
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;

		return `${hours}h ${minutes}m`;
	}
	return (
		<>
			<div className="col-lg-3 col-md-6 centered-content">
				<ReportTotals
					title="Total Vehicles Tracked"
					number={getValue(data?.totalVehicles)}
				/>
			</div>
			<div className="col-lg-3 col-md-6 centered-content">
				<ReportTotals
					title="Total Odometers"
					// eslint-disable-next-line no-useless-concat
					number={getValue((data?.totalOdometers / 1000)).toFixed(1) + " " + "Km"}
				/>
			</div>
			<div className="col-lg-3 col-md-6 centered-content">
				<ReportTotals
					title="Total Engine Hours"
					number={convertMillisecondsToTime(getValue(data?.totalEngineHours))}
				/>
			</div>
			<div className="col-lg-3 col-md-6 centered-content">
				<ReportTotals
					title="Total Spent Fuel"
					number={getValue(data?.totalSpentFuel)}
				/>
			</div>
		</>
	);
}
