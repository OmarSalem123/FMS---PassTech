import React, { useContext } from "react";
import { draggablecontext } from "../../../../context/Draggablecontext";
import { useSelector } from "react-redux";
import ObjectDraggableMinimized from "./ObjectDraggableMinimized";
import ObjectDraggable from "./ObjectDraggable";

export default function ObjectFocus() {
  const positions = useSelector((state) => state.webSocket.positions);

  let {
    handleCloseDraggable,
    toggleMinimize,
    draggableObjects,
    draggableData,
    minimizedStates,
    minimizedOrder,
  } = useContext(draggablecontext);
  return (
    <>
      <div className="object-draggable-container">
        {draggableObjects.map((id, index) => {
          const data = draggableData.find((item) => item.id === id);
          const position = positions.find(
            (position) => position.deviceId === id
          );
          const isMinimized = minimizedStates[id];
          return (
            <ObjectDraggable
              key={id}
              data={data}
              position={position}
              onClose={() => handleCloseDraggable(id)}
              minimized={isMinimized}
              toggleMinimize={() => toggleMinimize(id)}
              index={minimizedOrder.indexOf(id)}
            />
          );
        })}
      </div>
      <div className="object-draggable-mini-container">
        {draggableObjects.map((id, index) => {
          const data = draggableData.find((item) => item.id === id);
          const isMinimized = minimizedStates[id];
          return (
            isMinimized && (
              <ObjectDraggableMinimized
                data={data}
                close={() => handleCloseDraggable(id)}
                toggleMinimize={() => toggleMinimize(id)}
                index={index}
              />
            )
          );
        })}
      </div>
    </>
  );
}
