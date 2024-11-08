import React, { useContext, useEffect, useState } from "react";
import TableActions from "../../Helpers/Table/TableActions";
import { useGetAllDevicesQuery } from "../../../Redux/service/Devices";
import TableRow from "../../Helpers/Table/TableRow";
import { filtrationcontext } from "../../../context/Filtercontext";
import { useGetVehiclesSearchQuery } from "../../../Redux/service/Vehicles/Vehicles";
import { useLazyGetSpecificUserQuery } from "../../../Redux/service/Users/Users";
import { formatDate } from "../../../JsHelpers/DateFormat";

export default function VehiclesTableBody({ data }) {
  const [updatedData, setUpdatedData] = useState([]);
  const [TableData, setTableData] = useState([]);
  const [usernames, setUsernames] = useState({}); // New state for usernames

  const { VehiclessearchQuery, setTotalPages } = useContext(filtrationcontext);
  let page = Number(sessionStorage.getItem("page"));
  const {
    data: Devices,
    refetch: refetchDevices,
    isLoading: devicesLoading,
  } = useGetAllDevicesQuery();

  const { data: Searchvehicle } = useGetVehiclesSearchQuery(
    {
      page,
      search: String(VehiclessearchQuery),
    },
    { skip: !String(VehiclessearchQuery) }
  );
  
  const [getUsers] = useLazyGetSpecificUserQuery();
  
  useEffect(() => {
    refetchDevices();
  }, [data, refetchDevices]);

  useEffect(() => {
    if (data) {
      const fetchUsers = async () => {
        const userPromises = data.map(async (vehicle) => {
          const userData = await getUsers(vehicle.parent).unwrap();
          return { id: vehicle.parent, name: userData.name };
        });

        const users = await Promise.all(userPromises);
        const userMap = Object.fromEntries(users.map(user => [user.id, user.name]));
        setUsernames(userMap); // Store usernames in state

        setUpdatedData(data); // Update your existing data here
      };

      fetchUsers();
    }
  }, [data, getUsers]);

  useEffect(() => {
    if (VehiclessearchQuery && Searchvehicle) {
      const combinedSearchData = Searchvehicle.vehicles.map((vehicle) => vehicle);
      setTableData(combinedSearchData);
      setTotalPages(Searchvehicle?.totalPages);
    } else {
      setTableData(updatedData);
      setTotalPages(data?.totalPages);
    }
  }, [
    VehiclessearchQuery,
    Searchvehicle,
    updatedData,
    setTotalPages,
    data?.totalPages,
  ]);

  if (Searchvehicle?.totalCount === 0)
    return <p className="no-results">No Vehicles Found</p>;

  return (
    <>
      {TableData?.map((i) => {
        const { formattedDate, formattedTime } = formatDate(i.lastUpdate);
        return (
          <div key={i.id} className="table-row">
            <TableRow value={i.name} style="table-element-name ps-0" />
            <TableRow value={i.plateNumber} />
            <TableRow
              value={
                i.status === "unknown" || i.status === "offline"
                  ? "offline"
                  : "online"
              }
              style={
                i.status === "offline" || i.status === "unknown"
                  ? "table-element-fail"
                  : "table-element-success"
              }
              valuestyle={
                i.status === "offline" || i.status === "unknown"
                  ? "table-bg-element-fail"
                  : "table-bg-element-success"
              }
            />
            <TableRow value={i.imei} />
            <TableRow
              value={
                i.lastUpdate === null
                  ? "N/A"
                  : formattedDate + " " + formattedTime
              }
            />
            <TableRow
              value={i.archived === false ? "Active" : "Archived"}
              style={
                i.archived === false
                  ? "table-element-active fw-500"
                  : "table-element-archived fw-500"
              }
              valuestyle={
                i.archived === false
                  ? "table-bg-element-active fw-500"
                  : "table-bg-element-archived fw-500"
              }
            />{" "}
            <TableRow value={usernames[i.parent]} /> {/* Display username */}
            <TableActions vehicleId={i.id} />
          </div>
        );
      })}
    </>
  );
}
