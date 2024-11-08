import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import SecondHeader from "../Header/SecondHeader";
import ReportTypes from "./ReportsTypes/ReportTypes";
import { Outlet, useLocation } from "react-router-dom";
import { exportContext } from "../../context/ExportDataContext";
import { exportToExcel } from "../../utils/exportToExcel";
import { toast } from "react-toastify";

export default function Reports() {
	const { pathname } = useLocation();
	let { exportedDataHeader, exportedDataBody, fileName } =
		useContext(exportContext);
	const ExportReport = () => {
    if(exportedDataBody && exportedDataHeader && fileName){
      exportToExcel(exportedDataHeader, exportedDataBody, fileName);

    }
    else{
			toast.error("Please Show Report First", {autoClose:800});

    }

	};
	return (
		<>
			<Helmet>
				<title>Reports</title>
				<meta name="description" content="Reports" />
			</Helmet>

			<SecondHeader title="reports" type="reports" onClick={ExportReport} />

			{pathname === "/reports" ? <ReportTypes /> : <Outlet />}
		</>
	);
}
