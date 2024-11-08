/* eslint-disable react/style-prop-object */
import React from "react";
import Close from "../../../../Helpers/CloseBtn/Close";

export default function ObjectDraggableHead({ data, close, toggleMinimize }) {
  return (
    <div className="object-draggable-head">
      <div className="object-draggable-main">
        <div>{data?.name}</div>
        <div className="flex-between">
          <img
            src="/assets/Minimize.svg"
            alt="minimize"
            className="close me-2"
            onClick={toggleMinimize}
          />
          <Close close={close} img="close" style="close close-24" />
        </div>
      </div>
    </div>
  );
}
