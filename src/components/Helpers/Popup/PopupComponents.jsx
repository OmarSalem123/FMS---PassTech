/* eslint-disable react/style-prop-object */
import React, { useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Close from "../CloseBtn/Close";
import VehicleDetails from "../../Vehicles/VehicleInf/VehicleDetails";
import VehicleSensors from "../../Vehicles/VehicleInf/VehicleSensors";
import Popup from "./Popup";
import PopupTitle from "./PopupParts/PopupTitle";
import DriverDetails from "../../Drivers/DriversInf/DriverDetails";
import { popupcontext } from "../../../context/Popupscontext";
import DriverAttachment from "../../Drivers/DriversInf/DriverAttachment";
import { useGetSpecificVehicleQuery } from "../../../Redux/service/Vehicles/Vehicles";
import Loader from "../Loader/Loader";
import VehicleAttachments from "../../Vehicles/VehicleInf/VehicleAttachments";
import { useGetSpecificDriverQuery } from "../../../Redux/service/Drivers/Drivers";

export function VehiclePopup({ vehicleId }) {
  console.log("IDDDDDDs" , vehicleId)
  const {
    data: vehicleDetails,
    isLoading,
    refetch,
    error
  } = useGetSpecificVehicleQuery(vehicleId);
  let { edited, handleClose } = useContext(popupcontext);
  useEffect(() => {
    if (edited) {
      refetch();
    }
  }, [edited, refetch, vehicleId]);
console.log("details",vehicleDetails)
console.log("Error",error)
  return (
    <Popup show={!!vehicleId}>
      {isLoading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      <Modal.Header className="modal-header flex-between">
        <Modal.Title id="contained-modal-title-vcenter">
          <PopupTitle
            vehicleimg="Car.svg"
            headtitle={`${vehicleDetails?.data?.name}`}
            subtitle={`${vehicleDetails?.data?.vehicleType}`}
          />
        </Modal.Title>
        <Close
          style="close-32 close"
          close={() => handleClose("display")}
          img="Close"
        />
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <VehicleDetails values={vehicleDetails?.data} />
        <VehicleSensors values={vehicleDetails?.data} />
        {vehicleDetails?.data?.attachments && vehicleDetails.data.attachments.length > 0 ? (
    <VehicleAttachments values={vehicleDetails.data.attachments} />
  ) : null} 
      </Modal.Body>
    </Popup>
  );
}

export function DriverPopup({ DriverId }) {
  let { edited, handleClose } = useContext(popupcontext);
  const defaultImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";
  const {
    data: driveDetails,
    isLoading,
    refetch,
  } = useGetSpecificDriverQuery(DriverId);
  useEffect(() => {
    if (edited) {
      refetch();
    }
  }, [edited, refetch, DriverId]);

  return (
    <Popup show={!!DriverId}>
      {isLoading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      <Modal.Header className="modal-header flex-between">
        <Modal.Title id="contained-modal-title-vcenter">
          <PopupTitle
            driverimg={
              driveDetails?.picture !== null
                ? `${driveDetails?.picture}`
                : defaultImage
            }
            headtitle={`${driveDetails?.name}`}
            subtitle="truck driver"
          />
        </Modal.Title>
        <Close
          style="close-32 close"
          close={() => handleClose("display")}
          img="Close"
        />
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <DriverDetails values={driveDetails} />
        <DriverAttachment values={driveDetails} />
      </Modal.Body>
    </Popup>
  );
}
