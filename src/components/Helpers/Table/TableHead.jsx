import React, { useContext, useEffect } from "react";
import { exportContext } from "../../../context/ExportDataContext";

export default function TableHead({ HeadField, style }) {
  let { setExportedDataHeader } = useContext(exportContext);

  useEffect(() => {
    setExportedDataHeader(HeadField);
  }, [HeadField, setExportedDataHeader]);
  let head = HeadField?.map((i, index) => {
    return (
      <div key={index} className="fs-14 fw-400 text-capitalize table-element">
        {i}
      </div>
    );
  });
  return (
    <>
      <div className="table-head-container">
        <div className={`table-head d-flex ${style}`}>{head}</div>
      </div>
    </>
  );
}
