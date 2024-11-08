import React from "react";

export default function ReportTotals({ title, number }) {
  return (
    <div className="report-sheet-total">
      <div className="text-capitalize mb-2">{title}</div>
      <div className="fw-700 fs-18">{number}</div>
    </div>
  );
}
