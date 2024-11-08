import React, { useContext } from "react";
import Delete from "../Delete/DeletePopup";
import { popupcontext } from "../../../context/Popupscontext";
import Display from "./Table Actions/Display";

export default function TableActions({
  vehicleId,
  DriverId,
  userId,
  subuserId,
  type,
}) {
  const { handleShow } = useContext(popupcontext);
  const handleEditClick = () => {
    if (vehicleId) {
      handleShow("editForm", "vehicles", vehicleId);
    }
    if (DriverId) {
      handleShow("editForm", "drivers", DriverId);
    }
    if (userId) {
      handleShow("editForm", "users", userId);
    }
    if (subuserId) {
      handleShow("editForm", "users", subuserId);
    }
  };

  const handleDeleteClick = () => {
    if (DriverId) {
      handleShow("deleteItem", "drivers", DriverId);
    }
    if (vehicleId) {
      handleShow("deleteItem", "vehicles", vehicleId);
    }
    if (userId) {
      handleShow("deleteItem", "users", userId);
    }
    if (subuserId) {
      handleShow("deleteItem", "subusers", subuserId);
    }
  };

  return (
    <div className="table-element bg-transparent">
      <div className="d-flex table-actions ">
        <Display
          vehicleId={vehicleId}
          DriverId={DriverId}
          userId={userId}
          subuserId={subuserId}
          type={type}
        />
        <img
          role="button"
          src="/assets/Edit.svg"
          alt="edit"
          onClick={handleEditClick}
        />
        <Delete
          vehicleId={vehicleId}
          driverId={DriverId}
          userId={userId}
          subuserId={subuserId}
          handleDeleteClick={handleDeleteClick}
        />
      </div>
    </div>
  );
}