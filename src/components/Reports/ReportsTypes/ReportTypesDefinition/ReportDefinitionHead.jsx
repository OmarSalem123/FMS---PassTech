import React from "react";

export default function ReportDefinitionHead({ name }) {
  return (
    <>
      <div className="report-definition-head">
        <img src={`assets/Reports/${name}.svg`} alt={name} />
        <div className="text-capitalize">{name}</div>
      </div>
    </>
  );
}
