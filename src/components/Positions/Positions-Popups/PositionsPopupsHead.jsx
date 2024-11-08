import React from 'react'

export default function PositionsPopupsHead({ DeviceData ,devicestatus , mark}) {
  return (
    <div className="device-popup-head">
      <div className="device-popup-name">
        {[DeviceData]?.map((i) => {
          return i?.name;
        })}
      </div>
      <div className="device-popup-status">
        <img
          src={mark.attributes.motion ? "/assets/Moving.svg" : "/assets/Stopped.svg"}
          alt="status"
        />
        <div className="ms-1">{mark.attributes.motion ? "Moving" : "Stopped"}</div>
      </div>
    </div>
  );
}
