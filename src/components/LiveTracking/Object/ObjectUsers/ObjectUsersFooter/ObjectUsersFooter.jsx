/* eslint-disable react/style-prop-object */
import React, { useContext, useEffect } from "react";
import { popupcontext } from "../../../../../context/Popupscontext";
import Button from "../../../../Helpers/Button/Button";
import { filtrationcontext } from "../../../../../context/Filtercontext";

export default function ObjectUsersFooter() {
  const { handleClose } = useContext(popupcontext);
  const {
    setChecked,
    setFilter,
    setSearchQuery,
    childCheck,
    setChildCheck,
    parentCheck,
    setParentCheck,
  } = useContext(filtrationcontext);

  const handleReset = () => {
    setFilter(false);
    sessionStorage.removeItem("UserFiltration");
    setChecked([]);
    setChildCheck([]);
    setParentCheck([]);
    setSearchQuery("");
  };

  const handleShow = () => {
    setFilter(true);
    handleClose("objectUsers");
    setSearchQuery("");
    setChecked([]);
  };

  useEffect(() => {
    const wasReloaded = sessionStorage.getItem("pageReloaded");
    if (wasReloaded) {
      sessionStorage.removeItem("pageReloaded");
      setChecked([]);
    } else {
      sessionStorage.setItem("pageReloaded", "true");
    }
  }, [setChecked, setFilter]);

  return (
    <div className="px-3 pb-3 flex-between">
      <div className="filter-selection">
        {childCheck.length + parentCheck.length} Selected
      </div>
      <div className="flex-between">
        <Button
          style="button btn-default object-btn p-6-16 me-2"
          type="button"
          text="Reset"
          textstyle="fs-16"
          onClick={handleReset}
        />
        <Button
          style="button btn-success p-6-16"
          type="button"
          text="Show Vehicles"
          textstyle="fs-16"
          onClick={handleShow}
          //disabled={checked.length === 0 ? true : false}
        />
      </div>
    </div>
  );
}
