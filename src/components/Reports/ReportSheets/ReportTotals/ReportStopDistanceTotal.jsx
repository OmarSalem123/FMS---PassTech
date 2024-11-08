import React from "react";
import ReportTotals from "./ReportTotals";

export default function ReportStopDistanceTotal({ data }) {
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
					title="Total Fuel Consumed"
					number={getValue(data?.totalFuelConsumption)}
				/>
			</div>
			<div className="col-lg-3 col-md-6 centered-content">
				<ReportTotals
					title="Average Engine Hours"
					number={convertMillisecondsToTime(
						getValue(data?.avgEngineHours?.toFixed(2))
					)}
				/>
			</div>
			<div className="col-lg-3 col-md-6 centered-content">
				<ReportTotals
					title="Total Duration"
					number={(convertMillisecondsToTime(getValue(data?.totalDuration)))}
				/>
			</div>
		</>
	);
}
