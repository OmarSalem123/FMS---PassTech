/* eslint-disable react/style-prop-object */
import React, { useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Close from "../CloseBtn/Close";
import { popupcontext } from "../../../context/Popupscontext";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { filtrationcontext } from "../../../context/Filtercontext";
import {
  useDeleteVehicleMutation,
  useGetAllVehiclesQuery,
} from "../../../Redux/service/Vehicles/Vehicles";

import {
  useDeleteDriverMutation,
  useGetAllDriversQuery,
} from "../../../Redux/service/Drivers/Drivers";

import { addVehicles } from "../../../Redux/service/Vehicles/VehiclesSlice";
import { addDrivers } from "../../../Redux/service/Drivers/DriversSlice";
import {
  useDeleteUserMutation,
  useGetChildUsersQuery,
} from "../../../Redux/service/Users/Users";
import {
  useDeleteGeofencesMutation,
  useGetUsersGeofencesQuery,
} from "../../../Redux/service/Geofences/Geofences";
import { useGetAllCustomVehiclesQuery } from "../../../Redux/service/Vehicles/CustomVehicles";
import { deletedGeofence } from "../../../Redux/service/Geofences/GeofenceSlice";

export default function Delete({
  vehicleId,
  driverId,
  userId,
  subuserId,
  GeoId,
  handleDeleteClick,
}) {
  const {
    currentVehicleId,
    currentDriverId,
    currentUserId,
    currentSubUserId,
    currentGeofenceId,
    handleClose,
    setDeleted,
    isDeleting,
    isEditing,
  } = useContext(popupcontext);
  const { limit } = useContext(filtrationcontext);
  const inf = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  let [deleteVehicle] = useDeleteVehicleMutation();
  let [deleteDriver] = useDeleteDriverMutation();
  let [deleteUser] = useDeleteUserMutation();
  let [deleteGeofence] = useDeleteGeofencesMutation();
  let currentPage = sessionStorage.getItem("page");

  const { data: vehiclesData, refetch: refetchVehicles } =
    useGetAllCustomVehiclesQuery(
      { page: Number(currentPage), limit },
      { skip: !currentPage || !limit }
    );
  const { data: driversData, refetch: refetchDrivers } = useGetAllDriversQuery(
    { page: Number(currentPage), limit },
    { skip: !currentPage || !limit }
  );

  const { data: usersData, refetch } = useGetChildUsersQuery(inf.id, {
    skip: !inf.id,
  });
  const { data: Geofences, refetch: Georefetch } = useGetUsersGeofencesQuery(
    inf.id,
    {
      skip: !inf.id,
    }
  );
  useEffect(() => {
    if (currentPage && limit) {
      refetchVehicles();
      refetchDrivers();
    }
  }, [currentPage, limit, refetchVehicles, refetchDrivers]);
  useEffect(() => {
    if (usersData) {
      refetch();
    }
  }, [refetch, usersData]);
  useEffect(() => {
    if (Geofences) {
      Georefetch();
    }
  }, [Georefetch, Geofences]);
  const handleRemove = async (type, id) => {
    try {
      if (type === "vehicle") {
        await deleteVehicle(id).unwrap();
        if (vehiclesData?.vehicles.length === 1 && currentPage > 1) {
          currentPage -= 1;
          sessionStorage.setItem("page", currentPage);
        }
        refetchVehicles();
        dispatch(addVehicles(vehiclesData?.vehicles));
        toast.success("Vehicle Deleted Successfully", { autoClose: 200 });
      } else if (type === "driver") {
        console.log("DriverID", id);
        await deleteDriver(id).unwrap();
        if (driversData?.drivers.length === 1 && currentPage > 1) {
          currentPage -= 1;
          sessionStorage.setItem("page", currentPage);
        }
        refetchDrivers();
        dispatch(addDrivers(driversData.drivers));
        toast.success("Driver Deleted Successfully", { autoClose: 200 });
      } else if (type === "user") {
        await deleteUser(id).unwrap();
        refetch();
        toast.success("User Deleted Successfully", { autoClose: 200 });
      } else if (type === "subuser") {
        await deleteUser(id).unwrap();
        refetch();
        toast.success("User Deleted Successfully", { autoClose: 200 });
      } else if (type === "geofence") {
        await deleteGeofence(id).unwrap();
        dispatch(deletedGeofence(id));

        toast.success("Geofence Deleted Successfully", { autoClose: 200 });
      }
      setDeleted(true);
      handleClose("deleting");
    } catch (error) {
      toast.error(`Error: ${error}`, { autoClose: 300 });
    }
  };

  const getDeleteType = () => {
    if (currentSubUserId) {
      return "subuser";
    } else if (vehicleId && currentVehicleId === vehicleId) {
      return "vehicle";
    } else if (driverId && currentDriverId === driverId) {
      return "driver";
    } else if (userId && currentUserId === userId) {
      return "user";
    } else if (GeoId && currentGeofenceId === GeoId) {
      return "geofence";
    }
    return null;
  };

  const Remove = () => {
    if (deleteType === "vehicle") {
      handleRemove(deleteType, vehicleId);
    }
    if (deleteType === "driver") {
      handleRemove(deleteType, driverId);
    }
    if (deleteType === "user") {
      handleRemove(deleteType, userId);
    }
    if (deleteType === "subuser") {
      handleRemove(deleteType, currentSubUserId);
    }
    if (deleteType === "geofence") {
      handleRemove(deleteType, currentGeofenceId);
    }
  };
  const deleteType = getDeleteType();

  return (
    <>
      <img
        role="button"
        src="/assets/Delete.svg"
        alt="delete"
        onClick={handleDeleteClick}
      />

      {deleteType && isDeleting && !isEditing && (
        <Modal show={isDeleting} centered>
          <Modal.Header>
            <div className="flex-between w-100">
              <Modal.Title>Delete</Modal.Title>
              <Close
                style="close-32 close"
                close={() => handleClose("deleting")}
                img="Close"
              />
            </div>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this {deleteType}?
          </Modal.Body>
          <Modal.Footer>
            <Button
              style="button p-6-12 btn-default"
              onClick={() => handleClose("deleting")}
              text="Cancel"
            />
            <Button
              style="button p-6-12 btn-danger"
              text="Delete"
              onClick={Remove}
            />
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
