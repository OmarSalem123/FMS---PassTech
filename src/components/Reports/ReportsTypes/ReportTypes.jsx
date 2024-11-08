/* eslint-disable react/style-prop-object */
import React, { useContext, useState } from "react";
import Searchbar from "../../Helpers/Searchbar/Searchbar";
import ReportsSidebarRows from "./ReportsSidebarRows/ReportsSidebarRows";
import ReportDefinitionHead from "./ReportTypesDefinition/ReportDefinitionHead";
import Table from "../../Helpers/Table/Table";
import {
  vehicleReportsTypes,
  maintenanceReportsypes,
} from "./ReportsTypesData/ReportsTypesData";
import { filtrationcontext } from "../../../context/Filtercontext";
export default function ReportTypes() {
  const [active, setActive] = useState("vehicle");
  const [type, setType] = useState("vehicle");
  const HeadField = ["Name", "Description", "ReportType"];
  const { setReportTypesSearchQuery } = useContext(filtrationcontext);
  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    setQuery(e.target.value);
    setReportTypesSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="row gx-0">
        <div className="col-lg-2">
          <div className="reports-sidebar-types">
            <Searchbar
              style="search-dark input-group"
              path="/assets/dark/search.svg"
              placeholder="Search Report Name..."
              value={query}
              onChange={handleSearch}
            />
            <div className="reports-sidebar-types-title">report types</div>
            <ReportsSidebarRows
              name="vehicle"
              icon="vehicle"
              active={active}
              setActive={setActive}
              setType={setType}
            />
           {/**  <ReportsSidebarRows
              name="maintenance"
              icon="maintenance"
              active={active}
              setActive={setActive}
              setType={setType}
            />*/}
          </div>
        </div>
        <div className="col-lg-10 reports-types-definition">
          <ReportDefinitionHead name={type} />
          <Table
            HeadField={HeadField}
            BodyData={
              type === "vehicle" ? vehicleReportsTypes : maintenanceReportsypes
            }
            type="reportstypes"
          />
        </div>
      </div>
    </>
  );
}
