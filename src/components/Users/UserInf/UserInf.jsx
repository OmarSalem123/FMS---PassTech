import React from "react";
import PopupBodyItem from "../../Helpers/Popup/PopupParts/PopupBodyItem";
import { formatDate } from "../../../JsHelpers/DateFormat";

export default function UserInf({ values = {} }) {
	const getValue = (value, defaultValue = "-----") =>
		value ? value : defaultValue;
	const dreadonly = (value) =>
		value === true ? (
			<img src="/assets/Right.svg" alt="on" />
		) : (
			<img src="/assets/Wrong.svg" alt="off" />
		);
	const {
		name = "",
		email = "",
		phone = "",
		attributes: {
			speedUnit = "",
			volumeUnit = "",
			altitudeUnit = "",
			distanceUnit = "",
		} = {},
		latitude = "",
		longitude = "",
		expirationTime = "",
		deviceLimit = "",
		userLimit = "",
		deviceReadonly = "",
		readonly = "",
	} = values;
	console.log("Parent", values);
	const formattedExpirationDate = expirationTime
		? formatDate(expirationTime).formattedDate
		: "-----";
	return (
		<div>
			<p className="fs-16 fw-700 brand-700 text-uppercase">User Details</p>
			<div className="row">
				<div className="col-lg-6">
					<div className="display-border">
						<PopupBodyItem title="Name" item={getValue(name)} />
						<PopupBodyItem title="Phone" item={getValue(phone)} />
						<PopupBodyItem title="Latitude" item={getValue(latitude)} />

						<PopupBodyItem title="Device Limit" item={getValue(deviceLimit)} />

						<PopupBodyItem
							title="Device Readonly"
							item={dreadonly(deviceReadonly)}
						/>
						<PopupBodyItem title="Speed Unit" item={getValue(speedUnit)} />
						<PopupBodyItem
							title="Altitude Unit"
							item={getValue(altitudeUnit)}
						/>
					</div>
				</div>
				<div className="col-lg-6">
					<div className="display-border">
						<PopupBodyItem title="Email" item={getValue(email)} />
						<PopupBodyItem title="Longitude" item={getValue(longitude)} />
						<PopupBodyItem title="User Limit" item={getValue(userLimit)} />
						<PopupBodyItem title="Read Only" item={dreadonly(readonly)} />
						<PopupBodyItem title="Volume Unit" item={getValue(volumeUnit)} />
						<PopupBodyItem
							title="Distance Unit"
							item={getValue(distanceUnit)}
						/>
						<PopupBodyItem
							title="Expiration Time"
							item={getValue(formattedExpirationDate)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
