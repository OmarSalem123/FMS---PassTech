import React from "react";
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator,
  DangerPath,
} from "react-speedometer";
export default function OdooMeter({ speed }) {
  return (
    <div>
      {" "}
      <Speedometer
        value={`${speed}`}
        min={0}
        max={280}
        fontFamily="Roboto"
        width={120}
      >
        <Background opacity={1} color="#000" />
        <Arc color="#f48" />
        <Needle
          baseWidth={1}
          baseOffset={1}
          circleColor="#2E9245"
          circleRadius={8}
        />
        <Progress color="#2E9245" />
        <DangerPath />
        <Marks
          fontSize={10}
          numbersRadius={8}
          lineOpacity={0.8}
          lineSize={9}
          lineCap="square"
        />
        <Indicator fontSize={14} spreadMethod="true" />
      </Speedometer>
    </div>
  );
}
