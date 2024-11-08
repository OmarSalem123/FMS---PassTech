import { Modal } from "react-bootstrap";
import Popup from "../../../../Helpers/Popup/Popup";
import PopupTitle from "../../../../Helpers/Popup/PopupParts/PopupTitle";
import Close from "../../../../Helpers/CloseBtn/Close";

import React, { useContext, useEffect, useState } from "react";
import Table from "../../../../Helpers/Table/Table";
import Pagination from "../../../../Helpers/Pagination/Pagination";
import Button from "../../../../Helpers/Button/Button";
import { filtrationcontext } from "../../../../../context/Filtercontext";
import Searchbar from "../../../../Helpers/Searchbar/Searchbar";

const AlertPopup = ({ title, setAlertPopup }) => {
  const { limit, setLimit } = useContext(filtrationcontext);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);

  const { setAlertSearchQuery } = useContext(filtrationcontext);
  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    setQuery(e.target.value);
    setAlertSearchQuery(e.target.value);
  };

  let HeadField = [];
  let type = "";
  if (title === "Speed Alerts") {
    HeadField = [
      "Vehicle",
      "IMEI",
      "Address",
      "Speed",
      "Speed Limit",
      "Alert Time",
    ];
    type = "speedAlert";
  } else if (title === "Idle Alerts") {
    HeadField = [
      "Vehicle",
      "IMEI",
      "Address",
      "Driver",
      "Idle Time",
      "Alert Time",
    ];
    type = "idleAlert";
  } else if (title === "Power Cut") {
    HeadField = ["Vehicle", "IMEI", "Address", "Driver", "Alert Time"];
    type = "powercutAlert";
  } else if (title === "Geofences") {
    HeadField = ["Vehicle", "IMEI", "Address", "Geofence Type", "Alert Time"];
    type = "geofencesAlert";
    title = title + " Alert";
  } else if (title === "Other Alerts") {
    HeadField = ["Vehicle", "IMEI", "Address", "Alert Type", "Alert Time"];
    type = "otherAlert";
  } else if (title === "Total Alerts") {
    HeadField = ["Vehicle", "IMEI", "Address", "SOS Time", "Alert Time"];
    type = "sosAlert";
  } else {
    HeadField = ["Vehicle", "IMEI", "Address", "SOS Time", "Alert Time"];
    type = "sosAlert";
  }

  useEffect(() => {
    setLimit(5);
  }, [setLimit]);

  useEffect(() => {
    sessionStorage.setItem("page", currentPage);
  }, [currentPage]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
  };
  return (
    <Popup show={!!title}>
      <Modal.Header className="modal-header flex-between">
        <Modal.Title id="contained-modal-title-vcenter">
          <PopupTitle headtitle={`${title}`} style="" />
        </Modal.Title>
        <Close
          // eslint-disable-next-line react/style-prop-object
          style="close-32 close"
          close={() => setAlertPopup("")}
          img="Close"
        />
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <Searchbar
          style="search search-dark input-group"
          path={`${process.env.PUBLIC_URL}/assets/search.svg`}
          placeholder="Search"
          value={query}
          onChange={handleSearch}
        />
        <Table
          HeadField={HeadField}
          type={type}
          styletableparent="table-parent-popup bg-white-rounded-top-popup"
          styletable="table-popup"
          limit={limit}
          currentPage={currentPage}
          setTotalPages={setTotalPages}
          query={query}
        />
        <Pagination
          style="pagination-container-popup"
          handlePageClick={handlePageClick}
          pageCount={totalPages}
        />
        <div className="w-100 flex-row justify-end">
          <Button
            style="button btn-default object-btn p-6-12 me-2 mr-12"
            type="button"
            text={"Cancel"}
            textstyle="fs-16"
            onClick={() => setAlertPopup("")}
          />
        </div>
      </Modal.Body>
    </Popup>
  );
};

export default AlertPopup;
