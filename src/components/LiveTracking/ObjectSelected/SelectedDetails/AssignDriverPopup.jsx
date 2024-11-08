import { Modal } from "react-bootstrap";

import React from "react";
import Popup from "../../../Helpers/Popup/Popup";
import Close from "../../../Helpers/CloseBtn/Close";
import PopupTitle from "../../../Helpers/Popup/PopupParts/PopupTitle";
import {
	InputDriversDropdown,
	InputDriversGroup,
} from "../../../Helpers/Input/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../../Helpers/Button/Button";
import {
	useAddPermissionMutation,
	useDeletePermissionMutation,
} from "../../../../Redux/service/Permissions/Permissions";

const AssignDriverPopup = ({
	title,
	setDriverPopup,
	driverData,
	setIsControlsPopup,
	device,
}) => {
	const handleClose = () => {
		setDriverPopup(false);
		setIsControlsPopup(false);
	};

	const [addPermission] = useAddPermissionMutation();
	const [deletePermission] = useDeletePermissionMutation();
	const formik = useFormik({
		initialValues: {
			deviceId: device?.id,
			driverId: driverData?.[0]?.id || "",
		},
		validationSchema: Yup.object({
			driverId: Yup.string().nullable(),
		}),
		onSubmit: async (val) => {
			if (driverData.length > 0) {
				const oldData = {
					deviceId: val?.deviceId,
					driverId: driverData?.[0]?.id,
				};
				await deletePermission(oldData).unwrap();
			}
			try {
				const body = {
					deviceId: val?.deviceId,
					driverId: val?.driverId,
				};
				await addPermission(body).unwrap();
				setDriverPopup(false);
				setIsControlsPopup(false);
			} catch (error) {
				console.log("Error:", error);
			}
		},
	});

	return (
		<Popup show={!!title} size="sm">
			<Modal.Header className="modal-header flex-between">
				<Modal.Title id="contained-modal-title-vcenter">
					<PopupTitle headtitle={`${title}`} />
				</Modal.Title>
				<Close
					// eslint-disable-next-line react/style-prop-object
					style="close-32 close"
					close={() => handleClose()}
					img="Close"
				/>
			</Modal.Header>
			<Modal.Body className="modal-body-scrollable">
				<form onSubmit={formik.handleSubmit}>
					<div>
						<div className="vehicle-input">
							<InputDriversDropdown
								id="driverId"
								name="driverId"
								title="Select Driver"
								type="text"
								placeholder="Driver"
								formstyle="vehicle-form"
								value={formik.values.driverId}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								errors={formik.errors.driverId}
								touched={formik.touched.driverId}
							/>
						</div>
						<div className="w-100 flex-row justify-end">
							<Button
								text="Save"
								type="submit"
								style="button fs-14 p-6-12 btn-success mt-12"
							/>
						</div>
					</div>
				</form>
			</Modal.Body>
		</Popup>
	);
};

export default AssignDriverPopup;
