import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function Filter({ show, children }) {
  return (
    <>
      <Offcanvas
        show={show}
        backdrop="static"
        placement="end"
        className="filter-width overflow-y-scroll"
      >
        {children}
      </Offcanvas>
    </>
  );
}
