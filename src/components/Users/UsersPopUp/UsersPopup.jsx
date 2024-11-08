/* eslint-disable react/style-prop-object */
import { Modal } from "react-bootstrap";
import Popup from "../../Helpers/Popup/Popup";
import PopupTitle from "../../Helpers/Popup/PopupParts/PopupTitle";
import Close from "../../Helpers/CloseBtn/Close";

import { useContext, useEffect } from "react";
import { popupcontext } from "../../../context/Popupscontext";
import { useGetSpecificUserQuery } from "../../../Redux/service/Users/Users";
import UserInf from "../UserInf/UserInf";
import Loader from "../../Helpers/Loader/Loader";

export function UsersPopup({ userId, type }) {
  let { handleClose, setSubCurrentUserId, edited } = useContext(popupcontext);
  let { data, isLoading, refetch } = useGetSpecificUserQuery(userId, {
    skip: !userId,
  });
  useEffect(() => {
    if (edited) {
      refetch();
    }
  }, [edited, refetch]);
  const closeuser = () => {
    if (type === "user") {
      handleClose("display");
    } else {
      setSubCurrentUserId(null);
    }
  };
  return (
    <Popup show={!!userId}>
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
        <UserInf values={data} />
      </Modal.Body>
    </Popup>
  );
}
