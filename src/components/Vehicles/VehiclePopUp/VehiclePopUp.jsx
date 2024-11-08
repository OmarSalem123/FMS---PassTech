import { Modal } from "react-bootstrap";
import Loader from "../../Helpers/Loader/Loader";
import Popup from "../../Helpers/Popup/Popup";
import PopupTitle from "../../Helpers/Popup/PopupParts/PopupTitle";
import Close from "../../Helpers/CloseBtn/Close";
import VehicleDetails from "../VehicleInf/VehicleDetails";
import VehicleSensors from "../VehicleInf/VehicleSensors";
import VehicleAttachments from "../VehicleInf/VehicleAttachments";
import { useGetSpecificVehicleQuery } from "../../../Redux/service/Vehicles/Vehicles";
import { useContext, useEffect } from "react";
import { popupcontext } from "../../../context/Popupscontext";

export function VehiclePopup({ vehicleId }) {
  const {
    data: vehicleDetails,
    isLoading,
    refetch,
  } = useGetSpecificVehicleQuery(vehicleId , {skip: !vehicleId});
  let { edited, handleClose } = useContext(popupcontext);
  useEffect(() => {
    if (edited) {
      refetch();
    }
  }, [edited, refetch, vehicleId]);

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
          // eslint-disable-next-line react/style-prop-object
          style="close-32 close"
          close={() => handleClose("display")}
          img="Close"
        />
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <VehicleDetails values={vehicleDetails?.data} />
        <VehicleSensors values={vehicleDetails?.data} />
        {vehicleDetails?.data?.attachments?.length > 0 && (
          <VehicleAttachments values={vehicleDetails?.data?.attachments} />
        )}
      </Modal.Body>
    </Popup>
  );
}
