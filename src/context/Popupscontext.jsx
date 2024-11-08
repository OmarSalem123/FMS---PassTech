import React, { useCallback } from "react";
import { createContext, useState } from "react";
export const popupcontext = createContext();
export default function PopupContext({ children }) {
	//Form
	const [form, setForm] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [edited, setEdited] = useState(false);
	const [deleted, setDeleted] = useState(false);
	const [display, setDisplay] = useState(false);
	const [remove, setRemove] = useState(false);
	const [object, setObject] = useState(false);
	const [objectbody, setObjectbody] = useState(true);
	const [objectselect, setObjectselect] = useState(false);
	const [objectdraggable, setObjectDraggable] = useState(false);
	const [objectdraggablemini, setObjectDraggableMini] = useState({
		status: false,
	});
	const [displayGeo, setDisplayGeo] = useState(false);
	const [currentVehicleId, setCurrentVehicleId] = useState(null);
	const [currentDriverId, setCurrentDriverId] = useState(null);
	const [currentUserId, setCurrentUserId] = useState(null);
	const [currentSubUserId, setSubCurrentUserId] = useState(null);
	const [currentGeofenceId, setCurrentGeofenceId] = useState(null);
	const [refetchGeofences, setRefetchGeofences] = useState(false);

	const [attachments, setAttachments] = useState([]);
	const [attachmentsId, setAttachmentsId] = useState([]);
	const [picture, setPicture] = useState(false);
	const [historyPlayback, setHistoryPlayback] = useState({
		state: false,
		Id: 0,
	});
	const [isPlaying, setIsPlaying] = useState(false);
	const [posIndex, setPosIndex] = useState(0);
	const [userPopup, setuserPopup] = useState(true);
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [options, setOptions] = useState(false);
	const [refetchTrigger, setRefetchTrigger] = useState(0);
	const [isControlsPopup, setIsControlsPopup] = useState(false);
	const handleClose = (type) => {
		if (type === "form") {
			setForm(false);
			setTimeout(() => {
				setIsEditing(false);
			}, 300);
			setCurrentDriverId(null);
			setCurrentVehicleId(null);
			setCurrentUserId(null);
		}
		if (type === "display") {
			setCurrentVehicleId(null);
			setCurrentDriverId(null);
			setCurrentUserId(null);
			setCurrentGeofenceId(null);
			setuserPopup(false);
		}
		if (type === "deleting") {
			setIsDeleting(false);
			setRemove(false);
			setCurrentDriverId(null);
			setCurrentVehicleId(null);
			setCurrentUserId(null);
			setSubCurrentUserId(null);
			setCurrentGeofenceId(null);
			setDisplayGeo(false);
		}
		if (type === "editing") {
			setCurrentDriverId(null);
			setCurrentVehicleId(null);
			setCurrentUserId(null);
			setCurrentGeofenceId(null);
			setIsEditing(false);
			setDisplayGeo(false);
		}
		if (type === "object") {
			setObjectbody(false);
		}
		if (type === "objectSelected") {
			setObject(false);
			setObjectselect(false);
			setHistoryPlayback(false);
		}
		if (type === "minimizeSelected") {
			setObjectselect(false);
		}
		if (type === "objectUsers" || type === "historyPlayBack") {
			setDisplay(false);
		}
	};
	const handleShow = (name, type, id) => {
		if (name === "addForm") setForm(true);
		if (name === "editForm") handleEditForm(type, id);
		if (name === "deleteItem") handleRemove(type, id);
		if (name === "objectUsers" || name === "historyPlayBack") setDisplay(true);
	};

	const handleEditForm = (name, id) => {
		if (name === "vehicles") {
			setCurrentVehicleId(id);
			setIsEditing(true);
			setForm(true);
		}
		if (name === "drivers") {
			setIsEditing(true);
			setForm(true);
			setCurrentDriverId(id);
		}
		if (name === "users") {
			setIsEditing(true);
			setForm(true);
			setCurrentUserId(id);
		}
		if (name === "geofences") {
			setIsEditing(true);
			setDisplayGeo(true);
			setCurrentGeofenceId(id);
		}
	};

	const handleRemove = (name, id) => {
		setIsDeleting(true);
		if (name === "vehicles") setCurrentVehicleId(id);
		if (name === "drivers") setCurrentDriverId(id);
		if (name === "users") setCurrentUserId(id);
		if (name === "subusers") setSubCurrentUserId(id);
		if (name === "geofences") setCurrentGeofenceId(id);
		setIsDeleting(true);
	};

	const handleShowObject = () => setObject(true);

	const handleShowObjectBody = () => setObjectbody(true);

	const handleShowSelected = () => setObjectselect(true);

	const handleShowGeo = () => setDisplayGeo(true);
	const handleCloseGeo = () => setDisplayGeo(false);

	const showDetails = (name, id) => {
		if (name === "vehicles") setCurrentVehicleId(id);
		if (name === "drivers") setCurrentDriverId(id);
		if (name === "users") setCurrentUserId(id);
		if (name === "subusers") setSubCurrentUserId(id);
		if (name === "geofences") setCurrentGeofenceId(id);
	};
	const triggerRefetch = () => setRefetchGeofences((prev) => !prev);
	const tryRefetch = useCallback(() => {
		setRefetchTrigger((prev) => prev + 1);
	}, []);
	return (
		<>
			<popupcontext.Provider
				value={{
					form,
					setForm,
					handleClose,
					handleShow,
					display,
					setDisplay,
					handleRemove,
					remove,
					object,
					handleShowObject,
					objectbody,
					handleShowObjectBody,
					setObjectbody,
					objectselect,
					setObjectselect,
					objectdraggable,
					setObjectDraggable,
					objectdraggablemini,
					setObjectDraggableMini,
					handleShowSelected,
					displayGeo,
					handleShowGeo,
					handleCloseGeo,
					currentVehicleId,
					setCurrentVehicleId,
					currentDriverId,
					setCurrentDriverId,
					currentUserId,
					setCurrentUserId,
					currentSubUserId,
					setSubCurrentUserId,
					currentGeofenceId,
					setCurrentGeofenceId,
					showDetails,
					setIsDeleting,
					isDeleting,
					deleted,
					setDeleted,
					isEditing,
					setIsEditing,
					edited,
					setEdited,
					handleEditForm,
					attachments,
					setAttachments,
					attachmentsId,
					setAttachmentsId,
					picture,
					setPicture,
					historyPlayback,
					setHistoryPlayback,
					isPlaying,
					setIsPlaying,
					posIndex,
					setPosIndex,
					userPopup,
					setuserPopup,
					isFullScreen,
					setIsFullScreen,
					setRefetchGeofences,
					refetchGeofences,
					triggerRefetch,
					options,
					setOptions,
					tryRefetch,
					refetchTrigger,
					isControlsPopup,
					setIsControlsPopup,
				}}
			>
				{children}
			</popupcontext.Provider>
		</>
	);
}
