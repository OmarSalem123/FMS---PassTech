import React from "react";
import VehiclesTableBody from "../../Vehicles/VehiclesTableBody/VehiclesTableBody";
import DriverTableBody from "../../Drivers/DriverTableBody/DriverTableBody";
import UsersTableBody from "../../Users/UsersTableBody/UsersTableBody";
import SubUsersTableBody from "../../Users/SubUsersTableBody.jsx/SubUsersTableBody";
import IdleAlertTableBody from "../../Dashboard/DashboardParts/DashboardAlerts/AlertTableBody/IdleAlertTableBody";
import SpeedAlertTableBody from "../../Dashboard/DashboardParts/DashboardAlerts/AlertTableBody/SpeedAlertTableBody";
import SosAlertTableBody from "../../Dashboard/DashboardParts/DashboardAlerts/AlertTableBody/SosAlertTableBody";
import PowerCutAlertTableBody from "../../Dashboard/DashboardParts/DashboardAlerts/AlertTableBody/PowerCutAlertTableBody";
import GeofencesAlertTableBody from "../../Dashboard/DashboardParts/DashboardAlerts/AlertTableBody/GeofencesAlertTableBody";
import OtherAlertTableBody from "../../Dashboard/DashboardParts/DashboardAlerts/AlertTableBody/OtherAlertTableBody";
import ReportsTypesTableBody from "../../Reports/ReportsTypes/ReportsTypesTableBody/ReportsTypesTableBody";
import ReportSheetTableBody from "../../Reports/ReportSheets/ReportSheetTableBody";

export default function TableBody({
	BodyData,
	pages,
	type,
	id,
	isShown,
	sortBy,
	currentPage,
	limit,
	setTotalPages,
	sortOrder,
	query,
}) {
	return (
		<div
			className={
				type.includes("Alert")
					? "table-body-popup"
					: type === "sub-users"
					? "sub-table-body"
					: "table-body"
			}
		>
			{type === "users" && <UsersTableBody data={BodyData} type={type} />}
			{type === "sub-users" && <SubUsersTableBody data={BodyData} id={id} />}
			{type === "vehicles" && <VehiclesTableBody data={BodyData} />}
			{type === "drivers" && <DriverTableBody data={BodyData} pages={pages} />}
			{type === "reportstypes" && <ReportsTypesTableBody data={BodyData} />}
			{type === "reportsheet" && (
				<ReportSheetTableBody data={BodyData} isShown={isShown} />
			)}
			{type === "sosAlert" && (
				<SosAlertTableBody data={BodyData} pages={pages} />
			)}
			{type === "speedAlert" && (
				<SpeedAlertTableBody
					sortBy={sortBy}
					currentPage={currentPage}
					limit={limit}
					pages={pages}
					setTotalPages={setTotalPages}
					query={query}
				/>
			)}
			{type === "idleAlert" && <IdleAlertTableBody />}
			{type === "powercutAlert" && <PowerCutAlertTableBody />}
			{type === "geofencesAlert" && (
				<GeofencesAlertTableBody
					sortBy={sortBy}
					sortOrder={sortOrder}
					currentPage={currentPage}
					limit={limit}
					pages={pages}
					setTotalPages={setTotalPages}
					query={query}
				/>
			)}
			{type === "otherAlert" && (
				<OtherAlertTableBody
					sortBy={sortBy}
					currentPage={currentPage}
					limit={limit}
					pages={pages}
					setTotalPages={setTotalPages}
					query={query}
				/>
			)}
		</div>
	);
}
