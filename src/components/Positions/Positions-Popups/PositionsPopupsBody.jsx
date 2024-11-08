import React, { useEffect, useState } from "react";
import PositionsPopupsDetails from "./PositionsPopupsDetails";
import axios from "axios";

export default function PositionsPopupsBody({ mark, devicestatus }) {
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
  useEffect(() => {
    fetchGeoCodePosition(mark.latitude, mark.longitude);
  },[mark.latitude, mark.longitude]);
  return (
    <div className="device-popup-body">
      <div className="row">
        <div className="col-lg-6">
          <PositionsPopupsDetails img="Anchor" item={geoCode} />
          <PositionsPopupsDetails img="Time" item={mark.fixTime} />
          {mark.attributes.ignition && <PositionsPopupsDetails
            img={mark.attributes.ignition ? "IgnitionOn" : "IgnitionOff"}
            item={mark.attributes.ignition ? "ON" : "OFF"}
          />}
         
        </div>
        <div className="col-lg-6">
       
        {/**<PositionsPopupsDetails
            img={devicestatus ? "Available" : "Unavailable"}
            item={devicestatus ? "Available" : "Unavailable"}
          />*/}
          <PositionsPopupsDetails
            img={devicestatus ? "Connected" : "Disconnected"}
            item={devicestatus ? "Connected" : "Disconnected"}
          /> <PositionsPopupsDetails
            img="Speedmeter"
            item={devicestatus ? mark.speed.toFixed(2) + ` KM` : 0}
          />
        </div>
      </div>
    </div>
  );
}
