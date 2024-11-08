/* eslint-disable react/style-prop-object */
import React, { useContext, useEffect, useState } from "react";
import {
	Input,
	InputDevicesGroup,
	InputParentGroup,
} from "../../Helpers/Input/Input";
import Button from "../../Helpers/Button/Button";
import { useLocation, useParams } from "react-router-dom";
import { useLazyGetHistoryPositionQuery } from "../../../Redux/service/Positions";
import { useDispatch, useSelector } from "react-redux";
import { setHistoryPositions } from "../../../Redux/service/Websocket";
import { useMap } from "react-leaflet";
import PlayBackControls from "../HistoryPlay/PlayBackControls";
import { toast } from "react-toastify";
import { popupcontext } from "../../../context/Popupscontext";

export default function PlayBackDate() {
	const inf = useSelector((state) => state.users.user);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [minDate, setMinDate] = useState(null);
	const [maxDate, setMaxDate] = useState(null);
	const [media, setMedia] = useState(false);
	const [vid, setVId] = useState();
	const [uid, setUId] = useState(inf?.id);
	const { pathname } = useLocation();
	const getShortPath = () => pathname.split("/").pop();

	const { handleShow, handleClose, setPosIndex, setHistoryPlayback } =
		useContext(popupcontext);
	let { id } = useParams();
	let [getHistPos, { data: histData, isSuccess, isError, isLoading }] =
		useLazyGetHistoryPositionQuery();
	const map = useMap();
	console.log("deviceId", vid);
	const dispatch = useDispatch();
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toISOString().replace(/:/g, "%3A");
	};

	const handleStartDateChange = (e) => {
		setMinDate(e.target.value);
		const formattedDate = formatDate(e.target.value);
		setStartDate(formattedDate);
	};

	const handleEndDateChange = (e) => {
		setMaxDate(e.target.value);
		const formattedDate = formatDate(e.target.value);
		setEndDate(formattedDate);
	};

	const handleVehicleIdChange = (e) => {
		setVId(e.target.value);
	};

	const handleUserIdChange = (e) => {
		setUId(e.target.value);
	};
	const handleFetchData = () => {
		getHistPos({ deviceId: id || vid, from: startDate, to: endDate });
		handleShow("historyPlayBack");
	};

	const handleResetData = () => {
		setMedia(false);
		setStartDate("");
		setEndDate("");
		setMinDate(null);
		setMaxDate(null);
		setPosIndex(0);
		handleClose("historyPlayBack");
		dispatch(setHistoryPositions([]));
		setHistoryPlayback({ state: false, Id: 0 });
	};
	useEffect(() => {
		if (isSuccess) {
			if (histData?.length > 0) {
				dispatch(setHistoryPositions(histData));
				setMedia(true);
				map.setView([histData[0]?.latitude, histData[0]?.longitude], 22);
			} else {
				toast.error("No data found");
			}
		} else if (isError) {
			toast.error("Error fetching data");
		}
	}, [isSuccess, isError, histData, dispatch, map]);
	console.log("Start Date", startDate);
	console.log("End Date", endDate);
	// console.log("History Data", data);
	console.log("History Data Lazy", histData);
	if (isLoading) toast.info("Data Is Loading....", { autoClose: 800 });
	return (
		<div className="history-playback-dateinput">
			{!media && (
				<>
					{getShortPath(pathname) === "historical" && (
						<>
							<InputParentGroup
								id="parent"
								name="parent"
								title="User"
								formstyle="w-100 mb-2"
								onChange={handleUserIdChange}
							/>
							<InputDevicesGroup
								title="Vehicle"
								formstyle="w-100 mb-2"
								placeholder="Select Vehicle"
								value={vid || ""}
								userID={uid}
								onChange={handleVehicleIdChange}
							/>
						</>
					)}
					<Input
						title="From"
						formstyle="w-100 mb-2"
						type="datetime-local"
						placeholder="Select Start Date"
						value={minDate || ""}
						onChange={handleStartDateChange}
					/>
					<Input
						title="To"
						formstyle="w-100 mb-2"
						type="datetime-local"
						placeholder="Select End Date"
						value={maxDate || ""}
						min={minDate ? minDate : null}
						disabled={minDate === null ? true : false}
						onChange={handleEndDateChange}
					/>
				</>
			)}
			<div className="text-center">
				{media && histData?.length > 0 && (
					<>
						<PlayBackControls maxValue={histData?.length} />
					</>
				)}
			</div>
			<div className="history-playback-footer">
				<Button
					style={
						media
							? " button fs-14 p-6-12 btn-default"
							: "button fs-14 p-6-12 btn-success ms-3"
					}
					text={media ? "Reset" : "Show"}
					type="button"
					onClick={media ? handleResetData : handleFetchData}
				/>
				{/**<Button
          style="button fs-14 p-6-12 btn-default"
          type="button"
          text="Reset"
          onClick={handleResetData}
        />**/}
			</div>
		</div>
	);
}
