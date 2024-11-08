import React from "react";
import Modal from "react-bootstrap/Modal";

export default function Popup({ size, show, children, style }) {
  return (
    <>
      <Modal
        size={size ? size : "lg"}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={`popup ${style}`}
        show={show}
        backdrop="static"
      >
        {children}
      </Modal>
    </>
  );
}
