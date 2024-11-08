import React, { createContext, useState } from "react";
export const sidebarcontext = createContext();
export default function Sidebarcontext({ children }) {
  const [isSideOpen, setIsSideOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectionActive, setSelectionActive] = useState(false);
  const [dropActive, setDropActive] = useState(false);
  const handleToggle = () => {
    setIsSideOpen(!isSideOpen);
  };

  return (
    <>
      <sidebarcontext.Provider
        value={{
          isSideOpen,
          setIsSideOpen,
          handleToggle,
          openDropdown,
          setOpenDropdown,
          selectionActive,
          setSelectionActive,
          dropActive,
          setDropActive,
        }}
      >
        {children}
      </sidebarcontext.Provider>
    </>
  );
}
