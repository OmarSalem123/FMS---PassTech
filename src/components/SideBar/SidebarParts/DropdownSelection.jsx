import React, { useContext, useState, useEffect } from "react";
import SelectionItem from "./SelectionItem/SelectionItem";
import DropMenu from "./SelectionItem/DropMenu";
import DropSelection from "./SelectionItem/DropSelection";
import { sidebarcontext } from "../../../context/Sidebarcontext";

export default function DropdownSelection() {
  let { setIsSideOpen } = useContext(sidebarcontext);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to handle window resizing
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call once to set initial width
    handleResize();

    // Cleanup the event listener when component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (dropdown) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdown);
      setIsSideOpen(true);
    }
  };

  return (
    <>
      <div className="select-items">
        {windowWidth >= 575 && (
          <>
            <DropMenu
              title="fleet management"
              img="fleetmanagement"
              openDropdown={openDropdown}
              toggleDropdown={toggleDropdown}
            >
              <DropSelection
                selectitem="vehicles"
                path="/fleetmanagement/vehicles"
              />
              <DropSelection
                selectitem="drivers"
                path="/fleetmanagement/drivers"
              />
            </DropMenu>
            <DropMenu
              title="finance"
              img="finance"
              openDropdown={openDropdown}
              toggleDropdown={toggleDropdown}
            >
              <DropSelection
                selectitem="purchasing"
                path="/finance/purchasing"
              />
              <DropSelection selectitem="selling" path="/finance/selling" />
              <DropSelection selectitem="expenses" path="/finance/expenses" />
            </DropMenu>
            <DropMenu
              title="administration"
              img="administration"
              openDropdown={openDropdown}
              toggleDropdown={toggleDropdown}
            >
              <DropSelection
                selectitem="users & roles"
                path="users&roles"
              />
            </DropMenu>
            <DropMenu
              title="entities"
              img="entities"
              openDropdown={openDropdown}
              toggleDropdown={toggleDropdown}
            >
              <DropSelection
                selectitem="showrooms"
                path="/entities/showrooms"
              />
              <DropSelection
                selectitem="workshops"
                path="/entities/workshops"
              />
            </DropMenu>{" "}
            <SelectionItem path="settings" icon="settings" name="settings" />
          </>
        )}
      </div>
    </>
  );}