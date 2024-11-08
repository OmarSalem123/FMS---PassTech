import React from "react";
import Maps from "../Maps/Maps";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export default function LiveTracking() {
  let { pathname } = useLocation();
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>
            {pathname === "/livetracking" ? "Live Tracking" : "Geofences"}
          </title>
          <meta
            name="description"
            content={
              pathname === "/livetracking" ? "Live Tracking" : "Geofences"
            }
          />
        </Helmet>
        <Maps />
      </HelmetProvider>
    </div>
  );
}
