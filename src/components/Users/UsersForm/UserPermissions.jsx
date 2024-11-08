import React from "react";
import {
	Input,
	InputParentGroup,
	UsersSwitch,
} from "../../Helpers/Input/Input";
import { useSelector } from "react-redux";

export default function UserPermissions({ addData }) {
	const inf = useSelector((state) => state.users.user);
  console.log(addData)
	return (
		<div className="userinfo mb-24">
			<p className="fs-16 fw-700 brand-700 text-uppercase">user permissions</p>
			<div className="flex-between">
				<UsersSwitch
					formstyle="user-form"
					onBlur={addData.handleBlur}
					onChange={addData.handleChange}
					value={addData.values}
				/>
			</div>
			<div className="flex-between">
				<Input
					title="Expiration date"
					type="date"
					formstyle="user-form"
					id="expirationTime"
					name="expirationTime"
					min={new Date().toISOString().split("T")[0]}
					onBlur={addData.handleBlur}
					onChange={addData.handleChange}
					value={addData.values.expirationTime || ""}
				/>
				{inf.administrator && (
					<Input
						title="Device Limit"
						type="text"
						formstyle="user-form"
						id="deviceLimit"
						name="deviceLimit"
						placeholder="Ex. 5"
						onBlur={addData.handleBlur}
						onChange={addData.handleChange}
						value={addData.values.deviceLimit || ""}
						errors={addData.errors.deviceLimit}
						touched={addData.touched.deviceLimit}
						disabled={
							addData.values.deviceReadonly || addData.values.readonly
								? true
								: false
						}
					/>
				)}
			</div>
			{inf.administrator && (
				<div className="flex-between">
					<Input
						title="User Limit"
						type="text"
						formstyle="user-form"
						id="userLimit"
						name="userLimit"
						placeholder="Ex. 3"
						onBlur={addData.handleBlur}
						onChange={addData.handleChange}
						value={addData.values.userLimit || ""}
						errors={addData.errors.userLimit}
						touched={addData.touched.userLimit}
						disabled={addData.values.readonly ? true : false}
					/>
					<InputParentGroup
						id="parent"
						name="parent"
						title="User related to"
						formstyle="user-form"
						onBlur={addData.handleBlur}
						onChange={addData.handleChange}
						errors={addData.errors.parent}
						touched={addData.touched.parent}
						value={addData.values.parent || ""}
					/>
				</div>
			)}
		</div>
	);
}
