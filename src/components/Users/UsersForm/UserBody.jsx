import React, { useContext, useEffect, useState } from "react";
import OffcanvasFooter from "../../Helpers/Offcanvasfooter/OffcanvasFooter";
import UserInfo from "./UserInfo";
import UserPreferences from "./UserPreferences";
import UserLocation from "./UserLocation";
import UserPermissions from "./UserPermissions";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import {
	useAddUserMutation,
	useEditUserMutation,
} from "../../../Redux/service/Users/Users";
import { popupcontext } from "../../../context/Popupscontext";
import Loader from "../../Helpers/Loader/Loader";
import { useAddPermissionMutation } from "../../../Redux/service/Permissions/Permissions";
import { useSelector } from "react-redux";
export default function UserBody({ onSuccess, Editvalues }) {
	let { handleClose, isEditing, currentUserId, currentSubUserId, tryRefetch } =
		useContext(popupcontext);
	const inf = useSelector((state) => state.users.user);

	const [submitAttempt, setSubmitAttempt] = useState(false);
	let [InsertUser, { isLoading: AddLoading }] = useAddUserMutation();
	let [EditUser, { isLoading: EditLoading }] = useEditUserMutation();
	let [AddPermission] = useAddPermissionMutation();
	let initialValues = {
		name: "",
		email: "",
		password: "",
		phone: null,
		attributes: {
			speedUnit: null,
			volumeUnit: null,
			altitudeUnit: null,
			distanceUnit: null,
		},
		latitude: null,
		longitude: null,
		expirationTime: null,
		deviceLimit: null,
		userLimit: null,
		parent: null,
		deviceReadonly: isEditing ? Editvalues?.deviceReadonly : false,
		readonly: isEditing ? Editvalues?.readonly : false,
	};
	const passwordValidation = (password) =>
		isEditing
			? Yup.string().nullable()
			: Yup.string().required("Password Is Required");
	let validSchema = Yup.object({
		name: Yup.string().required("Name Is Required"),
		email: Yup.string().email().required("Email Is Required"),
		password: passwordValidation()
			.min(8, "Password must be at least 8 characters long")
			.matches(/[a-z]/, "Password must contain at least one lowercase letter")
			.matches(/[A-Z]/, "Password must contain at least one uppercase letter")
			.matches(/\d/, "Password must contain at least one number")
			.matches(
				/[@$!%*?&]/,
				"Password must contain at least one special character"
			),
		latitude: Yup.number()
			.min(-90, "Latitude must be between -90 and 90")
			.max(90, "Latitude must be between -90 and 90")
			.nullable(),
		longitude: Yup.number()
			.min(-180, "Longitude must be between -180 and 180")
			.max(180, "Longitude must be between -180 and 180")
			.nullable(),
		deviceLimit: Yup.number()
			.typeError("Device Limit must be a number")
			.min(0, "Limit can't be less than 0")
			.nullable(),
		userLimit: Yup.number()
			.typeError("User Limit must be a number")
			.min(0, "Limit can't be less than 0")
			.nullable(),
	});
	const addUser = useFormik({
		initialValues,
		validationSchema: validSchema,
		onSubmit: async (val) => {
			try {
				const parentId = val.parent;
				delete val.parent;
				const userId = currentSubUserId || currentUserId;
				if (inf.administrator === false) {
					delete val.userLimit;
					delete val.deviceLimit;
					delete val.parent;
				}
				if (isEditing) {
					let EditedUser = await EditUser({ id: userId, val: val }).unwrap();
					toast.success("User Is Edited Successfully", { autoClose: 800 });
					// Call onSuccess only on success
					if (inf.administrator) {
						if (parentId) {
							await AddPermission({
								userId: parentId,
								managedUserId: EditedUser.id,
							}).unwrap();
						}
					}
					onSuccess && (await onSuccess(EditedUser));
					tryRefetch();
					handleClose("form");
				} else {
					let InsertedUser = await InsertUser(val).unwrap();
					toast.success("New User Is Added", { autoClose: 800 });
					if (inf.administrator) {
						await AddPermission({
							userId: parentId,
							managedUserId: InsertedUser.id,
						}).unwrap();
					}
					onSuccess && (await onSuccess(InsertedUser)); // Call onSuccess only on success
					tryRefetch();
					handleClose("form");
				}
			} catch (error) {
				console.log("error", error);
				toast.error(`${error?.error}`);
			}
		},
	});
	
	useEffect(() => {
		if (isEditing && Editvalues) {
			const { parent, ...valuesWithoutParent } = Editvalues;
			addUser.setValues(valuesWithoutParent);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Editvalues]);
	const handleSubmit = (e) => {
		setSubmitAttempt(true);
		addUser.handleSubmit(e);
	};

	if (AddLoading)
		return (
			<div className="loader-container">
				<Loader />
			</div>
		);
	if (EditLoading)
		return (
			<div className="loader-container">
				<Loader />
			</div>
		);
	return (
		<>
			<form onSubmit={handleSubmit}>
				<UserInfo addData={addUser} />
				<UserPreferences addData={addUser} />
				<UserLocation addData={addUser} />
				<UserPermissions addData={addUser} />
				<OffcanvasFooter addData={addUser} submitAttempt={submitAttempt} />
			</form>
		</>
	);
}
