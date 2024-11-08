/* eslint-disable react/style-prop-object */
import React, { useContext } from "react";
import Button from "../Button/Button";
import { popupcontext } from "../../../context/Popupscontext";

export default function OffcanvasFooter({
	addData,
	submitAttempt,
	text,
	setIsShown,
 }) {
	let { handleClose } = useContext(popupcontext);
	return (
		<>
			<div className="offcanvas-footer">
				{!text ? (
					<Button
						style="button fs-14 p-6-12 btn-success ms-3"
						text="Save"
						type="submit"
					/>
				) : (
					<Button
						style="button fs-14 p-6-12 btn-success ms-3"
						text="Show"
						type="button"
						onClick={() => {
							setIsShown(true);
							handleClose("form");
						}}
 					/>
				)}
				<Button
					style="button fs-14 p-6-12 btn-default"
					type="button"
					text="Cancel"
					onClick={() => handleClose("form")}
				/>
			</div>
			{submitAttempt && !addData.isValid ? (
				<div className="validation text-end">Please Check Required Inputs</div>
			) : (
				""
			)}
		</>
	);
}
