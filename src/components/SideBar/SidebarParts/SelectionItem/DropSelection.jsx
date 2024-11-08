import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { sidebarcontext } from "../../../../context/Sidebarcontext";

export default function DropSelection({ selectitem, path }) {
  let { setDropActive, setSelectionActive } = useContext(sidebarcontext);
  const handleClick = () => {
    setDropActive(true);
    setSelectionActive(false);
  };
  return (
    <>
      <NavLink className="dropdown-select" to={path} onClick={handleClick}>
        <div className="ms-3 py-2 select-text">{selectitem}</div>
      </NavLink>
    </>
  );
}
