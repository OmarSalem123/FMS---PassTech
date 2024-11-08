import React from "react";
import GaugeChart from "react-gauge-chart";

export default function FuelMeter() {
  return (
    <div>
      <GaugeChart
        style={{
          width: "120px",
          height: "100px",
          alignContent:"center",
          backgroundColor: "#000",
          borderRadius: "30px",
        }}
        needleBaseColor="#2E9245"
        id="gauge-chart5"
        arcsLength={[0.2, 0.8]}
        colors={["#EA4228", "#5BE12C"]}
        textColor="#fff"
        cornerRadius={0}
        percent={0.47}
        arcPadding={0}
        animate={false}
      />
    </div>
  );
}
