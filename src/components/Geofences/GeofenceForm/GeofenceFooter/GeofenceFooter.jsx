/* eslint-disable react/style-prop-object */
import React, { useContext } from "react";
import Button from "../../../Helpers/Button/Button";
import { popupcontext } from "../../../../context/Popupscontext";
import { useMap } from "react-leaflet";

export default function GeofenceFooter({ AddGeo, submitAttempt }) {
  let { handleClose } = useContext(popupcontext);
  const map = useMap();
  return (
    <div>
      <div className="d-flex flex-row-reverse px-3 pb-1 mt-3">
        <Button
          style="button btn-success p-6-12"
          text="Save"
          textstyle="fs-16"
          type="submit"
        />
        <Button
          style="button btn-default object-btn p-6-12 me-2"
          type="button"
          text={"Cancel"}
          textstyle="fs-16"
          onClick={() => {
            handleClose("editing");
            map.dragging.enable();
          }}
        />
      </div>
      {submitAttempt && !AddGeo.isValid && (
        <div className="validation text-end pe-3">
          Please Check Required Inputs
        </div>
      )}
    </div>
  );
}
