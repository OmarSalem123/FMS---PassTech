/* eslint-disable react/style-prop-object */
import React from "react";
import Button from "../Helpers/Button/Button";
import { useLocation } from "react-router-dom";

export default function SecondHeader({ title, add, onClick, type }) {
	const { pathname } = useLocation();
	console.log(pathname);
	const isReportsPage = /^\/reports\/.+/.test(pathname);
	const getShortPath = () => pathname.split("/").pop();

	return (
		<>
			<div className="bg-white p-16 border-bottom">
				<div className="flex-between">
					{type !== "reports" && (
						<div className="fs-24 fw-600 text-capitalize">{title}</div>
					)}
					{type === "reports" &&
						isReportsPage &&(
							<div className="fs-24 fw-600 text-capitalize d-flex align-items-center">
								<div> {title} </div>
                <img src="/assets/rightarrow.svg" alt="arrow" className="mx-2"/>
								<div>{getShortPath(pathname)}</div>
							</div>
						)}
					{type !== "reports" && (
						<div className="flex-between">
							<Button
								style="button p-4-10 btn-default me-2"
								text="Upload File"
								img="Upload.svg"
							/>
							<Button
								style="button p-4-10 btn-success me-2"
								text={add}
								onClick={onClick}
							/>
						</div>
					)}
					{type === "reports" && isReportsPage && (
						<div className="flex-between">
							<Button
								style="button p-4-10 btn-default me-2"
								text="Print"
								img="Printer.svg"
							/>
							<Button
								style="button p-4-10 btn-success me-2"
								text="Export Report"
								onClick={onClick}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
