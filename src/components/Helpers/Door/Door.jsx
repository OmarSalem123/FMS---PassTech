import React from "react";

export default function Door() {
  return (
    <>
      <div className="d-flex">
        <div className="me-4">
          <img src="/assets/DoorOpen.svg" alt="" />
        </div>
        <div>
          <img src="/assets/DoorClose.svg" alt="" />
        </div>
      </div>
    </>
  );
}
