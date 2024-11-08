/* eslint-disable react/style-prop-object */
import React, { useContext } from "react";
import Close from "../../../Helpers/CloseBtn/Close";
import { popupcontext } from "../../../../context/Popupscontext";
import { useMap } from "react-leaflet";
export default function ObjectSelectedHead({ values, device }) {
  let { handleClose } = useContext(popupcontext);
  const map = useMap();
  return (
    <>
      <div className="street-view-head">
        <div className="street-view-head-inf">
          <img
            src="/assets/Double-arrow.svg"
            alt="Double-Arrow"
            onClick={() => {
              handleClose("minimizeSelected");
            }}
            role="button"
          />
          <p className="ms-2 me-3 my-0 fs-16 fw-600">{values?.name}</p>
          <div
            className={
              device?.status === "online"
                ? "status-online-light"
                : "status-offline"
            }
          ></div>
        </div>
        <Close
          style="close close-32"
          close={() => {
            handleClose("objectSelected");
            map.scrollWheelZoom.enable();
          }}
          img="close"
        />
      </div>
    </>
  );
}