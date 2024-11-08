import React from "react";
import OdooMeter from "../../../Helpers/Speedometer/Odoometer";
import FuelMeter from "../../../Helpers/FuelMeter/FuelMeter";
import Temperature from "../../../Helpers/Temperature/Temperature";
import Engine from "../../../Helpers/Engine/Engine";
import Door from "../../../Helpers/Door/Door";

export default function ObjectSelectedSensorsRows({
  title,
  val,
  img,
  position,
}) {
  return (
    <>
      <div className="flex-between w-100 mb-5">
        <div className="d-flex">
          <div className="me-4">
            <img src={`/assets/${img}.svg`} alt="" />
          </div>
          <div>
            <div className="fs-14 fw-500 custom text-capitalize mb-8">{title}</div>
            <p>{val}</p>
          </div>
        </div>
        <div>
          {title === "speed" ? (
            <OdooMeter speed={position?.speed} />
          ) : title === "fuel" ? (
            <FuelMeter />
          ) : title === "temperature" ? (
            <Temperature />
          ) : title === "ignition" ? (
            <Engine />
          ) : (
            <Door />
          )}
        </div>
      </div>
    </>
  );
}
