/* eslint-disable no-useless-concat */
import React from "react";
import ReportTotals from "./ReportTotals";

export default function ReportTrackingSpeedTotal({ data }) {
	function getValue(value) {
		return value !== undefined && value !== null && !isNaN(value)
			? value
			: "----";
	}
	function knotsToKmPerHour(knots) {
		return knots * 1.852;
	}
	return (
		<>
			<div className="col-lg-3 col-md-6 centered-content">
				<ReportTotals
					title="Total Vehicles Tracked"
					number={getValue(data?.selectedDevices)}
				/>
			</div>
			<div className="col-lg-3 col-md-6 centered-content">
				<ReportTotals
					title="Max Speed"
					number={
						getValue(knotsToKmPerHour(data?.highestMaxSpeed)) + " " + "Km/h"
					}
				/>
			</div>
			<div className="col-lg-3 col-md-6 centered-content">
				<ReportTotals
					title="Total Distance"
					number={
						getValue((data?.totalDistance / 1000).toFixed(2)) + " " + "Km"
					}
				/>
			</div>
			<div className="col-lg-3 col-md-6 centered-content">
				<ReportTotals
					title="Total Fuel Consumed"
					number={getValue(data?.totalSpentFuel)}
				/>
			</div>
		</>
	);
}
