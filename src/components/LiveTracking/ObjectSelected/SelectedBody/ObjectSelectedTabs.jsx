import React, { useState } from "react";
import ObjectSelectedDetails from "../SelectedDetails/ObjectSelectedDetails";
import ObjectSelectedStatus from "../SelectedStatus/ObjectSelectedStatus";
import ObjectSelectedSensors from "../SelectedSensors/ObjectSelectedSensors";
import ObjectSelectedControls from "../SelectedControls/ObjectSelectedControls";
import ObjectSelectedCamera from "../SelectedCamera/ObjectSelectedCamera";

export default function ObjectSelectedTabs({
	title,
	img,
	values,
	device,
	position,
	CarSensors,
}) {
	const [openDropdown, setOpenDropdown] = useState(null);

	const toggleDropdown = (name) => {
		setOpenDropdown(openDropdown === name ? null : name);
	};

	return (
		<>
			<div className="object-body-title" onClick={() => toggleDropdown(title)}>
				<div className="flex-between">
					<div className="mr-16">
						<img src={`/assets/${img}.svg`} alt="" />
					</div>
					<div className="fs-16 fw-600" role="button">
						{title}
					</div>
				</div>
				{title !== "vehicle details" && (
					<div>
						<img
							role="button"
							src={
								openDropdown === title
									? "/assets/Uparrow.svg"
									: "/assets/Downarrow.svg"
							}
							alt="arrow"
						/>
					</div>
				)}
			</div>

			{title === "vehicle details" ? (
				<div>
					<ObjectSelectedDetails device={device} details={values} />
				</div>
			) : (
				openDropdown === title && (
					<div>
						{title === "working status" && (
							<ObjectSelectedStatus
								details={values}
								device={device}
								position={position}
							/>
						)}
						{title === "sensors" && (
							<ObjectSelectedSensors
								position={position}
								CarSensors={CarSensors}
							/>
						)}
						{title === "controls" && <ObjectSelectedControls device={device} />}
						{title === "camera" && <ObjectSelectedCamera />}
					</div>
				)
			)}
		</>
	);
}
