import React, { useContext } from "react";
import { Offcanvas } from "react-bootstrap";
import FormHeader from "../../../Helpers/Form/FormParts/FormHeader";
import { popupcontext } from "../../../../context/Popupscontext";
import ReportSheetsInput from "../ReportSheetsInput/ReportSheetsInput";
import Filter from "../../../Helpers/Filter/Filter";
import OffcanvasFooter from "../../../Helpers/Offcanvasfooter/OffcanvasFooter";

export default function ReportSheetsFilter({
  setStartDate,
  startDate,
  setEndDate,
  endDate,
  selectedUser,
  setSelectedUser,
  setSelectedVehicles,
  setIsShown,
  isShown,
}) {
  const { form } = useContext(popupcontext);
  return (
    <>
      <Filter show={form}>
        <Offcanvas.Header>
          <FormHeader title={"Report Filter"} />
        </Offcanvas.Header>
        <div className="H-line"></div>
        <Offcanvas.Body>
          <ReportSheetsInput
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setSelectedVehicles={setSelectedVehicles}
          />
          <OffcanvasFooter
            text="Show"
            isShown={isShown}
            setIsShown={setIsShown}
            val={endDate}
          />
        </Offcanvas.Body>
      </Filter>
    </>
  );
}