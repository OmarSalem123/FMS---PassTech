import React, { useEffect, useState } from "react";
import { useListAllDriversQuery } from "../../../Redux/service/Drivers/Drivers";
import { useGetAllUsersQuery } from "../../../Redux/service/Users/Users";
import { useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useGetUsersDeviceQuery } from "../../../Redux/service/Devices";
import { useGetAllDriversQuery } from "../../../Redux/service/DriversTraccar/DriversTraccar";
import { useLocation } from "react-router-dom";
export function Input({
	title,
	type,
	placeholder,
	onBlur,
	onChange,
	id,
	name,
	formstyle,
	value,
	errors,
	touched,
	disabled,
	min,
	max,
}) {
	const FormError = errors && touched ? "form-error" : "";

	return (
		<>
			<div
				className={`position-relative vehicle-input ${formstyle} ${FormError}`}
			>
				<label className="form-label">{title}</label>
				<input
					className={`form-control`}
					type={type}
					placeholder={placeholder}
					onBlur={onBlur}
					onChange={onChange}
					value={value}
					id={id}
					name={name}
					disabled={disabled}
					min={min}
					max={max}
				/>
				<div>
					{errors && touched ? <div className="validation">{errors}</div> : ""}
				</div>
			</div>
		</>
	);
}

export function InputVehicleGroup({
	id,
	name,
	onChange,
	onBlur,
	errors,
	touched,
	formstyle,
	value,
}) {
	const FormError = errors && touched ? "form-error" : "";

	return (
		<>
			<div
				className={`position-relative vehicle-input ${formstyle} ${FormError} `}
			>
				<label className="form-label">Vehicle type</label>
				<select
					id={id}
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					value={value || ""}
					className="form-select"
				>
					<option value="" disabled>
						Select Vehicle Type
					</option>
					<optgroup className="input-group" label="Commercial Vehicles">
						<option value="Delivery Trucks">Delivery Trucks</option>
						<option value="Cargo Vans">Cargo Vans</option>
						<option value="Utility Trucks">Utility Trucks</option>
					</optgroup>
					<optgroup label="Passenger Vehicles">
						<option value="Sedans">Sedans</option>
						<option value="Suvs">Suvs</option>
						<option value="Vans">Vans</option>
					</optgroup>
					<optgroup label="Specialized Vehicles">
						<option value="Ambulances">Ambulances</option>
						<option value="Police Cars">Police Cars</option>
						<option value="Fire Trucks">Fire Trucks</option>
						<option value="Constructions Vehicles">
							Construction Vehicles
						</option>
					</optgroup>
					<optgroup label="Public Transportation Vehicles">
						<option value="Buses">Buses</option>
						<option value="Shuttles">Shuttles</option>
					</optgroup>
					<optgroup label="Heavy-Duty Vehicles">
						<option value="Trucks">Trucks</option>
						<option value="Trailers">Trailers</option>
					</optgroup>
					<optgroup label="Special Purpose Vehicles">
						<option value="Refrigerated Trucks">Refrigerated Trucks</option>
						<option value="Tanker Trucks">Tanker Trucks</option>
						<option value="Tow Trucks">Tow Trucks</option>
					</optgroup>
					<optgroup label="Construction Off-Road Vehicles">
						<option value="Excavators">Excavators</option>
						<option value="Bulldozers">Bulldozers</option>
						<option value="Off-Road Vehicles">Off-Road Vehicles</option>
					</optgroup>
					<optgroup label="Electric Vehicles (EVs)">
						<option value="Electric Cars">Electric Cars</option>
						<option value="Electric Trucks">Electric Trucks</option>
						<option value="Electric Vans">Electric Vans</option>
					</optgroup>
				</select>
				{errors && touched ? <div className="validation">{errors}</div> : ""}
			</div>
		</>
	);
}

export function InputCountriesGroup({
	id,
	name,
	onChange,
	onBlur,
	errors,
	touched,
	formstyle,
	value,
}) {
	const FormError = errors && touched ? "form-error" : "";

	return (
		<>
			<div
				className={`position-relative vehicle-input ${formstyle} ${FormError} `}
			>
				<label className="form-label">Manfacture country</label>
				<select
					id={id}
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					value={value || ""}
					className="form-select"
				>
					<option value="" disabled>
						Select country
					</option>
					<option value="argentina">Argentina</option>
					<option value="australia">Australia</option>
					<option value="brazil">Brazil</option>
					<option value="canada">Canada</option>
					<option value="china">China</option>
					<option value="france">France</option>
					<option value="germany">Germany</option>
					<option value="india">India</option>
					<option value="italy">Italy</option>
					<option value="japan">Japan</option>
					<option value="korea-south">South Korea</option>
					<option value="mexico">Mexico</option>
					<option value="russia">Russia</option>
					<option value="spain">Spain</option>
					<option value="taiwan">Taiwan</option>
					<option value="uk">United Kingdom</option>
					<option value="usa">USA</option>
					<option value="turkey">Turkey</option>
					<option value="belgium">Belgium</option>
					<option value="netherlands">Netherlands</option>
					<option value="portugal">Portugal</option>
					<option value="sweden">Sweden</option>
				</select>
				{errors && touched ? <div className="validation">{errors}</div> : ""}
			</div>
		</>
	);
}

export function InputFuelGroup({
	id,
	name,
	onChange,
	onBlur,
	errors,
	touched,
	formstyle,
	value,
}) {
	const FormError = errors && touched ? "form-error" : "";

	return (
		<>
			<div
				className={`position-relative vehicle-input ${formstyle} ${FormError} `}
			>
				<label className="form-label">Fuel Type</label>
				<select
					className="form-select"
					id={id}
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					value={value || ""}
				>
					<option value="" disabled>
						Select Fuel Type
					</option>
					<option value="Gas">Gas</option>
					<option value="Diesel">Diesel</option>
					<option value="Sollar">Sollar</option>
				</select>
				{errors && touched ? <div className="validation">{errors}</div> : ""}
			</div>
		</>
	);
}

export function InputParentGroup({
	title,
	id,
	name,
	onChange,
	onBlur,
	errors,
	touched,
	value,
	formstyle,
}) {
	const inf = useSelector((state) => state.users.user);
	const FormError = errors && touched ? "form-error" : "";
	const { data } = useGetAllUsersQuery();
	const selectedUser = data?.find((user) => user.id === value);

	return (
		<>
			<div
				className={`position-relative vehicle-input ${formstyle} ${FormError}`}
			>
				<label className="form-label">{title}</label>
				<select
					id={id}
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					value={value !== "" ? selectedUser?.id : ""}
					className="form-select"
				>
					<option value="" disabled>
						Select Parent
					</option>

					{inf.administrator === false ? (
						<option key={inf.id} value={inf.id}>
							{inf.name}
						</option>
					) : (
						data?.map((user) => (
							<option key={user.id} value={user.id}>
								{user.name}
							</option>
						))
					)}
				</select>
				{errors && touched ? <div className="validation">{errors}</div> : ""}
			</div>
		</>
	);
}

export function InputDevicesGroup({
	title,
	id,
	name,
	onChange,
	onBlur,
	errors,
	touched,
	value,
	formstyle,
	userID,
}) {
	//const inf = useSelector((state) => state.users.user);
	const FormError = errors && touched ? "form-error" : "";
	const { data } = useGetUsersDeviceQuery(userID, { skip: !userID });

	return (
		<>
			<div
				className={`position-relative vehicle-input ${formstyle} ${FormError}`}
			>
				<label className="form-label">{title}</label>
				<select
					id={id}
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					value={value || ""}
					className="form-select"
				>
					<option value="" disabled>
						Select Vehicle
					</option>

					{data?.map((vehicle) => (
						<option key={vehicle.id} value={vehicle.id}>
							{vehicle.name}
						</option>
					))}
				</select>
				{errors && touched ? <div className="validation">{errors}</div> : ""}
			</div>
		</>
	);
}
export function InputDriversGroup({
	id,
	name,
	onChange,
	onBlur,
	errors,
	touched,
	value,
	formstyle,
}) {
	const FormError = errors && touched ? "form-error" : "";
	const { data } = useListAllDriversQuery();
	const selectedDriver = data?.find((driver) => driver.id === value);
	console.log("Selected ", selectedDriver);
	console.log("Value ", value);
	return (
		<>
			<div
				className={`position-relative vehicle-input ${formstyle} ${FormError} `}
			>
				<label className="form-label">Driver</label>
				<select
					id={id}
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					className="form-select"
					value={value !== "" ? selectedDriver?.id : ""}
				>
					<option value="" disabled>
						Select Driver
					</option>
					{data?.map((driver) => (
						<option key={driver.id} value={driver.id}>
							{driver.name}
						</option>
					))}
				</select>
				{errors && touched ? <div className="validation">{errors}</div> : ""}
			</div>
		</>
	);
}
export function Switch({ id, name, onBlur, onChange, value }) {
	return (
		<>
			<label className={`switch`}>
				<input
					className="form-control"
					type="checkbox"
					id={id}
					name={name}
					onChange={onChange}
					onBlur={onBlur}
					value={value}
					checked={value ? true : false}
					autoFocus
				/>
				<span className="slider round"></span>
			</label>
		</>
	);
}

export function Sensors({
	title,
	vehicleInf,
	id,
	name,
	onBlur,
	onChange,
	value,
}) {
	return (
		<>
			<div className={`sensors mb-16`}>
				<div className="flex-between mb-8">
					<div className="fs-16 fw-500 neutral-500 text-capitalize">
						{vehicleInf ? `${title} support` : `${title}  sensor support`}
					</div>
					<div className="y-25">
						<Switch
							id={id}
							name={name}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
						/>
					</div>
				</div>
				<div className={vehicleInf ? "" : "H-line-2"}></div>
			</div>
		</>
	);
}

export function PaginationCounter({ onBlur, onChange, value }) {
	return (
		<div>
			<select
				className="form-select decorated"
				id="paginationcounter"
				name="paginationcounter"
				onChange={onChange}
			>
				<option value={10}>10</option>
				<option value={20}>20</option>
				<option value={30}>30</option>
				<option value={40}>40</option>
				<option value={50}>50</option>
				<option value={60}>60</option>
				<option value={70}>70</option>
				<option value={80}>80</option>
				<option value={90}>90</option>
				<option value={100}>100</option>
			</select>
		</div>
	);
}

export function InputSpeedUnit({
	id,
	name,
	onChange,
	onBlur,
	formstyle,
	value,
}) {
	return (
		<>
			<div className={`position-relative vehicle-input ${formstyle}`}>
				<label className="form-label">Speed Unit</label>
				<select
					className="form-select"
					id={id}
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					value={value || ""}
				>
					<option value="" disabled>
						Select Speed Unit
					</option>
					<option value="kn">kn</option>
					<option value="kmh">km/h</option>
					<option value="mph">mph</option>
				</select>
			</div>
		</>
	);
}

export function InputDistanceUnit({
	id,
	name,
	onChange,
	onBlur,
	formstyle,
	value,
}) {
	return (
		<>
			<div className={`position-relative vehicle-input ${formstyle}`}>
				<label className="form-label">Distance Unit</label>
				<select
					className="form-select"
					id={id}
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					value={value || ""}
				>
					<option value="" disabled>
						Select Distance Unit
					</option>
					<option value="km">km</option>
					<option value="mi">mi</option>
					<option value="nmi">nmi</option>
				</select>
			</div>
		</>
	);
}

export function InputAltitudeUnit({
	id,
	name,
	onChange,
	onBlur,
	formstyle,
	value,
}) {
	return (
		<>
			<div className={`position-relative vehicle-input ${formstyle}`}>
				<label className="form-label">Altitude Unit</label>
				<select
					className="form-select"
					id={id}
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					value={value || ""}
				>
					<option value="" disabled>
						Select Altitude Unit
					</option>
					<option value="m">m</option>
					<option value="ft">ft</option>
				</select>
			</div>
		</>
	);
}

export function InputVolumeUnit({
	id,
	name,
	onChange,
	onBlur,
	formstyle,
	value,
}) {
	return (
		<>
			<div className={`position-relative vehicle-input ${formstyle}`}>
				<label className="form-label">Volume Unit</label>
				<select
					className="form-select"
					id={id}
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					value={value || ""}
				>
					<option value="" disabled>
						Select Volume Unit
					</option>
					<option value="ltr">Liter</option>
					<option value="usGal">U.S. Gallon</option>
					<option value="impGal">IMP. Gallon</option>
				</select>
			</div>
		</>
	);
}
export function InputGeofenceStatus({
	id,
	name,
	onChange,
	onBlur,
	formstyle,
	value,
	errors,
	touched,
}) {
	const FormError = errors && touched ? "form-error" : "";
	return (
		<>
			<div
				className={`position-relative vehicle-input ${formstyle} ${FormError} `}
			>
				<label className="form-label">Geofence Status</label>
				<select
					className="form-select"
					id={id}
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					errors={errors}
					touched={touched}
					value={value || ""}
				>
					<option value="" disabled>
						Select Geofence Status
					</option>
					<option value="#2e9245">Allowed</option>
					<option value="red">Not Allowed</option>
				</select>
			</div>
			<div>
				{errors && touched ? <div className="validation">{errors}</div> : ""}
			</div>
		</>
	);
}
export function UsersSwitch({ onBlur, formstyle, onChange, value }) {
	const [selectedRole, setSelectedRole] = useState({
		deviceReadonly: false,
		readonly: false,
	});

	useEffect(() => {
		if (value) {
			setSelectedRole({
				deviceReadonly: !!value.deviceReadonly,
				readonly: !!value.readonly,
			});
		}
	}, [value]);

	const handleChange = (e) => {
		const { name, checked } = e.target;

		if (checked) {
			setSelectedRole({
				deviceReadonly: name === "deviceReadonly",
				readonly: name === "readonly",
			});
		} else {
			setSelectedRole((prev) => ({
				...prev,
				[name]: false,
			}));
		}

		if (onChange) {
			onChange({
				target: {
					name: name === "deviceReadonly" ? "readonly" : "deviceReadonly",
					value: false,
				},
			});
			onChange(e);
		}
	};

	return (
		<>
			<div className={`position-relative vehicle-input ${formstyle}`}>
				<label className="form-label">Role</label>
				<div className="d-block">
					<div className="d-flex align-content-center mb-2">
						<label className={`switch`}>
							<input
								className="form-control"
								type="checkbox"
								id="deviceReadonly"
								name="deviceReadonly"
								onChange={handleChange}
								onBlur={onBlur}
								checked={!!selectedRole.deviceReadonly}
								autoFocus
							/>
							<span className="slider round"></span>
						</label>
						<div className="switch-archive-label">Device Read Only</div>
						<img
							src={`${process.env.PUBLIC_URL}/assets/information.svg`}
							alt="info"
							title="ordinary user with a restriction on device manipulation"
						/>
					</div>
					<div className="d-flex align-content-center">
						<label className={`switch`}>
							<input
								className="form-control"
								type="checkbox"
								id="readonly"
								name="readonly"
								onChange={handleChange}
								onBlur={onBlur}
								checked={!!selectedRole.readonly}
								autoFocus
							/>
							<span className="slider round"></span>
						</label>
						<div className="switch-archive-label">Read Only</div>
						<img
							src={`${process.env.PUBLIC_URL}/assets/information.svg`}
							alt="info"
							title="a user that cannot add/edit/remove anything in the system. They can only monitor their assigned objects."
						/>
					</div>
				</div>
			</div>
		</>
	);
}
export function MultiSelect({
	options,
	defaultValue,
	errors,
	touched,
	title,
	onChange,
	setSelectedVehicles,
}) {
	const animatedComponents = makeAnimated();
	const customStyles = {
		control: (base, state) => ({
			...base,
			backgroundColor: "unset",
			borderColor: "transparent",
			boxShadow: "none",
			"&:hover": { borderColor: "transparent" },
			borderRadius: "0",
			padding: "0px",
		}),
		menu: (base) => ({
			...base,
			marginTop: "4px",
			borderRadius: "8px",
			zIndex: 100,
		}),
		valueContainer: (base) => ({
			...base,
			display: "flex",
			flexWrap: "wrap",
			overflow: "hidden",
			padding: "5px",
		}),
	};
	let { pathname } = useLocation();
	const getShortPath = () => pathname.split("/").pop();

	return (
		<>
			<div className={`select-dropdown vehicle-input flex-col w-100`}>
				<label className="form-label w-100">{title}</label>
				<Select
					className="form-control-dropdown"
					styles={customStyles}
					closeMenuOnSelect={false}
					components={animatedComponents}
					isMulti={getShortPath(pathname) !== "route"}
					defaultValue={[defaultValue]}
					options={options}
					onChange={(selectedOptions) => {
						if (getShortPath(pathname) !== "route") {
							setSelectedVehicles(selectedOptions);
						} else {
							setSelectedVehicles([selectedOptions]);
						}
					}}
				/>
				<div>
					{errors && touched ? <div className="validation">{errors}</div> : ""}
				</div>
			</div>
		</>
	);
}

export function InputDriversDropdown({
	id,
	name,
	onChange,
	onBlur,
	errors,
	touched,
	value,
	formstyle,
}) {
	const FormError = errors && touched ? "form-error" : "";
	const { data } = useGetAllDriversQuery();
	const selectedDriver = data?.find((driver) => driver.id === value);
	console.log("Selected ", selectedDriver);
	console.log("Value ", value);
	return (
		<>
			<div
				className={`position-relative vehicle-input ${formstyle} ${FormError} `}
			>
				<label className="form-label">Driver</label>
				<select
					id={id}
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					className="form-select"
					value={value || ""}
				>
					<option value="">Select Driver</option>
					{data?.map((driver) => (
						<option key={driver.id} value={driver.id}>
							{driver.name}
						</option>
					))}
				</select>
				{errors && touched ? <div className="validation">{errors}</div> : ""}
			</div>
		</>
	);
}
