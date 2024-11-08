import React from "react";

export default function ObjectSelectedRows({ title, item, style }) {
  return (
    <>
      <div className="flex-between w-100">
        <div className="fs-14 custom fw-400 neutral-500 text-capitalize mb-8">
          {title}
        </div>
        <div className={`fs-14 fw-400 text-capitalize mb-8 ${style}`}>
          {item}
        </div>
      </div>
    </>
  );
}