/* eslint-disable react/style-prop-object */
import React, { useContext } from "react";
import Close from "../../Helpers/CloseBtn/Close";
import { useNavigate } from "react-router-dom";
import { popupcontext } from "../../../context/Popupscontext";

export default function PlayBackHead() {
  let { setDisplay, setPosIndex, setHistoryPlayback } =
    useContext(popupcontext);
  let navigate = useNavigate();
  const handleClose = async () => {
    await setDisplay(false);
    setHistoryPlayback({ state: false, Id: 0 });
    setPosIndex(0);
    navigate("/livetracking"); // Navigate to the home page
  };
  return (
    <>
      <div className="history-playback-head">
        <div className="fs-16 fw-600 me-2">History Playback</div>

          <Close style="close close-32" img="close" close={handleClose} />
      </div>
    </>
  );
}
