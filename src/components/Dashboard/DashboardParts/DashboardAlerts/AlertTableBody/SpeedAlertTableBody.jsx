import React, { useState, useEffect } from "react";
import TableRow from "../../../../Helpers/Table/TableRow";
import { useGetSpeedAlertQuery } from "../../../../../Redux/service/Alerts/Alerts";
import Loader from "../../../../Helpers/Loader/Loader";
import { formatDateString } from "../../../../../JsHelpers/DateFormat";
import axios from "axios";
import TableRowButton from "../../../../Helpers/Table/TableRowButton";

const SpeedAlertTableBody = ({ limit, currentPage, setTotalPages, query }) => {
  const { data, isLoading, isError } = useGetSpeedAlertQuery(
    {
      page: currentPage,
      limit: limit,
      search: query,
    },
    {
      skip: !currentPage || !limit,
    }
  );
  const [tableData, setTableData] = useState([]);
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    if (data) {
      setTableData(data.alerts);
      if (data.totalItems) {
        setTotalPages(Math.ceil(data.totalItems / limit));
      } else if (data.totalPages) {
        setTotalPages(data.totalPages);
      }
    }
  }, [data, limit, setTotalPages]);

  const fetchGeoCodePosition = async (lat, lon, deviceUniqueId) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`
      );
      const newAddress = `${response.data.address.road}, ${response.data.address.suburb}, ${response.data.address.state}, ${response.data.address.country} `;
      setAddresses((prevAddresses) => {
        const existingIndex = prevAddresses.findIndex(
          (item) => item.deviceUniqueId === deviceUniqueId
        );

        if (existingIndex !== -1) {
          const updatedAddresses = [...prevAddresses];
          updatedAddresses[existingIndex] = {
            deviceUniqueId,
            lat,
            lon,
            newAddress,
          };
          return updatedAddresses;
        } else {
          return [...prevAddresses, { deviceUniqueId, lat, lon, newAddress }];
        }
      });
    } catch (error) {
      console.error("Error fetching geocode position:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (!tableData || !Array.isArray(tableData)) {
    return <div>No data available</div>;
  }

  const getAddressForDevice = (deviceUniqueId) => {
    const addressObj = addresses.find(
      (item) => item.deviceUniqueId === deviceUniqueId
    );
    if (addressObj) {
      return (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${addressObj.lat},${addressObj.lon}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover-undreline"
        >
          {addressObj.newAddress}
        </a>
      );
    }
    return null;
  };

  return (
    <>
      {tableData.map((alert) => (
        <div key={alert.id} className="table-row">
          <TableRow value={alert.deviceName} />
          <TableRow
            value={alert.deviceUniqueId ? alert.deviceUniqueId : "- - - - -"}
          />
          <TableRowButton
            style="custom-style text-primary cursor"
            valuestyle="value-style"
            onClick={() =>
              fetchGeoCodePosition(alert.latitude, alert.longitude, alert.id)
            }
          >
            {getAddressForDevice(alert.id) || "Get Address"}
          </TableRowButton>
          <TableRow
            value={
              alert.speed ? `${Math.round(alert.speed)} km/h` : "- - - - -"
            }
          />
          <TableRow
            value={
              alert.speedLimit
                ? `${Math.round(alert.speedLimit)} km/h`
                : "- - - - -"
            }
          />
          <TableRow
            value={
              alert.eventTime ? formatDateString(alert.eventTime) : "- - - - -"
            }
          />
        </div>
      ))}
    </>
  );
};

export default SpeedAlertTableBody;
