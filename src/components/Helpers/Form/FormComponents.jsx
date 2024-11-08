import React, { useContext, useEffect } from "react";
import Form from "./Form";
import { popupcontext } from "../../../context/Popupscontext";
import FormHeader from "./FormParts/FormHeader";
import { Offcanvas } from "react-bootstrap";
import DriverBody from "../../Drivers/DriversForm/DriverBody";
import VehicleBody from "../../Vehicles/VehicleForm/VehicleBody";
import { useGetSpecificVehicleQuery } from "../../../Redux/service/Vehicles/Vehicles";
import { useGetSpecificDriverQuery } from "../../../Redux/service/Drivers/Drivers";

export function DriverForm({ onSuccess, onEdit }) {
  const { form, currentDriverId, isEditing } = useContext(popupcontext);
  const {
    refetch,
    data: driverDetails,
    isError,
  } = useGetSpecificDriverQuery(currentDriverId, {
    skip: !currentDriverId,
  });
  useEffect(() => {
    if (isEditing && currentDriverId) {
      refetch();
    }
  }, [currentDriverId, isEditing, driverDetails, refetch]);

  return (
    <>
      <Form show={form}>
        <Offcanvas.Header>
          <FormHeader title={isEditing ? "Edit Driver" : "Add new Driver"} />
        </Offcanvas.Header>
        <div className="H-line"></div>
        <Offcanvas.Body>
          <DriverBody
            onSuccess={onSuccess}
            onEdit={onEdit}
            Editvalues={driverDetails}
          />
        </Offcanvas.Body>
      </Form>
    </>
  );
}

export function VehicleForm({ onSuccess, onEdit }) {
  const { form, currentVehicleId, isEditing } = useContext(popupcontext);

  const {
    refetch,
    data: vehicleDetails,
    isError,
  } = useGetSpecificVehicleQuery(currentVehicleId, { skip: !currentVehicleId });
  useEffect(() => {
    if (isEditing && currentVehicleId) {
      refetch();
    }
  }, [currentVehicleId, isEditing, vehicleDetails, refetch]);
  return (
    <>
      <Form show={form}>
        <Offcanvas.Header>
          <FormHeader title={isEditing ? "Edit Vehicle" : "Add new vehicle"} />
        </Offcanvas.Header>
        <div className="H-line"></div>
        <Offcanvas.Body>
          <VehicleBody
            onSuccess={onSuccess}
            onEdit={onEdit}
            Editvalues={vehicleDetails?.data}
          />
        </Offcanvas.Body>
      </Form>
    </>
  );
}
