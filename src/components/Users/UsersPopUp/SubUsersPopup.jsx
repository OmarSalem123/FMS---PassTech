/* eslint-disable react/style-prop-object */
import { Modal } from "react-bootstrap";
import Popup from "../../Helpers/Popup/Popup";
import PopupTitle from "../../Helpers/Popup/PopupParts/PopupTitle";
import Close from "../../Helpers/CloseBtn/Close";

import { useContext } from "react";
import { popupcontext } from "../../../context/Popupscontext";
import Table from "../../Helpers/Table/Table";

export function SubUsersPopup({ UserId, data, id }) {
  let { handleClose } = useContext(popupcontext);
  const HeadField = ["Name", "Role", "Type", "Actions"];
  return (
    <Popup show={!!UserId}>
      <Modal.Header className="modal-header flex-between">
        <Modal.Title id="contained-modal-title-vcenter">
          <PopupTitle headtitle={`Sub-Users (${data?.length})`} />
        </Modal.Title>
        <Close
          // eslint-disable-next-line react/style-prop-object
          style="close-32 close"
          close={() => handleClose("display")}
          img="Close"
        />
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <Table
          HeadField={HeadField}
          BodyData={data}
          id={id}
          type="sub-users"
          styletableparent="sub-table-parent"
          styletable="sub-table"
        />
      </Modal.Body>
    </Popup>
  );
}
