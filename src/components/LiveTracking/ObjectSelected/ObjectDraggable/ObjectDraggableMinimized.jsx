/* eslint-disable react/style-prop-object */
import React from "react";
import Close from "../../../Helpers/CloseBtn/Close";

export default function ObjectDraggableMinimized({
  data,
  close,
  toggleMinimize,
  index,
}) {
  const minimizedStyle = {
    transition: "all 0.3s ease",
  };

  return (
    <div className="object-draggable-mini" style={minimizedStyle}>
      <span>{data?.name}</span>
      <div className="flex-between">
        <img
          src="/assets/Maximize.svg"
          alt="maximize"
          className="close me-2"
          onClick={toggleMinimize}
        />
        <Close close={close} img="close" style="close close-24" />
      </div>{" "}
    </div>
  );
}
