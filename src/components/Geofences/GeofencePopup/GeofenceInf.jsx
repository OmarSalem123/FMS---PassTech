import React from "react";
import PopupBodyItem from "../../Helpers/Popup/PopupParts/PopupBodyItem";
import { useSelector } from "react-redux";

export default function GeofenceInf({ values = {} }) {
  let inf = useSelector((state) => state.users.user);

  const getValue = (value, defaultValue = "-----") =>
    value ? value : defaultValue;
  const {
    name = "",
    description = "",
    attributes: { speedLimit = "", color = "", polylineDistance = "" } = {},
  } = values;

  return (
    <div>
      <p className="fs-16 fw-700 brand-700 text-uppercase">Geofence Details</p>
      <div className="row">
        <div className="col-lg-6">
          <div className="display-border">
            <PopupBodyItem title="Name" item={getValue(name)} />
            <PopupBodyItem title="Description" item={getValue(description)} />
           
          </div>
        </div>
        <div className="col-lg-6">
          <div className="display-border">
            <PopupBodyItem
              title="Speed Limit"
              item={
                getValue(speedLimit) +
                " " +
                `${inf.attributes.speedUnit ? inf.attributes.speedUnit : "kmh"}`
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
