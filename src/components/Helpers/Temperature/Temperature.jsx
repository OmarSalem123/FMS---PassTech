import React from "react";
import GaugeComponent from "react-gauge-component";

export default function Temperature() {
  return (
    <div>
      <GaugeComponent
        className=" "
        style={{
          width: "120px",
          backgroundColor: "#000",
          borderRadius: "20px",
          padding: "0px",
          margin: "0px",
        }}
        value={50}
        type="radial"
        arc={{
          colorArray: ["#5BE12C", "#EA4228"],
          padding: 0.02,
          width: 0.3,
        }}
        pointer={{
          elastic: true,
          animationDelay: 0,
        }}
      />
    </div>
  );
}
