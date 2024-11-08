/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from "react";
import ObjectSelectedRows from "../SelectedBody/ObjectSelectedRows";
import { formatDate } from "../../../../JsHelpers/DateFormat";
import { useLazyGetGeoCodePositionQuery } from "../../../../Redux/service/Positions";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ObjectSelectedStatus({ position, device }) {
  console.log("Details", device);
  console.log("Position", position);
  const { formattedDate, formattedTime } = formatDate(device?.lastUpdate);
  const inf = useSelector((state) => state.users.user);
  console.log("Inf", inf);

  const [geoCode, setGeoCode] = useState(false);
  const fetchGeoCodePosition = async (lat, lon) => {
		try {
			const response = await axios.get(
				`https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`
			);
			setGeoCode(
				`${response.data.address.road}, ${response.data.address.suburb}, ${response.data.address.state}, ${response.data.address.country} `
			);
			return `${response.data.address.road}, ${response.data.address.suburb}, ${response.data.address.state}, ${response.data.address.country} `;
		} catch (error) {
			console.error("Error fetching geocode position:", error);
			throw error;
		}
	};

  return (
    <>
      <div className="object-working-status">
        <div className="object-status-details">
          <ObjectSelectedRows
            title="GPS staus"
            item={`${
              device?.status === "online" ? "Available" : "UnAvailable"
            }`}
          />
        </div>
        <div className="object-status-details">
          <ObjectSelectedRows
            title="Accuracy"
            item={
              position?.accuracy ? `${Math.round(position?.accuracy)}` : "N/A"
            }
          />
        </div>
        <div className="object-status-details">
          <ObjectSelectedRows
            title="connectivity"
            item={`${
              device?.status === "online" ? "Connected" : "Disconnected"
            }`}
          />
        </div>
        <div className="object-status-details">
          <ObjectSelectedRows
            title="latitude"
            item={position?.latitude ? `${position?.latitude}` : "33"}
          />
        </div>
        <div className="object-status-details">
          <ObjectSelectedRows
            title="longitude"
            item={position?.longitude ? `${position?.longitude}` : "30"}
          />
        </div>
        <div
          className="object-status-details cursor"
          onClick={() => {
            const lat = position ? position.latitude : inf.latitude;
            const lon = position ? position.longitude : inf.longitude;
            fetchGeoCodePosition(lat, lon);
          }}
        >
          <ObjectSelectedRows
            title="address"
            item={geoCode ? geoCode : "Get current address"}
            style="text-primary"
          />
        </div>
        <div className="object-status-details">
          <ObjectSelectedRows
            title="last update"
            item={
              device?.lastUpdate
                ? `${formattedDate + " " + formattedTime}`
                : "N/A"
            }
          />
        </div>
      </div>
    </>
  );
}