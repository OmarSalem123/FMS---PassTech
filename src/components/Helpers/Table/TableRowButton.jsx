import React from "react";

export default function TableRowButton({
	style,
	valuestyle,
	children,
	onClick,
}) {
	return (
		<div className={`fs-14 fw-400 table-element d-flex ${style}`}>
			<div className={`${valuestyle}`} onClick={onClick}>
				{children}
			</div>
		</div>
	);
}
