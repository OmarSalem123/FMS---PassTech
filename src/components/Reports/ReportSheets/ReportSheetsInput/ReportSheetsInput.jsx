import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
	Input,

	InputParentGroup,
	MultiSelect,
} from "../../../Helpers/Input/Input";
import { useGetUsersDeviceQuery } from "../../../../Redux/service/Devices";
import { useSelector } from "react-redux";

export default function ReportSheetsInput({
	setStartDate,
	setEndDate,
	selectedUser,
	setSelectedUser,
	setSelectedVehicles,
}) {
	const { pathname } = useLocation();
	const inf = useSelector((state) => state.users.user);
	const [startDate, setLocalStartDate] = useState(null);
	const [endDate, setLocalEndDate] = useState(null);
	const [maxDate, setMaxDate] = useState(null);
	const [options, setOptions] = useState([]);
	const { data } = useGetUsersDeviceQuery(selectedUser, {
		skip: !selectedUser,
	});
	useEffect(() => {
		return setSelectedUser(inf?.id);
	}, [setSelectedUser, inf]);
	useEffect(() => {
		if (data) {
			const formattedOptions = data.map((i) => ({
				value: i.id,
				label: i.name,
			}));
			setOptions(formattedOptions);
		}
	}, [data]);
	const getShortPath = () => pathname.split("/").pop();

	const handleStartDateChange = (e) => {
		const selectedStartDate = e.target.value;
		setLocalStartDate(selectedStartDate);
		setStartDate(selectedStartDate);

		// Set max date to 7 days after the selected start date
		if (getShortPath(pathname) === "route") {
			const maxAllowedDate = new Date(selectedStartDate);
			maxAllowedDate.setDate(maxAllowedDate.getDate() + 7);
			setMaxDate(maxAllowedDate.toISOString().slice(0, 16)); // Format as "YYYY-MM-DDTHH:MM"
		} else {
			setMaxDate(null);
		}
	};

	const handleEndDateChange = (e) => {
		setLocalEndDate(e.target.value);
		setEndDate(e.target.value);
	};

	const handleUserChange = (e) => {
		setSelectedUser(e.target.value);
	};

	return (
		<div className="">
			<InputParentGroup
				id="parent"
				name="parent"
				title="User"
				formstyle="user-form w-100"
				onChange={handleUserChange}
			/>
			<MultiSelect
				title="Vehicles"
				options={options}
				setSelectedVehicles={setSelectedVehicles}
			/>
			<Input
				title="From"
				type="datetime-local"
				placeholder="Select Start Date"
				formstyle="user-form w-100"
				value={startDate || ""}
				onChange={handleStartDateChange}
			/>
			<Input
				title="To"
				type="datetime-local"
				placeholder="Select End Date"
				formstyle=" w-100"
				value={endDate || ""}
				min={startDate || ""}
				max={getShortPath(pathname) === "route" ? maxDate : ""}
				disabled={!startDate}
				onChange={handleEndDateChange}
			/>
		</div>
	);
}
