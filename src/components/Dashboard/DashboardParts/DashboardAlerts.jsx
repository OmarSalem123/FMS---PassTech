import React from "react";
import AlertsComponent from "./DashboardAlerts/AlertsComponent";
import { useGetAllAlertQuery } from "../../../Redux/service/Alerts/Alerts";
import AlertsSkeleton from "./DashboardAlerts/SkeletonAlertsComponent";

export default function DashboardAlerts() {
  const { data, isLoading, isError } = useGetAllAlertQuery();

  if (isLoading)
    return (
      <div className="flex-between">
        <AlertsSkeleton />
        <AlertsSkeleton />
        <AlertsSkeleton />
        <AlertsSkeleton />
        <AlertsSkeleton />
        <AlertsSkeleton />
      </div>
    );
  if (isError)
    return (
      <div className="flex-between">
        <AlertsComponent
          title="SOS Alerts"
          percent="+8%"
          number={0}
          image="SosAlert"
        />
        <AlertsComponent
          title="Speed Alerts"
          percent="+14%"
          number={0}
          image="SpeedAlert"
        />
        <AlertsComponent
          title="Idle Alerts"
          percent="+3%"
          number={0}
          image="IdleAlert"
        />
        <AlertsComponent
          title="Power Cut"
          percent="+44%"
          number={0}
          image="Powercut"
        />
        <AlertsComponent
          title="Geofences"
          percent="+44%"
          number={0}
          image="GeofenceAlert"
        />
        <AlertsComponent
          title="Other Alerts"
          percent="+2%"
          number={0}
          image="OtherAlert"
        />
      </div>
    );
  return (
    <>
      {data.alerts && (
        <div className="flex-between">
          <AlertsComponent
            title="Total Alerts"
            percent="+8%"
            number={data.alerts.totalAlerts}
            image="SosAlert"
          />
          <AlertsComponent
            title="Speed Alerts"
            percent="+14%"
            number={data.alerts.speedAlerts}
            image="SpeedAlert"
          />
          <AlertsComponent
            title="Idle Alerts"
            percent="+3%"
            number={data.alerts.idleAlerts}
            image="IdleAlert"
          />
          <AlertsComponent
            title="Power Cut"
            percent="+44%"
            number={data.alerts.powerCutAlerts}
            image="PowerCut"
          />
          <AlertsComponent
            title="Geofences"
            percent="+44%"
            number={data.alerts.geofenceAlerts}
            image="GeofenceAlert"
          />
          <AlertsComponent
            title="Other Alerts"
            percent="+2%"
            number={data.alerts.otherAlerts}
            image="OtherAlert"
          />
        </div>
      )}
    </>
  );
}
