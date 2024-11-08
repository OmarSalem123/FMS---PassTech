import React from "react";
import { Sensors } from "../../Helpers/Input/Input";

export default function VehicleSensors({ addData }) {
  return (
    <div className="vehiclesensors">
      <p className="fs-16 fw-700 brand-700 text-uppercase">sesnors supported</p>
      <div className="row">
        <div className="col-lg-6">
          <Sensors
            title="acc"
            id="accSupport"
            name="accSupport"
            onBlur={addData.handleBlur}
            onChange={addData.handleChange}
            value={addData.values.accSupport}
          />
          <Sensors
            title="door"
            id="doorSupport"
            name="doorSupport"
            onBlur={addData.handleBlur}
            onChange={addData.handleChange}
            value={addData.values.doorSupport}
          />
          <Sensors
            title="weight"
            id="weightSensorSupport"
            name="weightSensorSupport"
            onBlur={addData.handleBlur}
            onChange={addData.handleChange}
            value={addData.values.weightSensorSupport}
          />
          <Sensors
            title="temperature"
            id="temperatureSensorSupport"
            name="temperatureSensorSupport"
            onBlur={addData.handleBlur}
            onChange={addData.handleChange}
            value={addData.values.temperatureSensorSupport}
          />
          <Sensors
            title="IButton"
            id="iButtonSensorSupport"
            name="iButtonSensorSupport"
            onBlur={addData.handleBlur}
            onChange={addData.handleChange}
            value={addData.values.iButtonSensorSupport}
          />
        </div>
        <div className="col-lg-6">
          <Sensors
            title="PTO"
            id="ptoSensorSupport"
            name="ptoSensorSupport"
            onBlur={addData.handleBlur}
            onChange={addData.handleChange}
            value={addData.values.ptoSensorSupport}
          />
          <Sensors
            title="seat"
            id="seatSensorSupport"
            name="seatSensorSupport"
            onBlur={addData.handleBlur}
            onChange={addData.handleChange}
            value={addData.values.seatSensorSupport}
          />
          <Sensors
            title="refrigerator"
            id="refrigeratorSensorSupport"
            name="refrigeratorSensorSupport"
            onBlur={addData.handleBlur}
            onChange={addData.handleChange}
            value={addData.values.refrigeratorSensorSupport}
          />
          <Sensors
            title="headlights"
            id="headlightsSensorSupport"
            name="headlightsSensorSupport"
            onBlur={addData.handleBlur}
            onChange={addData.handleChange}
            value={addData.values.headlightsSensorSupport}
          />
        </div>
      </div>
    </div>
  );
}
