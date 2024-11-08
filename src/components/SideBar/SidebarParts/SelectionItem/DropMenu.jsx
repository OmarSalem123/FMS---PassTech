import React, { useContext } from "react";
import { sidebarcontext } from "../../../../context/Sidebarcontext";

export default function DropMenu({
  title,
  img,
  children,
  openDropdown,
  toggleDropdown,
  isSideOpen, // Pass this as a prop
}) {
  const { dropActive, setDropActive } = useContext(sidebarcontext);

  // Toggle dropdown logic
  const handleDropdownClick = () => {
    if (openDropdown === title) {
      // If the dropdown is already open, close it
      toggleDropdown(null);
    } else {
      // Otherwise, open the clicked dropdown and ensure the sidebar is open
      toggleDropdown(title);
      setDropActive(true); // Set dropActive when opening a dropdown
    }
  };

  // Class names based on dropdown state
  const dropdownContentClass =
    openDropdown === title
      ? "dropdown-content show container"
      : "dropdown-content hide";

  const iconBackgroundClass =
    !isSideOpen && openDropdown === title && dropActive
      ? "icon-background-active"
      : "";

  return (
    <>
      <div
        role="button"
        className={`select-item flex-center ${iconBackgroundClass}`}
        onClick={handleDropdownClick}
      >
        <div className="select-icons">
          <img className="icons" src={`/assets/dark/${img}.svg`} alt={title} />
        </div>
        <p className="select-text">{title}</p>
        <div className="arrow">
          <img
            src={
              openDropdown === title
                ? "/assets/dark/uparrow.svg"
                : "/assets/dark/downarrow.svg"
            }
            alt="arrow"
          />
        </div>
      </div>
      {openDropdown === title && (
        <div className={dropdownContentClass}>{children}</div>
      )}
    </>
  );
}
