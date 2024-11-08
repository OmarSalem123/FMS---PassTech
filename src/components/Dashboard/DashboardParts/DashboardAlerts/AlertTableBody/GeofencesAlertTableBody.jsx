import React, { useState, useEffect, useContext } from "react";
import TableRow from "../../../../Helpers/Table/TableRow";
import {
  useGetGeofencesEnterAlertQuery,
  useGetGeofencesExitAlertQuery,
} from "../../../../../Redux/service/Alerts/Alerts";
import Loader from "../../../../Helpers/Loader/Loader";
import axios from "axios";
import { formatDateString } from "../../../../../JsHelpers/DateFormat";

const GeofencesAlertTableBody = ({ limit, currentPage, setTotalPages }) => {
  const [geoCodes, setGeoCodes] = useState({});
  const {
    data: enterData,
    isLoading: isLoadingEnter,
    isError: isErrorEnter,
  } = useGetGeofencesEnterAlertQuery({
    page: currentPage,
    limit: limit,
  });

  const {
    data: exitData,
    isLoading: isLoadingExit,
    isError: isErrorExit,
  } = useGetGeofencesExitAlertQuery({
    page: currentPage,
    limit: limit,
  });

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (enterData?.alerts && exitData?.alerts) {
      const combinedData = [
        ...enterData.alerts.map((alert) => ({
          ...alert,
          geofence_Type: "Geofence Entered",
        })),
        ...exitData.alerts.map((alert) => ({
          ...alert,
          geofence_Type: "Geofence Exit",
        })),
      ];
      setTableData(combinedData);

      const totalItems =
        (enterData.totalItems || 0) + (exitData.totalItems || 0);
      setTotalPages(Math.ceil(totalItems / limit));

      combinedData.forEach((alert) => {
        if (alert.latitude && alert.longitude) {
          fetchGeoCodePosition(
            alert.deviceUniqueId,
            alert.latitude,
            alert.longitude
          );
        }
      });
    }
  }, [enterData, exitData, limit, setTotalPages]);

  const fetchGeoCodePosition = async (deviceUniqueId, lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`
      );
      setGeoCodes((prevGeoCodes) => ({
        ...prevGeoCodes,
        [deviceUniqueId]: response.display_name,
      }));
    } catch (error) {
      console.error("Error fetching geocode position:", error);
    }
  };

  if (isLoadingEnter || isLoadingExit) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  if (isErrorEnter || isErrorExit) {
    return <div>Error fetching data</div>;
  }

  if (!Array.isArray(tableData) || tableData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <>
      {tableData.map((alert) => (
        <div key={alert.id} className="table-row">
          <TableRow value={alert.deviceName} />
          <TableRow
            value={alert.deviceUniqueId ? alert.deviceUniqueId : "- - - - -"}
          />
          <TableRow
            valuestyle="popup-table-value"
            value={geoCodes[alert.deviceUniqueId] || "- - - - -"}
          />
          <TableRow value={alert.geofence_Type} />
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

export default GeofencesAlertTableBody;
