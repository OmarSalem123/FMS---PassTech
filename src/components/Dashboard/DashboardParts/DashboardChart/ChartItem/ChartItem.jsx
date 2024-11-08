import React from "react";

export default function ChartItem(props) {
  return (
    <>
      <div className={`flex-between ${props.margin}`}>
        <div className="flex-center">
          <div className={props.style}></div>
          <span className="fs-16 fw-400 neutral-500">{props.title}</span>
        </div>
        <span className="fs-16 fw-500">{props.number}</span>
      </div>
    </>
  );
}
