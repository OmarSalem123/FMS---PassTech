import React, { useContext } from "react";
import { popupcontext } from "../../../../context/Popupscontext";
import { DriverPopup } from "../../../Drivers/DriverPopUp/DriverPopUp";
import { VehiclePopup } from "../../../Vehicles/VehiclePopUp/VehiclePopUp";
import { UsersPopup } from "../../../Users/UsersPopUp/UsersPopup";
import GeofencePopup from "../../../Geofences/GeofencePopup/GeofencePopup";

export default function Display({
  vehicleId,
  DriverId,
  userId,
  subuserId,
  GeoId,
  type,
}) {
  const {
    currentVehicleId,
    currentDriverId,
    currentUserId,
    currentSubUserId,
    currentGeofenceId,
    showDetails,
    isDeleting,
    isEditing,
    setIsDeleting,
    setuserPopup,
    userPopup,
  } = useContext(popupcontext);

  const handleDisplayClick = () => {
    if (isDeleting) {
      setIsDeleting(false);
    }
    if (vehicleId) showDetails("vehicles", vehicleId);

    if (DriverId) {
      showDetails("drivers", DriverId);
    }
    if (userId) {
      showDetails("users", userId);
      setuserPopup(true);
    }
    if (subuserId) {
      showDetails("subusers", subuserId);
    }
    if (GeoId) {
      showDetails("geofences", GeoId);
    }
  };

  return (
    <>
      <img
        role="button"
        src="/assets/Eye.svg"
        alt="show"
        onClick={handleDisplayClick}
      />
      {currentVehicleId === vehicleId &&
        isEditing === false &&
        isDeleting === false && <VehiclePopup vehicleId={currentVehicleId} />}

      {currentDriverId === DriverId &&
        isEditing === false &&
        isDeleting === false && <DriverPopup DriverId={currentDriverId} />}
      {currentUserId === userId &&
        isEditing === false &&
        isDeleting === false &&
        userPopup === true && <UsersPopup userId={currentUserId} type="user" />}
      {currentSubUserId === subuserId &&
        isEditing === false &&
        isDeleting === false && (
          <UsersPopup userId={currentSubUserId} type="subuser" />
        )}
      {currentGeofenceId === GeoId &&
        isEditing === false &&
        isDeleting === false && (
          <GeofencePopup GeoId={currentGeofenceId} type="geofence" />
        )}
    </>
  );
}
