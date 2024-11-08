import React from "react";
import axios from "axios";
import { webSocketManager } from "../../Sockets/WebSocketManager";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { formattedEmail } from "../Helpers/Email/Email";

export default function HeaderDropdown() {
	let navigate = useNavigate();
	let inf = useSelector((state) => state.users.user);
	const handleLogout = async () => {
		await axios.delete("https://test.passenger-mea.com/api/session", {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
			},
		});
		webSocketManager.disconnect();
		sessionStorage.setItem("token", "");
		window.location.reload();
		navigate("/signin");
	};

	return (
		<div className="header-dropdown">
			<div className="header-dropdown-inf">
				<img
					src={`${process.env.PUBLIC_URL}/assets/Mini-Logo.svg`}
					alt="logo"
				/>
				<div>
					<div className="header-dropdown-inf-name">{inf.name}</div>
					<div className="header-dropdown-inf-email">
						{formattedEmail(inf.email)}
					</div>
				</div>
			</div>
			<div className="H-line"></div>
			<div className="header-dropdown-options">
				<div>my profile</div>
			</div>
			<div className="H-line"></div>
			<div className="header-dropdown-options">
				<div>account settings</div>
				<div onClick={() => handleLogout()}>sign out</div>
			</div>
		</div>
	);
}
