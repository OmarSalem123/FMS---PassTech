import React from "react";
import Draggable from "react-draggable";
import ObjectDraggableHead from "./ObjectDraggableHead/ObjectDraggableHead";
import ObjectDraggableMap from "./ObjectDraggableMap/ObjectDraggableMap";

function ObjectDraggable({
  data,
  onClose,
  position,
  minimized,
  toggleMinimize,
  index,
}) {
    const bounds = { top: 0 };
  return (
    <>
      {!minimized && (
        <Draggable bounds={bounds} cancel=".object-draggable-map">
          <div className="object-draggable">
            <ObjectDraggableHead
              data={data}
              close={onClose}
              toggleMinimize={toggleMinimize}
            />
            <ObjectDraggableMap data={data} position={position} />
          </div>
        </Draggable>
      )}
    </>
  );
}

export default ObjectDraggable;
