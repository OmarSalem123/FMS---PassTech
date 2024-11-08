import { Modal } from "react-bootstrap";
import Loader from "../../Helpers/Loader/Loader";
import Popup from "../../Helpers/Popup/Popup";
import PopupTitle from "../../Helpers/Popup/PopupParts/PopupTitle";
import Close from "../../Helpers/CloseBtn/Close";
import DriverDetails from "../DriversInf/DriverDetails";
import DriverAttachment from "../DriversInf/DriverAttachment";
import { useGetSpecificDriverQuery } from "../../../Redux/service/Drivers/Drivers";
import { useContext, useEffect } from "react";
import { popupcontext } from "../../../context/Popupscontext";

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
  console.log("DriverId", DriverId);
  console.log("driveDetails", driveDetails);
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
              driveDetails?.data?.picture !== null
                ? `${driveDetails?.data?.picture}`
                : defaultImage
            }
            headtitle={`${driveDetails?.data?.name}`}
            subtitle="truck driver"
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
        <DriverDetails values={driveDetails?.data} />
        <DriverAttachment values={driveDetails?.data} />
      </Modal.Body>
    </Popup>
  );
}
