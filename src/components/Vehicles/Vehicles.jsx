import React, { useContext, useEffect, useState } from "react";
import SecondHeader from "../Header/SecondHeader";
import VehicleHead from "./VehiclesParts/VehicleHead";
import { popupcontext } from "../../context/Popupscontext";
import { Helmet } from "react-helmet";
import Pagination from "../Helpers/Pagination/Pagination";
import Table from "../Helpers/Table/Table";
import Loader from "../Helpers/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addVehicles } from "../../Redux/service/Vehicles/VehiclesSlice";
import { filtrationcontext } from "../../context/Filtercontext";
import { useGetAllCustomVehiclesQuery } from "../../Redux/service/Vehicles/CustomVehicles";
import { VehicleForm } from "./VehicleForm/VehicleForm";

export default function Vehicles() {
	const { handleShow, setEdited } = useContext(popupcontext);
	const { limit, setLimit, totalPages } = useContext(filtrationcontext);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const HeadField = [
		"Name",
		"Plate Number",
		"Status",
		"IMEI",
		"Last update",
		"Condition",
		"Parent",
		"Actions",
	];
	const [currentPage, setCurrentPage] = useState(
		Number(sessionStorage.getItem("page")) || 1
	);

	const {
		data: vehiclesData,
		isLoading,
		refetch,
	} = useGetAllCustomVehiclesQuery(
		{ page: currentPage, limit: limit },
		{
			skip: !currentPage || !limit,
		}
	);

	useEffect(() => {
		setLimit(10);
	}, [setLimit]);

	useEffect(() => {
		return () => {
			sessionStorage.setItem("page", 1);
		};
	}, []);
	useEffect(() => {
		if (vehiclesData) {
			dispatch(addVehicles(vehiclesData.vehicles));
			if (vehiclesData.vehicles.length === 0 && currentPage > 1) {
				setCurrentPage(currentPage - 1);
			}
		}
		setLoading(false);
	}, [vehiclesData, dispatch, currentPage, refetch]);

	useEffect(() => {
		sessionStorage.setItem("page", currentPage);
	}, [currentPage]);

	const handlePageClick = (data) => {
		const selectedPage = data.selected + 1;
		setCurrentPage(selectedPage);
	};

	const handleSuccess = (newVehicle) => {
		if (vehiclesData) {
			const updatedVehicles = [newVehicle, ...vehiclesData.vehicles].slice(
				0,
				limit
			);
			dispatch(addVehicles(updatedVehicles));
			setLoading(true);
			refetch();
		}
	};

	const handleEdit = (updatedVehicle) => {
		if (vehiclesData) {
			dispatch(
				addVehicles(
					vehiclesData.vehicles.map((vehicle) =>
						vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
					)
				)
			);
			setEdited(true);
			refetch();
		}
	};
	const inf = useSelector((state) => state.users.user);
	return (
		<>
			<Helmet>
				<title>Vehicles</title>
				<meta name="description" content="Vehicles" />
			</Helmet>
			{(inf.administrator === true ||
				(inf.administrator === false &&
					(inf.deviceLimit > 0 || inf.deviceLimit === -1))) && (
				<>
					<SecondHeader
						title="Vehicles"
						add="Add new vehicle"
						onClick={() => handleShow("addForm")}
					/>
				</>
			)}

			<VehicleHead />
			{isLoading || loading ? (
				<>
					<div className="loader-container loader-table">
						<Loader />
					</div>
				</>
			) : (
				<>
					<Table
						HeadField={HeadField}
						BodyData={vehiclesData?.vehicles}
						type="vehicles"
					/>
					<Pagination
						handlePageClick={handlePageClick}
						pageCount={
							totalPages
								? Math.ceil(totalPages / limit)
								: Math.ceil(vehiclesData.totalPages)
						}
					/>
				</>
			)}
			<VehicleForm onSuccess={handleSuccess} onEdit={handleEdit} />
		</>
	);
}
