import { Modal } from "react-bootstrap";
import Popup from "../../../../Helpers/Popup/Popup";
import PopupTitle from "../../../../Helpers/Popup/PopupParts/PopupTitle";
import Close from "../../../../Helpers/CloseBtn/Close";

import React from "react";
import PopupBodyContent from "./PopupBody/PopupBody";

const SelectedControlsPopups = ({
  title,
  setControlsPopup,
  device,
  setIsControlsPopup,
}) => {
  const handleClose = () => {
    setControlsPopup("");
    setIsControlsPopup(false);
  };
  let popupSize;
  if (title === "set speed limit" || title === "set geofence") {
    popupSize = "sm";
  } else if (title === "start engine" || title === "stop engine") {
    popupSize = " ";
  } else {
    popupSize = "";
  }

  return (
    <Popup show={!!title} size={popupSize}>
      <Modal.Header className="modal-header flex-between">
        <Modal.Title id="contained-modal-title-vcenter">
          <PopupTitle headtitle={`${title}`} />
        </Modal.Title>
        <Close
          // eslint-disable-next-line react/style-prop-object
          style="close-32 close"
          close={handleClose}
          img="Close"
        />
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <PopupBodyContent
          title={title}
          device={device}
          setControlsPopup={setControlsPopup}
          setIsControlsPopup={setIsControlsPopup}
        />
      </Modal.Body>
    </Popup>
  );
};

export default SelectedControlsPopups;
