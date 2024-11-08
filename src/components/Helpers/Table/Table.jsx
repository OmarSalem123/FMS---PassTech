/* eslint-disable react/style-prop-object */
import React, { useState } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Loader from "../Loader/Loader";

export default function Table({
	HeadField,
	BodyData,
	id,
	children,
	pages,
	type,
	styletable,
	styletableparent,
	Loading,
	isShown,
	currentPage,
  limit,
  setTotalPages,
  query,
}) {
	const [sortBy, setSortBy] = useState("deviceName");
	const [sortOrder, setSortOrder] = useState("asc");
  
	const handleSortChange = (columnName, order) => {
	  setSortBy(columnName);
	  setSortOrder(order);
	};
  
	return (
		<>
			<div
				className={`bg-white-rounded-top mt-3 table-parent ${styletableparent}`}
			>
				<div className={`table ${styletable}`}>
					<TableHead
						HeadField={HeadField}
						sortBy={sortBy}
						sortOrder={sortOrder}
						setSortBy={handleSortChange}
						style="p-16"
					/>
					{!Loading ? (
						<TableBody
							BodyData={BodyData}
							pages={pages}
							type={type}
							id={id}
							isShown={isShown}
							sortBy={sortBy}
							sortOrder={sortOrder}
							currentPage={currentPage}
							limit={limit}
							setTotalPages={setTotalPages}
							query={query}
						/>
					) : (
						<div className="loader-container loader-table">
							<Loader />
						</div>
					)}
					{children}
				</div>
			</div>
		</>
	);
}
