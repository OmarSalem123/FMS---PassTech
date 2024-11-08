/* eslint-disable react/style-prop-object */
import React from "react";
import ObjectTableHead from "./ObjectTableHead";
import ObjectTableBody from "./ObjectTableBody";
export default function ObjectTable() {
  return (
    <>
      <ObjectTableHead />
      <div className="object-table-body ">
        <ObjectTableBody />
      </div>
    </>
  );
}
