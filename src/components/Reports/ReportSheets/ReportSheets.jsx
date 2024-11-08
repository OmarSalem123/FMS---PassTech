import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
	useGetAlarmReportQuery,
	useGetDistanceReportQuery,
	useGetFuelReportQuery,
	useGetOdometerReportQuery,
	useGetSpeedReportQuery,
	useGetStopReportQuery,
	useGetVehicleRoutesQuery,
	useGetVehicleTripsQuery,
} from "../../../Redux/service/Reports/Reports";
import Table from "../../Helpers/Table/Table";
import ReportSheetsHead from "./ReportSheetsHead/ReportSheetsHead";
import ReportSheetsTotal from "./ReportTotals/ReportSheetsTotal";
import { useSelector } from "react-redux";
import Pagination from "../../Helpers/Pagination/Pagination";
import { filtrationcontext } from "../../../context/Filtercontext";
import { toast } from "react-toastify";

export default function ReportSheets() {
	const { pathname } = useLocation();
	const inf = useSelector((state) => state.users.user);
	const { limit, setLimit, totalPages } = useContext(filtrationcontext);

	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [selectedUser, setSelectedUser] = useState(inf.id);
	const [selectedVehicles, setSelectedVehicles] = useState([]);
	const [selectedids, setIds] = useState([]);
	const [isShown, setIsShown] = useState(false);
	const [reportData, setReportData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [trigger, setTrigger] = useState(0);
	let from, to;
	const [currentPage, setCurrentPage] = useState(
		Number(sessionStorage.getItem("page")) || 1
	);
	useEffect(() => {
		setLimit(10);
	}, [setLimit]);

	useEffect(() => {
		sessionStorage.setItem("page", currentPage);
	}, [currentPage]);

	useEffect(() => {
		return () => {
			sessionStorage.setItem("page", 1);
		};
	}, []);
	const isFirstRender = useRef(true);

	// Handle page click in Pagination
	const handlePageClick = (data) => {
		const selectedPage = data.selected + 1;
		setIsShown(true);
		setCurrentPage(selectedPage);
		setIsLoading(true);
	};
	const Show = () => {
		setIsShown(true);
	};
	const getShortPath = () => pathname.split("/").pop();

	if (startDate && endDate) {
		from = new Date(startDate).toISOString().replace(/:/g, "%3A");
		to = new Date(endDate).toISOString().replace(/:/g, "%3A");
	}
	// Vehicle tracking report
	const {
		data: vehicleTripReport,
		isLoading: tripLoading,
		refetch: vehicleTripRefetch,
	} = useGetVehicleTripsQuery(
		{ from, to, selectedids, page: currentPage, pageSize: limit },
		{
			skip:
				!startDate ||
				!endDate ||
				selectedids.length === 0 ||
				!isShown ||
				!currentPage ||
				!limit ||
				getShortPath() !== "vehiclestrips",
		}
	);

	// Speed report
	const {
		data: vehicleSpeedReport,
		isLoading: speedLoading,
		refetch: speedRefetch,
	} = useGetSpeedReportQuery(
		{ from, to, selectedids, page: currentPage, pageSize: limit },
		{
			skip:
				!startDate ||
				!endDate ||
				selectedids.length === 0 ||
				!isShown ||
				!currentPage ||
				!limit ||
				getShortPath() !== "speed",
		}
	);

	// Alarm report
	const {
		data: vehicleAlarmReport,
		isLoading: alarmLoading,
		refetch: alarmRefetch,
	} = useGetAlarmReportQuery(
		{ from, to, selectedids },
		{
			skip:
				!startDate ||
				!endDate ||
				selectedids.length === 0 ||
				!isShown ||
				getShortPath() !== "alarm",
		}
	);

	// Stop report
	const {
		data: vehicleStopReport,
		isLoading: stopLoading,
		refetch: stopRefetch,
	} = useGetStopReportQuery(
		{ from, to, selectedids, page: currentPage, pageSize: limit },
		{
			skip:
				!startDate ||
				!endDate ||
				selectedids.length === 0 ||
				!isShown ||
				!currentPage ||
				!limit ||
				getShortPath() !== "stop",
		}
	);

	// Distance report
	const {
		data: vehicleDistanceReport,
		isLoading: distanceLoading,
		refetch: distanceRefetch,
	} = useGetDistanceReportQuery(
		{ from, to, selectedids, page: currentPage, pageSize: limit },
		{
			skip:
				!startDate ||
				!endDate ||
				selectedids.length === 0 ||
				!isShown ||
				!currentPage ||
				!limit ||
				getShortPath() !== "distance",
		}
	);

	//Route Report
	const {
		data: vehicleRouteReport,
		isLoading: routeLoading,
		refetch: vehicleRouteRefetch,
	} = useGetVehicleRoutesQuery(
		{ from, to, selectedids, page: currentPage, pageSize: limit },
		{
			skip:
				!startDate ||
				!endDate ||
				selectedids.length === 0 ||
				!isShown ||
				!currentPage ||
				!limit ||
				getShortPath() !== "route",
		}
	);

	//Fuel Report
	const {
		data: vehicleFuelReport,
		isLoading: fuelLoading,
		refetch: vehicleFuelRefetch,
	} = useGetFuelReportQuery(
		{ from, to, selectedids, page: currentPage, pageSize: limit },
		{
			skip:
				!startDate ||
				!endDate ||
				selectedids.length === 0 ||
				!isShown ||
				!currentPage ||
				!limit ||
				getShortPath() !== "fuel",
		}
	);

	//Odometer Report
	const {
		data: vehicleOdometerReport,
		isLoading: odometerLoading,
		refetch: odometerRefetch,
	} = useGetOdometerReportQuery(
		{ from, to, selectedids, page: currentPage, pageSize: limit },
		{
			skip:
				!startDate ||
				!endDate ||
				selectedids.length === 0 ||
				!isShown ||
				!currentPage ||
				!limit ||
				getShortPath() !== "odometer",
		}
	);

	useEffect(() => {
		if (selectedVehicles) {
			const ids = selectedVehicles.map((i) => Number(i.value)).join(",");
			setIds(ids);
		}
	}, [selectedVehicles]);

	useEffect(() => {
		const fetchData = async () => {
			if (isShown) {
				setIsLoading(true); // Set loading state
				const currentPath = getShortPath();
				let fetchReport;
				try {
					switch (currentPath) {
						case "vehiclestrips":
							fetchReport = vehicleTripRefetch();
							break;
						case "speed":
							fetchReport = speedRefetch();
							break;
						case "alarm":
							fetchReport = alarmRefetch();
							break;
						case "stop":
							fetchReport = stopRefetch();
							break;
						case "distance":
							fetchReport = distanceRefetch();
							break;
						case "route":
							fetchReport = vehicleRouteRefetch();
							break;
						case "fuel":
							fetchReport = vehicleFuelRefetch();
							break;
						case "odometer":
							fetchReport = odometerRefetch();
							break;
						default:
							fetchReport = Promise.resolve({ data: [] });
					}

					if (fetchReport) {
						const { data } = await fetchReport; // Await the refetch
						setReportData(data); // Set the data in state
					}
				} catch (error) {
					toast.error("Please select at least one vehicle and date"); // Handle error with a toast
				} finally {
					setIsLoading(false); // Remove loading state
					setIsShown(false); // Reset the trigger
				}
			}
		};

		fetchData();
	}, [
		isShown,
		from,
		to,
		selectedids,
		vehicleTripRefetch,
		speedRefetch,
		alarmRefetch,
		stopRefetch,
		distanceRefetch,
		vehicleRouteRefetch,
		vehicleFuelRefetch,
		pathname,
		getShortPath,
		odometerRefetch,
		currentPage,
		trigger,
		limit,
		startDate,
		endDate,
	]);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
		} else {
			setIsShown(true);
		}
	}, [limit]);
	useEffect(() => {
		console.log("I tried to make it false");
		return () => setIsShown(false);
	}, [pathname]);
	const getHeadField = () => {
		let HeadField = [];
		switch (getShortPath()) {
			case "vehiclestrips":
				HeadField = [
					"Vehicle",
					"Start Time",
					"Start Address",
					"Odometer Start",
					"End Time",
					"End Address",
					"Odometer End",
					"AVG Speed",
					"Distance",
					"Duration",
				];
				break;
			case "speed":
				HeadField = [
					"Vehicle",
					"Start Time",
					"End Time",
					"Max Speed",
					"Average Speed",
					"Engine Hours",
				];
				break;
			case "alarm":
				HeadField = ["Fix Time", "Type", "Data"];
				break;
			case "stop":
				HeadField = [
					"Vehicle",
					"Start Time",
					"End Time",
					"Duration",
					"Odometer",
					"Address",
				];
				break;
			case "distance":
				HeadField = [
					"Vehicle",
					"Date",
					"Distance",
					"Start Odometer",
					"End Odometer",
				];
				break;
			case "route":
				HeadField = [
					"Date",
					"Address",
					"Speed",
					"Distance",
					"Total Distance",
					"Ignition",
					"Odometer",
					"Event",
					"Power",
					"Battery Level",
				];
				break;
			case "fuel":
				HeadField = ["Vehicle", "Spent Fuel", "Engine Hours", "Total Distance"];
				break;
			case "odometer":
				HeadField = ["Vehicle", "Odometer"];
				break;
			default:
				HeadField = [];
		}
		return HeadField;
	};
	console.log("Is Shown", isShown);
	return (
		<>
			<div className="report-sheets">
				<ReportSheetsHead
					startDate={startDate}
					setStartDate={setStartDate}
					endDate={endDate}
					setEndDate={setEndDate}
					selectedUser={selectedUser}
					setSelectedUser={setSelectedUser}
					setSelectedVehicles={setSelectedVehicles}
					isShown={isShown}
					setIsShown={setIsShown}
				/>

				{reportData?.length !== 0 && <ReportSheetsTotal data={reportData} />}
				<Table
					HeadField={getHeadField()}
					BodyData={reportData?.data}
					Loading={isLoading}
					type="reportsheet"
				/>
			</div>
			{reportData?.length !== 0 && (
				<Pagination
					handlePageClick={handlePageClick}
					currentPage={currentPage}
					//onClick={Show}
					pageCount={
						totalPages
							? Math.ceil(totalPages / limit)
							: Math.ceil(reportData?.totalPages)
					}
				/>
			)}
		</>
	);
}
