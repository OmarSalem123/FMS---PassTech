import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { sidebarcontext } from "../../../../context/Sidebarcontext";

export default function SelectionItem({ path, name, icon }) {
  let { setDropActive, setSelectionActive } = useContext(sidebarcontext);
  const handleClick = () => {
    setDropActive(false);
    setSelectionActive(true);
  };
  return (
    <>
      <NavLink
        to={path}
        className="select-item flex-center"
        onClick={handleClick}
      >
        <div className="select-icons">
          <img className="icons" src={`${process.env.PUBLIC_URL}/assets/dark/${icon}.svg`} alt={name} />
        </div>
        <p className="select-text">{name}</p>
      </NavLink>
    </>
  );
}
