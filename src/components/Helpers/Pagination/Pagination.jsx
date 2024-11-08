import React, { useContext, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { PaginationCounter } from "../Input/Input";
import { filtrationcontext } from "../../../context/Filtercontext";

export default function Pagination({
	handlePageClick,
	pageCount,
	onClick,
	isShown,
}) {
	let { setLimit } = useContext(filtrationcontext);
	const handleCounter = (e) => {
		setLimit(e.target.value);
	};

	return (
		<>
			<div className="pagination-container ">
				<div className="pagination-counter d-flex align-items-center">
					<div className="fs-12 fw-600">Items Per Page</div>
					<PaginationCounter onChange={(e) => handleCounter(e)} />
				</div>
				<ReactPaginate
					previousLabel={"Previous"}
					nextLabel={"Next"}
					breakLabel={"..."}
					initialPage={0}
					pageCount={pageCount}
					pageRangeDisplayed={3}
					containerClassName={"pagination"}
					pageClassName={"page-item"}
					pageLinkClassName={"page-link"}
					previousClassName={"page-item"}
					previousLinkClassName={"page-link"}
					nextClassName={"page-item"}
					nextLinkClassName={"page-link"}
					breakClassName={"page-item"}
					breakLinkClassName={"page-link"}
					activeClassName={"active"}
					onPageChange={handlePageClick}
					//onClick={onClick}
				/>
			</div>
		</>
	);
}
