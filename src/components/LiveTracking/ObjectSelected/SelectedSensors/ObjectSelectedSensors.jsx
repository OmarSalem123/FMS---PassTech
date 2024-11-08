import React from "react";
import ObjectSelectedSensorsRows from "./ObjectSelectedSensorsRows";

export default function ObjectSelectedSensors({ position, CarSensors }) {
  console.log("carsens",CarSensors);
  return (
    <>
      <div className="object-selected-sensors">
        <ObjectSelectedSensorsRows
          title="speed"
          val={`${Math.round(position?.speed)} km/h`}
          img="baselinespeed"
          position={position}
        />
        {CarSensors?.fuelSupport && (
          <ObjectSelectedSensorsRows title="fuel" val="N/A" img="Fuel" />
        )}
        {CarSensors?.temperatureSensorSupport && (
          <ObjectSelectedSensorsRows
            title="temperature"
            val="N/A"
            img="Temperature"
          />
        )}
        {CarSensors?.accSupport && (
          <ObjectSelectedSensorsRows
            title="ignition"
            val="OFF"
            img="Ignition"
          />
        )}
        {CarSensors?.doorSupport && (
          <ObjectSelectedSensorsRows title="door" val="Closed" img="Door" />
        )}
      </div>
    </>
  );
}
