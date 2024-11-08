import React from "react";

export default function ReportsSidebarRows({
  name,
  icon,
  active,
  setActive,
  setType,
}) {
  const activeReport = (type) => {
   if (type !== active) {
     setActive(type);
     setType(type);
   }
  };
  return (
    <div>
      <div
        className={`reports-sidebar-types-row ${
          active === name ? "active" : ""
        }`}
        onClick={() => {
          activeReport(name);
          setType(name);
        }}
      >
        <img
          src={
            active === name
              ? `assets/Reports/Active/${icon}.svg`
              : `assets/Reports/${icon}.svg`
          }
          alt={name}
        />
        <div>{name}</div>
      </div>
    </div>
  );
}
