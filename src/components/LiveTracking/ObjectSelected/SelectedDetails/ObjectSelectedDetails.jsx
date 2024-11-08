import React, { useContext, useEffect, useState } from "react";
import ObjectSelectedRows from "../SelectedBody/ObjectSelectedRows";
import { useGetAllUsersQuery } from "../../../../Redux/service/Users/Users";
import AssignDriverPopup from "./AssignDriverPopup";
import { popupcontext } from "../../../../context/Popupscontext";
import { useGetDriversByDeviceQuery } from "../../../../Redux/service/DriversTraccar/DriversTraccar";

export default function ObjectSelectedDetails({ details, device }) {
	const { data } = useGetAllUsersQuery();
	const { setIsControlsPopup } = useContext(popupcontext);
	const [driverPopup, setDriverPopup] = useState(false);
	const { data: driverData, refetch } = useGetDriversByDeviceQuery(device.id);
	const onClick = () => {
		setDriverPopup(true);
		setIsControlsPopup(true);
	};
  useEffect(() => {
    refetch();
  }, [driverPopup]);
	const selectedUser = data?.find((user) => user.id === details?.parent);
	return (
		<>
			<div className="object-selected-details">
				<div className="flex-center mb-2">
					<img src="/assets/Car.svg" alt="" />
					<div className="ms-3">
						<div className="fs-16 fw-600 neutral-700">{details?.name}</div>
						<div className="fs-14 fw-400 neutral-500">{details?.brand}</div>
					</div>
				</div>
				<ObjectSelectedRows title="car number" item={details?.plateNumber} />
				<ObjectSelectedRows title="sim number" item={details?.simNumber} />
				<ObjectSelectedRows title="device ID" item={details?.imei} />
				<ObjectSelectedRows
					title="car activity"
					item={details?.archived ? "Active" : "Archived"}
				/>

				<ObjectSelectedRows title="related user" item={selectedUser?.name} />
				<ObjectSelectedRows
					title="assigned driver"
					item={
						driverData?.[0]?.name ? (
							<div className="hover-undreline cursor" onClick={() => onClick()}>
								<img
									src={`${process.env.PUBLIC_URL}/assets/Edit.svg`}
									alt="Edit"
									className="close-24"
								/>
								{driverData?.[0]?.name}
							</div>
						) : (
							<a className="text-primary cursor" onClick={() => onClick()}>
								Assign Driver
							</a>
						)
					}
				/>
			</div>
			{driverPopup && (
				<AssignDriverPopup
					title="Assign Driver"
					setDriverPopup={setDriverPopup}
					setIsControlsPopup={setIsControlsPopup}
					driverData={driverData}
					device={device}
				/>
			)}
		</>
	);
}
