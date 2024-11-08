import React, { createContext, useState } from "react";
export const filtrationcontext = createContext();

export default function Filtercontext({ children }) {
	let [checked, setChecked] = useState([]);
	let [parentCheck, setParentCheck] = useState([]);
	let [childCheck, setChildCheck] = useState([]);
	const [filter, setFilter] = useState(false);
	let [filteredData, setFilteredData] = useState([]);
	let [userData, setUserData] = useState();
	let [checkValues, setcheckValues] = useState(0);
	const [searchQuery, setSearchQuery] = useState("");
	const [ObjectsearchQuery, setObjectSearchQuery] = useState("");
	const [ObjectUsersearchQuery, setObjectUserSearchQuery] = useState("");
	const [VehiclessearchQuery, setVehiclesSearchQuery] = useState("");
	const [DriverssearchQuery, setDriversSearchQuery] = useState("");
	const [UserssearchQuery, setUsersSearchQuery] = useState("");
	const [GeofencessearchQuery, setGeofencesSearchQuery] = useState("");
	const [reportTypessearchQuery, setReportTypesSearchQuery] = useState("");
	const [AlertsearchQuery, setAlertSearchQuery] = useState("");

	const [limit, setLimit] = useState(10);
	const [totalPages, setTotalPages] = useState();
	const handleFilter = () => setFilter(true);
	return (
		<>
			<filtrationcontext.Provider
				value={{
					checked,
					setChecked,
					filter,
					setFilter,
					handleFilter,
					checkValues,
					setcheckValues,
					searchQuery,
					setSearchQuery,
					ObjectsearchQuery,
					setObjectSearchQuery,
					ObjectUsersearchQuery,
					setObjectUserSearchQuery,
					VehiclessearchQuery,
					setVehiclesSearchQuery,
					DriverssearchQuery,
					setDriversSearchQuery,
					UserssearchQuery,
					setUsersSearchQuery,
					GeofencessearchQuery,
					setGeofencesSearchQuery,
					reportTypessearchQuery,
					setReportTypesSearchQuery,
					parentCheck,
					setParentCheck,
					childCheck,
					setChildCheck,
					filteredData,
					setFilteredData,
					userData,
					setUserData,
					limit,
					setLimit,
					totalPages,
					setTotalPages,
					AlertsearchQuery,
					setAlertSearchQuery,
				}}
			>
				{children}
			</filtrationcontext.Provider>
		</>
	);
}
