/* eslint-disable react/style-prop-object */
import React, { useContext, useEffect, useState } from "react";
import TableRow from "../../Helpers/Table/TableRow";
import TableActions from "../../Helpers/Table/TableActions";
import { filtrationcontext } from "../../../context/Filtercontext";
import { useGetDriversSearchQuery } from "../../../Redux/service/Drivers/Drivers";
export default function DriverTableBody({ data }) {
  const [tableData, setTableData] = useState([]);
  const page = Number(sessionStorage.getItem("page"));
  const { searchQuery, limit, setTotalPages } = useContext(filtrationcontext);

  const { data: searchDriver } = useGetDriversSearchQuery(
    {
      page,
      search: String(searchQuery),
      limit,
    },
    { skip: !String(searchQuery) }
  );

  useEffect(() => {
    if (searchDriver) {
      if (searchDriver.drivers.length > 0) {
        setTableData(searchDriver.drivers);
        setTotalPages(searchDriver.totalPages);
      } else {
        setTableData([]);
        setTotalPages(0);
      }
    } else {
      setTableData(data);
      setTotalPages(data?.totalPages);
    }
  }, [searchDriver, data, searchQuery, setTotalPages]);
  if (searchDriver?.totalCount === 0)
    return <p className="no-results">No Drivers Found</p>;

  return (
    <>
      {tableData.map((i) => (
        <div key={i.id} className="table-row">
          <TableRow value={i.name} style="table-element-name ps-0" />
          <TableRow value={i.code ? i.code : "- - - - -"} />
          <TableRow value={i.idNo ? i.idNo : "- - - - -"} />
          <TableRow
            value={i.phoneNumber ? i.phoneNumber : "- - - - -"}
            style="table-element-phone"
          />
          <TableRow value={i.address ? i.address : "- - - - -"} />
          <TableActions DriverId={i.id} />
        </div>
      ))}
    </>
  );
}
