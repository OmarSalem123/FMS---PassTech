/* eslint-disable react/style-prop-object */
import React, { useContext } from "react";
import TableRow from "../../../Helpers/Table/TableRow";
import { filtrationcontext } from "../../../../context/Filtercontext";
import { useNavigate } from "react-router-dom";

export default function ReportsTypesTableBody({ data }) {
  const { reportTypessearchQuery } = useContext(filtrationcontext);
  let navigate = useNavigate();
  const filteredData = data.filter((i) => {
    const searchValue = reportTypessearchQuery.toLowerCase();
    return i.name.toLowerCase().includes(searchValue);
  });
  if (filteredData.length === 0)
    return <div className="Soon">No Reports Found</div>;
  const reportsheet = (name) => {
    console.log(name)
     navigate(`./${name}`);
  };
  return (
    <>
      {filteredData.map((i, indx) => (
        <div
          key={indx}
          className="table-row"
          onClick={() => reportsheet(i.shortname)}
        >
          <TableRow value={i.name} style="ps-0" />
          <TableRow value={i.description} />
          <TableRow value={i.reportType} valuestyle="reporttype" />
        </div>
      ))}
    </>
  );
}
