import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function Form({ show, children }) {
  return (
    <>
      <Offcanvas
        show={show}
        backdrop="static"
        placement="end"
        className="form-width overflow-y-scroll"
      >
        {children}
      </Offcanvas>
    </>
  );
}
