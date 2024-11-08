import React from "react";
import PopupBodyItem from "../../Helpers/Popup/PopupParts/PopupBodyItem";

export default function VehicleSensors({ values = {} }) {
  const {
    accSupport = "",
    doorSupport = "",
    weightSensorSupport = "",
    temperatureSensorSupport = "",
    iButtonSensorSupport = "",
    ptoSensorSupport = "",
    seatSensorSupport = "",
    refrigeratorSensorSupport = "",
    headlightsSensorSupport = "",
  } = values;
  const getvalue = (sensor) => (sensor ? "Right.svg" : "Wrong.svg");
  return (
    <>
      <p className="fs-16 fw-700 brand-700 text-uppercase mt-3">
        sensors supported
      </p>
      <div className="row">
        <div className="col-lg-6">
          <div className="display-border">
            <PopupBodyItem title="acc" img={getvalue(accSupport)} />
            <PopupBodyItem title="door" img={getvalue(doorSupport)} />
            <PopupBodyItem title="weight" img={getvalue(weightSensorSupport)} />
            <PopupBodyItem
              title="temperature"
              img={getvalue(temperatureSensorSupport)}
            />
            <PopupBodyItem
              title="button"
              img={getvalue(iButtonSensorSupport)}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="display-border ">
            <PopupBodyItem title="pto" img={getvalue(ptoSensorSupport)} />
            <PopupBodyItem title="seat" img={getvalue(seatSensorSupport)} />
            <PopupBodyItem
              title="refrigerator"
              img={getvalue(refrigeratorSensorSupport)}
            />
            <PopupBodyItem
              title="headlights"
              img={getvalue(headlightsSensorSupport)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
