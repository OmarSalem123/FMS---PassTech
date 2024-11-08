import { useContext, useEffect } from "react";
import { popupcontext } from "../../../context/Popupscontext";
import { useGetSpecificVehicleQuery } from "../../../Redux/service/Vehicles/Vehicles";
import Form from "../../Helpers/Form/Form";
import { Offcanvas } from "react-bootstrap";
import FormHeader from "../../Helpers/Form/FormParts/FormHeader";
import VehicleBody from "./VehicleBody";

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
