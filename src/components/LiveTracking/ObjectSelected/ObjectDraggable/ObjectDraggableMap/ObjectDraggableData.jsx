/* eslint-disable react/style-prop-object */
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Close from "../../../../Helpers/CloseBtn/Close";

export default function ObjectDraggableData({ data, position, view, setview }) {
	const [geoCode, setGeoCode] = useState(false);
	const inf = useSelector((state) => state.users.user);

	const fetchGeoCodePosition = async (lat, lon) => {
		try {
			const response = await axios.get(
				`https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`
			);
			setGeoCode(
				`${response.data.address.road}, ${response.data.address.suburb}, ${response.data.address.state}, ${response.data.address.country} `
			);
			return `${response.data.address.road}, ${response.data.address.suburb}, ${response.data.address.state}, ${response.data.address.country} `;
		} catch (error) {
			console.error("Error fetching geocode position:", error);
			throw error;
		}
	};
	const truncateItem = (text) => {
		const maxLength = 15;
		return text.length > maxLength
			? text.substring(0, maxLength) + "..."
			: text;
	};
	return (
		<>
			{view ? (
				<div className="object-draggable-objects">
					<div className="object-draggable-content">
						<span>Acc : </span>
						<div>{data?.status === "online" ? "ON" : "OFF"}</div>
					</div>
					<div className="object-draggable-content">
						<span>Status : </span>
						<div>
							{position?.attributes.motion === true ? "Moving" : "Stopped"}
						</div>
					</div>
					<div className="object-draggable-content">
						<span>Speed : </span>
						<div>
							{data.status === "online" ? position.speed.toFixed(2) + ` KM` : 0}
						</div>
					</div>
					<div className="object-draggable-content">
						<span>GPS : </span>
						<div>{data?.status === "online" ? "Available" : "UnAvailable"}</div>
					</div>
					<div className="object-draggable-content">
						<span>GMS : </span>
						<div>
							{position?.accuracy
								? `${Math.round(position?.accuracy)}%`
								: "N/A"}
						</div>
					</div>
					<div className="object-draggable-content">
						<span>Address : </span>
						<div
							onClick={() => {
								const lat = position ? position.latitude : inf.latitude;
								const lon = position ? position.longitude : inf.longitude;
								fetchGeoCodePosition(lat, lon);
							}}
							className={!geoCode ? "text-primary" : ""}
							role="button"
							title={geoCode || "Get current address"}
						>
							{geoCode ? truncateItem(geoCode) : "Get current address"}
						</div>
					</div>
					<div
						className="object-draggable-objects-exit"
						onClick={() => setview(false)}
					>
						<Close img="close" style="close close-24" />
					</div>
				</div>
			) : (
				<div className="object-draggable-info" onClick={() => setview(true)}>
					<img src="/assets/info.svg" alt="Info" />
				</div>
			)}
		</>
	);
}
