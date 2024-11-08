/* eslint-disable react/style-prop-object */
import React, { useContext } from "react";
import Searchbar from "../../../Helpers/Searchbar/Searchbar";
import Button from "../../../Helpers/Button/Button";
import ReportSheetsFilter from "../ReportSheetsFilter/ReportSheetsFilter";
import { popupcontext } from "../../../../context/Popupscontext";

export default function ReportSheetsHead({
	setStartDate,
	startDate,
	setEndDate,
	endDate,
	selectedUser,
	setSelectedUser,
	setSelectedVehicles,
	setIsShown,
	isShown,
}) {
	const { handleShow } = useContext(popupcontext);
	return (
		<div className="report-sheet-head flex-between mb-3">
			<Searchbar
				style="search search-dark input-group"
				path="/assets/search.svg"
				placeholder="Search"
			/>
			<Button
				style="button fw-400 fs-16 me-2 btn-default"
				text="Filter"
				img="Filter.svg"
				onClick={() => {
					handleShow("addForm");
					setIsShown(false);
				}}
			/>
			<ReportSheetsFilter
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
		</div>
	);
}
