import React, { useContext, useState } from "react";
import SelectedControlsPopups from "./SelectedControlsPopups/SelectedControlsPopups";
import { popupcontext } from "../../../../context/Popupscontext";

export default function ObjectSelectedOptions({
  option1,
  option2,
  device,
  disabled,
}) {
  const [controlsPopup, setControlsPopup] = useState("");
  const { setIsControlsPopup } = useContext(popupcontext);
  const onClick = (option) => {
    if (!disabled) {
      setControlsPopup(option);
      setIsControlsPopup(true);
    }
  };
  return (
    <>
      {controlsPopup && (
        <SelectedControlsPopups
          title={controlsPopup}
          setControlsPopup={setControlsPopup}
          setIsControlsPopup={setIsControlsPopup}
          device={device}
        />
      )}

      <div className="d-flex object-selected-options">
        <div
          className={`text-capitalize p-8-16 border-100 me-1 ${
            !disabled ? "hover-green" : "disabled-bg"
          }`}
          onClick={() => onClick(option1)}
        >
          {option1}
        </div>
        {option2 ? (
          <div
            className={`text-capitalize p-8-16 border-100 me-1 ${
              !disabled ? "hover-green" : "disabled-bg"
            }`}
            onClick={() => onClick(option2)}
          >
            {option2}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
