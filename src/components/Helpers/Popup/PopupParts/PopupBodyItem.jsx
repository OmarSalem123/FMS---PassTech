import React from "react";

export default function PopupBodyItem({ title, item, img }) {
	return (
		<>
			<div className="flex-between border-bottom popupbody-item">
				{img ? (
					<>
						<div className="fs-16 fw-400 neutral-400 text-capitalize">
							{title} sensor support
						</div>
						<div>
							<img src={`${process.env.PUBLIC_URL}/assets/${img}`} alt="" />
						</div>
					</>
				) : (
					<>
						<div className="fs-16 fw-400 neutral-400 text-capitalize">
							{title}
						</div>
						<div className="fs-14 fw-500 text-capitalize">{item}</div>
					</>
				)}
			</div>
		</>
	);
}
