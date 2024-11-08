import React, { createContext, useState } from "react";
export const draggablecontext = createContext();

export default function Draggablecontext({ children }) {
  const [selectedId, setSelectedId] = useState(null);
  const [imei, setImei] = useState(null);
  const [draggableObjects, setDraggableObjects] = useState([]);
  const [draggableData, setDraggableData] = useState([]);
  const [minimizedStates, setMinimizedStates] = useState({});
  const [minimizedOrder, setMinimizedOrder] = useState([]);
  const handleFocusClick = (id, imei, data) => {
    setSelectedId(id);
    setImei(imei);
    setDraggableData((prev) => {
      const isAlreadySelected = prev.some((item) => item.id === id);
      if (isAlreadySelected) {
        return prev.filter((item) => item.id !== id);
      } else {
        return [...prev, data];
      }
    });
    setDraggableObjects((prev) => {
      if (prev.includes(id)) {
        return prev.filter((objId) => objId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleCloseDraggable = (id) => {
    setDraggableObjects((prev) => prev.filter((objId) => objId !== id));
    setDraggableData((prev) => prev.filter((item) => item.id !== id));
    setMinimizedStates((prev) => ({ ...prev, [id]: false }));
    setMinimizedOrder((prev) => prev.filter((item) => item !== id));
  };

  const toggleMinimize = (id) => {
    setMinimizedStates((prev) => {
      const newState = {
        ...prev,
        [id]: !prev[id],
      };

      if (newState[id]) {
        setMinimizedOrder((prev) => [...prev, id]);
      } else {
        setMinimizedOrder((prev) => prev.filter((item) => item !== id));
      }

      return newState;
    });
  };
  return (
    <>
      <draggablecontext.Provider
        value={{
          handleFocusClick,
          handleCloseDraggable,
          toggleMinimize,
          setSelectedId,
          selectedId,
          setImei,
          imei,
          draggableObjects,
          draggableData,
          minimizedStates,
          minimizedOrder,
        }}
      >
        {children}
      </draggablecontext.Provider>
    </>
  );
}
