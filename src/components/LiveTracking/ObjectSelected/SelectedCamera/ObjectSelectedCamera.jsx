import React from "react";
import ObjectSelectedRows from "../SelectedBody/ObjectSelectedRows";

export default function ObjectSelectedCamera() {
  return (
    <div className="object-selected-camera">
      <ObjectSelectedRows title="total cameras" item="2" />
      <div className="w-100">
        <div className="flex-between">
          <div>
            <img width={160} src="/assets/FrontCamera.svg" alt="" />
          </div>
          <div>
            <img width={160} src="/assets/FrontCamera.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
