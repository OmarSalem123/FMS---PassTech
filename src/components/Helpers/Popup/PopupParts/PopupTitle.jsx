import React from "react";

export default function PopupTitle({
  vehicleimg,
  driverimg,
  headtitle,
  subtitle,
}) {
  return (
    <>
      <div className="flex-between">
        <div className="me-3">
          {driverimg ? (
            <img src={`${driverimg}`} alt="" className="driver-img" />
          ) : (
            <img src={`/assets/${vehicleimg}`} alt="" />
          )}
        </div>
        <div>
          <div className="fs-16 fw-600 neutral-700 text-capitalize">
            {headtitle}
          </div>
          <div className="fs-14 fw-400 neutral-500 text-capitalize">
            {subtitle}
          </div>
        </div>
      </div>
    </>
  );
}
