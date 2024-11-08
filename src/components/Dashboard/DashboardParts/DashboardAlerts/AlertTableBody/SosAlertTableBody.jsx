import React, { useState, useEffect } from "react";
import TableRow from "../../../../Helpers/Table/TableRow";
import { useGetSosAlertQuery } from "../../../../../Redux/service/Alerts/Alerts";
import Loader from "../../../../Helpers/Loader/Loader";

const SosAlertTableBody = () => {
  const { data, isLoading, isError } = useGetSosAlertQuery();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

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

  return (
    <>
      {tableData?.map((i) => (
        <div key={i.deviceId} className="table-row">
          <TableRow value={i.deviceName} />
          <TableRow value={i.deviceUniqueId ? i.deviceUniqueId : "- - - - -"} />
          <TableRow value={i.address ? i.address : "- - - - -"} />
          <TableRow value={i.sosTime ? i.sosTime : "- - - - -"} />
          <TableRow value={i.eventTime ? i.eventTime : "- - - - -"} />
        </div>
      ))}
    </>
  );
};

export default SosAlertTableBody;
