import React from "react";

export default function PlayBackTableHead() {
  return (
    <>
      <div className="history-playback-head">
        <div className="fs-16 fw-600 me-2">Speed Time</div>
        <div>
          <img src="/assets/Download2.svg" alt="Download" className="me-2" />
          <img src="/assets/Fullscreen.svg" alt="Fullscreen" />
        </div>
      </div>
    </>
  );
}
