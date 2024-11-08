import React from "react";
import DashboardHead from "./DashboardParts/DashboardHead";
import DashboardTotal from "./DashboardParts/DashboardTotal";
import DashboardAlerts from "./DashboardParts/DashboardAlerts";
import DashboardVehicleLocation from "./DashboardParts/DashboardVehicleLocation";
import { Helmet } from "react-helmet";

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
      </Helmet>

      <DashboardHead />
      <DashboardTotal />
      <DashboardAlerts />
      <DashboardVehicleLocation />
    </>
  );
}
