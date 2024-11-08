/* eslint-disable no-useless-concat */
/* eslint-disable react/style-prop-object */
import React, { useContext, useEffect, useState } from "react";
import TableRow from "../../Helpers/Table/TableRow";
import { formatDate } from "../../../JsHelpers/DateFormat";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { exportContext } from "../../../context/ExportDataContext";

export default function ReportSheetTableBody({ data, Loading, isShown }) {
	const [geoCodes, setGeoCode] = useState({});
	const { pathname } = useLocation();
	let { setExportedDataBody, setFileName } = useContext(exportContext);

	const fetchGeoCodePosition = async (lat, lon, id) => {
		try {
			const response = await axios.get(
				`https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`
			);
			setGeoCode((prev) => ({
				...prev,
				[id]: response.data.display_name,
			}));
		} catch (error) {
			console.error("Error fetching geocode position:", error);
			throw error;
		}
	};
	const fetchMultipleGeoCodePosition = async (lat, lon, id, type) => {
		try {
			const response = await axios.get(
				`https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`
			);

			setGeoCode((prev) => ({
				...prev,
				[id]: {
					...prev[id],
					[type]: response.data.display_name,
				},
			}));
		} catch (error) {
			toast.error("Error fetching geocode position:", error);
			throw error;
		}
	};

	const truncateItem = (text) => {
		const maxLength = 15;
		return text?.length > maxLength
			? text.substring(0, maxLength) + "..."
			: text;
	};
	function convertMillisecondsToTime(ms) {
		const totalMinutes = Math.floor(ms / 60000); // Convert ms to minutes
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;

		return `${hours}h ${minutes}m`;
	}

	const getShortPath = () => {
		return pathname.split("/").pop(); // "vehicletracking"
	};
	function knotsToKmPerHour(knots) {
		return knots * 1.852;
	}
	useEffect(() => {
		let formattedData = [];

		// Format data based on the current report type
		switch (getShortPath()) {
			case "vehiclestrips":
				formattedData = data?.map((i) => [
					i.deviceName,
					i.startDate,
					i.endDate,
					knotsToKmPerHour(i.maxSpeed).toFixed(1) + " " + "Km/h",
					knotsToKmPerHour(i.averageSpeed).toFixed(1) + " " + "Km/h",
					convertMillisecondsToTime(i.engineHours),
					(i.startOdometer / 1000).toFixed(1) + " " + "Km",
					(i.endOdometer / 1000).toFixed(1) + " " + "Km",
					(i.distance / 1000).toFixed(1) + " " + "Km",
					convertMillisecondsToTime(i.duration),
				]);
				break;

			case "speed":
				formattedData = data?.map((i) => [
					i.deviceName,
					i.startDate,
					i.endDate,
					knotsToKmPerHour(i.maxSpeed).toFixed(1) + " " + "Km/h",
					knotsToKmPerHour(i.averageSpeed).toFixed(1) + " " + "Km/h",
					convertMillisecondsToTime(i.engineHours),
				]);
				break;

			case "alarm":
				formattedData = data?.map((i) => [i.eventTime, i.type, i.Data]);
				break;

			case "stop":
				formattedData = data?.map((i) => [
					i.deviceName,
					i.startDate,
					i.endDate,
					convertMillisecondsToTime(i.duration),
					(i.endOdometer / 1000).toFixed(1) + " " + "Km",
				]);
				break;

			case "distance":
				formattedData = data?.map((i) => [
					i.deviceName,
					i.endDate,
					i.endDate,
					(i.distance / 1000).toFixed(1) + " " + "Km",
					(i.startOdometer / 1000).toFixed(1) + " " + "Km",
					(i.endOdometer / 1000).toFixed(1) + " " + "Km",
				]);
				break;

			case "route":
				formattedData = data?.map((i) => [
					i.deviceName,
					formatDate(i?.fixTime).formattedDate +
						" " +
						formatDate(i?.fixTime).formattedTime,
					i.speed.toFixed(2) + " " + "Km/h",
					i.attributes.totalDistance.toFixed(1) + " " + "Km",
					i.attributes.distance.toFixed(1) + " " + "Km",
					i.attributes.ignition ? "ON" : "OFF",
					i.attributes.odometer / 1000 + " " + "Km",
					i.attributes.event,
					i.attributes.power,
					i.attributes.battery,
				]);
				break;

			case "fuel":
				formattedData = data?.map((i) => [
					i.deviceName,
					i.spentFuel,
					convertMillisecondsToTime(i.engineHours),
					(i.distance / 1000).toFixed(2) + " " + "Km",
				]);
				break;

			case "odometer":
				formattedData = data?.map((i) => [
					i.deviceName,
					(i.endOdometer / 1000).toFixed(1) + " " + "Km",
				]);
				break;

			default:
				formattedData = [];
		}

		// Now set the formatted data for export
		
		setExportedDataBody(formattedData);
		setFileName(`${getShortPath()}.xlsx`);
	}, [data, setExportedDataBody, getShortPath()]);
	return (
		<>
			{data?.map((i, indx) => {
				const { formattedDate, formattedTime } = formatDate(i?.fixTime);
				const { formattedDate: startDate, formattedTime: startTime } =
					formatDate(i.startTime);

				const { formattedDate: endDate, formattedTime: endTime } = formatDate(
					i.endTime
				);

				return (
					<div key={indx} className="table-row">
						{getShortPath() === "vehiclestrips" && (
							<>
								<TableRow value={i.deviceName} style="ps-0 text-primary" />
								<TableRow value={startDate + " " + startTime} />
								<TableRow
									style="cursor text-primary"
									value={
										geoCodes[indx]?.start
											? truncateItem(geoCodes[indx]?.start)
											: "Get current address"
									}
									title={geoCodes[indx]?.start}
									onClick={() =>
										fetchMultipleGeoCodePosition(
											i.startLat,
											i.startLon,
											indx,
											"start"
										)
									}
								/>
								<TableRow
									value={(i.startOdometer / 1000).toFixed(1) + " " + "Km"}
								/>
								<TableRow value={endDate + " " + endTime} />
								<TableRow
									style="cursor text-primary"
									value={
										geoCodes[indx]?.end
											? truncateItem(geoCodes[indx]?.end)
											: "Get current address"
									}
									title={geoCodes[indx]?.end}
									onClick={() =>
										fetchMultipleGeoCodePosition(
											i.endLat,
											i.endLon,
											indx,
											"end"
										)
									}
								/>
								<TableRow
									value={(i.endOdometer / 1000).toFixed(1) + " " + "Km"}
								/>
								<TableRow
									value={
										knotsToKmPerHour(i.averageSpeed).toFixed(2) + " " + "Km/h"
									}
								/>
								<TableRow value={(i.distance / 1000).toFixed(1) + " " + "Km"} />
								<TableRow value={convertMillisecondsToTime(i.duration)} />
							</>
						)}
						{getShortPath() === "speed" && (
							<>
								<TableRow value={i.deviceName} style="ps-0 text-primary" />
								<TableRow value={startDate + " " + startTime} />
								<TableRow value={endDate + " " + endTime} />
								<TableRow
									value={knotsToKmPerHour(i.maxSpeed).toFixed(1) + " " + "Km/h"}
								/>
								<TableRow
									value={
										knotsToKmPerHour(i.averageSpeed).toFixed(1) + " " + "Km/h"
									}
								/>
								<TableRow value={convertMillisecondsToTime(i.engineHours)} />
							</>
						)}
						{getShortPath() === "alarm" && (
							<>
								<TableRow value={i.eventTime} />
								<TableRow value={i.type} />
								<TableRow value={i.Data} />
							</>
						)}
						{getShortPath() === "stop" && (
							<>
								<TableRow value={i.deviceName} style="ps-0 text-primary" />
								<TableRow value={startDate + " " + startTime} />
								<TableRow value={endDate + " " + endTime} />
								<TableRow value={convertMillisecondsToTime(i.duration)} />
								<TableRow
									value={(i.endOdometer / 1000).toFixed(1) + " " + "Km"}
								/>
								<TableRow
									value={
										geoCodes[indx]
											? truncateItem(geoCodes[indx])
											: "Get current address"
									}
									title={geoCodes[indx]}
									onClick={() =>
										fetchGeoCodePosition(i.latitude, i.longitude, indx)
									}
									style="cursor text-primary"
								/>
							</>
						)}
						{getShortPath() === "distance" && (
							<>
								<TableRow value={i.deviceName} style="ps-0 text-primary" />
								<TableRow value={endDate + " " + endTime} />
								<TableRow value={(i.distance / 1000).toFixed(1) + " " + "Km"} />
								<TableRow
									value={(i.startOdometer / 1000).toFixed(1) + " " + "Km"}
								/>
								<TableRow
									value={(i.endOdometer / 1000).toFixed(1) + " " + "Km"}
								/>
							</>
						)}
						{getShortPath() === "route" && (
							<>
								{/**<TableRow value={i.deviceName} style="ps-0 text-primary" />**/}
								<TableRow value={formattedDate + " " + formattedTime} />
								<TableRow
									style="cursor text-primary"
									value={
										geoCodes[indx]
											? truncateItem(geoCodes[indx])
											: "Get current address"
									}
									title={geoCodes[indx]}
									onClick={() =>
										fetchGeoCodePosition(i.latitude, i.longitude, indx)
									}
								/>
								<TableRow value={i.speed.toFixed(2) + " " + "Km/h"} />
								<TableRow
									value={i.attributes.totalDistance.toFixed(1) + " " + "Km"}
								/>
								<TableRow
									value={i.attributes.distance.toFixed(1) + " " + "Km"}
								/>
								<TableRow value={i.attributes.ignition ? "ON" : "OFF"} />
								<TableRow value={i.attributes.odometer / 1000 + " " + "Km"} />
								<TableRow value={i.attributes.event} />
								<TableRow value={i.attributes.power} />
								<TableRow value={i.attributes.battery} />
							</>
						)}
						{getShortPath() === "fuel" && (
							<>
								<TableRow value={i.deviceName} style="ps-0 text-primary" />
								<TableRow value={i.spentFuel} />
								<TableRow value={convertMillisecondsToTime(i.engineHours)} />
								<TableRow value={(i.distance / 1000).toFixed(2) + " " + "Km"} />
							</>
						)}
						{getShortPath() === "odometer" && (
							<>
								<TableRow value={i.deviceName} style="ps-0 text-primary" />
								<TableRow
									value={(i.endOdometer / 1000).toFixed(1) + " " + "KM"}
								/>
							</>
						)}
					</div>
				);
			})}
		</>
	);
}
