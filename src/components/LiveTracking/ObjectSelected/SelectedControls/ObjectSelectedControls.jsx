import React from "react";
import ObjectSelectedOptions from "./ObjectSelectedOptions";

export default function ObjectSelectedControls({ device }) {
  return (
    <>
      <div>
        <ObjectSelectedOptions
          option1="start engine"
          option2="stop engine"
          device={device}
          disabled={false}
        />
      </div>
      <div>
        <ObjectSelectedOptions
          option1="set speed limit"
          option2="set geofence"
          device={device}
          disabled={false}
        />
      </div>
      <div>
        <ObjectSelectedOptions
          option1="open sessions"
          option2="share location"
          device={device}
          disabled={true}
        />
      </div>
      <div></div>
    </>
  );
}
