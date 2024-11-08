import React, { useContext, useEffect, useRef } from "react";
import ObjectHead from "../ObjectHead/ObjectHead";
import ObjectSearch from "../ObjectSearch/ObjectSearch";
import { popupcontext } from "../../../../context/Popupscontext";
import useOutsideClick from "../../../Helpers/OutsideClick/useOutsideClick";
import ObjectTable from "../ObjectTable/ObjectTable";
import { NavLink } from "react-router-dom";

export default function ObjectDetails() {
	let {
		setObjectselect,
		historyPlayback,
		setHistoryPlayback,
		isControlsPopup,
	} = useContext(popupcontext);
	const obj = useRef(null);
	useOutsideClick(
		obj,
		() => {
			if (!isControlsPopup) {
				setObjectselect(false);
			}
		},
		"mousedown"
	);

	useEffect(() => {
		return () => setHistoryPlayback(false);
	}, [setHistoryPlayback]);
	return (
		<div ref={obj}>
			<div className="bg-white-rounded p-0 object-details">
				<ObjectHead />
				<div className="H-line"></div>
				<ObjectSearch />
				<div className="H-line"></div>
				<ObjectTable />
				{historyPlayback.state && (
					<>
						<div className="H-line"></div>
					</>
				)}
				{historyPlayback.state && (
					<NavLink to={`/historyplayback/${historyPlayback.Id}`}>
						<div className="histroy-playback">
							<div className="img-wrapper">
								<img src="/assets/HistoryPlayBack.svg" alt="historyplayback" />
							</div>
						</div>
					</NavLink>
				)}
			</div>
		</div>
	);
}
