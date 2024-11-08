import { useContext, useEffect } from "react";
import { popupcontext } from "../../../context/Popupscontext";
import { useGetSpecificDriverQuery } from "../../../Redux/service/Drivers/Drivers";
import Form from "../../Helpers/Form/Form";
import { Offcanvas } from "react-bootstrap";
import FormHeader from "../../Helpers/Form/FormParts/FormHeader";
import DriverBody from "./DriverBody";

export function DriverForm({ onSuccess, onEdit }) {
  const { form, currentDriverId, isEditing } = useContext(popupcontext);
  const {
    refetch,
    data: driverDetails,
    isError,
  } = useGetSpecificDriverQuery(currentDriverId, {
    skip: !currentDriverId,
  });
  if (isError) console.log("Error");
  useEffect(() => {
    if (isEditing && currentDriverId) {
      refetch();
      console.log("driverDetails");
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
            Editvalues={driverDetails?.data}
          />
        </Offcanvas.Body>
      </Form>
    </>
  );
}
