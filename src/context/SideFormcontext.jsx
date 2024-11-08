import React from "react";
import { createContext, useState } from "react";
export const sideformcontext = createContext();
export default function SideFormcontext({ children }) {
  const [vehicleForm, setVehicleForm] = useState(false);
  const [display, setDisplay] = useState(false);
  const [remove, setRemove] = useState(false);

  const handleClose = () => setVehicleForm(false);
  const handleShow = () => setVehicleForm(true);

  const handleDisplay = () => setDisplay(true);
  const handleCloseDisplay = () => setDisplay(false);

  const handleRemove = () => setRemove(true);
  const handleCloseRemove = () => setRemove(false);

  return (
    <>
      <sideformcontext.Provider
        value={{
          vehicleForm,
          setVehicleForm,
          handleClose,
          handleShow,
          handleDisplay,
          display,
          handleCloseDisplay,
          handleRemove,
          handleCloseRemove,
          remove,
        }}
      >
        {children}
      </sideformcontext.Provider>
    </>
  );
}
