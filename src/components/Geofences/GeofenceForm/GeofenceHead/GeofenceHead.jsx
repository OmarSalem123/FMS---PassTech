/* eslint-disable react/style-prop-object */
import React, { useContext } from "react";
import Close from "../../../Helpers/CloseBtn/Close";
import { popupcontext } from "../../../../context/Popupscontext";
import { useMap } from "react-leaflet";

export default function GeofenceHead() {
  let { handleClose, isEditing } = useContext(popupcontext);
  const map = useMap();
  return (
    <div className="flex-between p-16">
      <div className="flex-between w-50">
        <img src="/assets/Geofence.svg" alt="Geofence" />
        <div className="fs-18 fw-600 text-capitalize">
          {!isEditing ? "add new geofence" : "edit geofence"}
        </div>
      </div>
      <Close
        style="close close-btn"
        img="Close"
        close={() => {
          handleClose("editing");
          map.dragging.enable();
        }}
      />
    </div>
  );
}
