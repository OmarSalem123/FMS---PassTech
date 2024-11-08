/* eslint-disable react/style-prop-object */
import React, { useContext } from "react";
import Close from "../../CloseBtn/Close";
import { popupcontext } from "../../../../context/Popupscontext";

export default function FormHeader({ title }) {
  let { handleClose } = useContext(popupcontext);
  return (
    <>
      <div className="flex-between w-100">
        <div className="fs-20 fw-600 text-capitalize">{title}</div>
        <Close
          style="close-32 close"
          close={() => handleClose("form")}
          img="Close"
        />
      </div>
    </>
  );
}
