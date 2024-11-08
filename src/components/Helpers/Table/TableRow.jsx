import React, { useContext } from "react";
import {
	SubUsersPopup,
} from "../../Users/UsersPopUp/SubUsersPopup";
import { popupcontext } from "../../../context/Popupscontext";

export default function TableRow({ value, style, valuestyle, view, title  , onClick}) {
	let {
		currentUserId,
		setCurrentUserId,
		isEditing,
		isDeleting,
		userPopup,
		setuserPopup,
    
	} = useContext(popupcontext);
	const handleView = (id) => {
		if (view.type === "users") {
			setCurrentUserId(id);
			setuserPopup(false);
		}
	};
	return (
		<div
			className={`fs-14 fw-400 d-flex ${style} table-element`}
			title={title}
			onClick={onClick}
		>
			<div className={`${valuestyle}`}>{value}</div>
			{view && view.status && (
				<div
					className="text-primary ms-4"
					onClick={() => handleView(view.id)}
					role="button"
				>
					view
				</div>
			)}
			{view &&
				view.type === "users" &&
				view.id === currentUserId &&
				isEditing === false &&
				isDeleting === false &&
				userPopup === false && (
					<SubUsersPopup UserId={currentUserId} data={view.data} id={view.id} />
				)}
		</div>
	);
}
