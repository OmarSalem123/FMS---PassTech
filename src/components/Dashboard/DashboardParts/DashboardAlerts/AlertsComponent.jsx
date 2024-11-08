import React, { useState } from "react";
import AlertPopup from "./AlertPopup/AlertPopup";

export default function AlertsComponent(props) {
  const [alertPopup, setAlertPopup] = useState("");
  const isPopupDisabled = ["Idle Alerts", "Power Cut", "Total Alerts"].includes(
    props.title
  );

  return (
    <>
      <div
        className="dashboard-alert"
        onClick={() => {
          if (!isPopupDisabled) setAlertPopup(props.title);
        }}
      >
        <div
          className={`bg-white-rounded flex-between my-3 ${
            isPopupDisabled && props.title !=="Total Alerts" ? "disabled-bg" : ""
          }`}
        >
          <div>
            <p className="fs-14 fw-500 neutral-500">{props.title}</p>
            <div>
              <span className="fs-18 fw-700 neutral-800 me-3">
                {props.number}
              </span>
              <span className="fs-14 fw-700 brand-500">{props.percent}</span>
            </div>
          </div>
          <div className="">
            <img src={`${process.env.PUBLIC_URL}/assets/${props.image}.svg`} alt="" />
          </div>
        </div>
      </div>
      {alertPopup && !isPopupDisabled && (
        <AlertPopup title={alertPopup} setAlertPopup={setAlertPopup} />
      )}
    </>
  );
}
