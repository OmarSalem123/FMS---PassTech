import React, { useContext, useEffect } from "react";
import Popup from "../../Helpers/Popup/Popup";
import Loader from "../../Helpers/Loader/Loader";
import { Modal } from "react-bootstrap";
import PopupTitle from "../../Helpers/Popup/PopupParts/PopupTitle";
import Close from "../../Helpers/CloseBtn/Close";
import { popupcontext } from "../../../context/Popupscontext";
import { useGetSpecificGeofenceQuery } from "../../../Redux/service/Geofences/Geofences";
import GeofenceInf from "./GeofenceInf";

export default function GeofencePopup({ GeoId, type }) {

  let { handleClose, setSubCurrentUserId, edited } = useContext(popupcontext);
  let { data, isLoading, refetch } = useGetSpecificGeofenceQuery(GeoId, {
    skip: !GeoId,
  });
  useEffect(() => {
    if (edited) {
      refetch();
    }
  }, [edited, refetch]);
  const closeuser = () => {
    if (type === "geofence") {
      handleClose("display");
    } else {
      setSubCurrentUserId(null);
    }
  };
  return (
    <Popup show={!!GeoId}>
      {isLoading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      <Modal.Header className="modal-header flex-between">
        <Modal.Title id="contained-modal-title-vcenter">
          <PopupTitle headtitle={`${data?.name}`} />
        </Modal.Title>
        <Close
          // eslint-disable-next-line react/style-prop-object
          style="close-32 close"
          close={closeuser}
          img="Close"
        />
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <GeofenceInf values={data} />
      </Modal.Body>
    </Popup>
  );
}
