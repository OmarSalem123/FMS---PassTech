import React from "react";

export default function TotalComponent(props) {
  return (
    <>
      <div
        className={`dashboard-total  ${props.style}`}
      >
        <div className="flex-between">
          <div>
            <p className="fs-16 fw-600 neutral-500">{props.title}</p>
            <div className="mb-3">
              <img className="me-3" src={`/assets/${props.status}.svg`} alt="" />
              <span className="fs-14 fw-400 neutral-500">{props.percent}</span>
            </div>
            <div className="flex-center">
              <span className="fs-24 fw-600">{props.number}</span>
              <div className="dashboard-total-chart">
                <img src={`/assets/${props.chart}.svg`} alt="" />
              </div>
            </div>
          </div>
        </div>
       </div>
    </>
  );
}
