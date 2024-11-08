import React, { useContext } from "react";
import ObjectSelectedHead from "./SelectedHead/ObjectSelectedHead";
import { popupcontext } from "../../../context/Popupscontext";
import ObjectMinimized from "../Object/ObjectMinimized/ObjectMinimized";
import ObjectSelectedTabs from "./SelectedBody/ObjectSelectedTabs";
import { useGetSpecificVehicleImeiQuery } from "../../../Redux/service/Vehicles/Vehicles";
import ObjectSelectedMap from "./SelectedMap/ObjectSelectedMap";

export default function ObjectSelected({ imei, device, position }) {
  let { objectselect, handleShowSelected } = useContext(popupcontext);
  let { data: Vehicles } = useGetSpecificVehicleImeiQuery(imei);

  return (
    <>
      {objectselect ? (
        <div className="bg-white-rounded p-0 object-selected">
          <div className="streetview">
            <ObjectSelectedHead values={Vehicles} device={device} />
          </div>
          <ObjectSelectedMap
            values={Vehicles}
            device={device}
            position={position}
          />

          <ObjectSelectedTabs
            title="vehicle details"
            img="Cardetails"
            values={Vehicles}
            device={device}
          />
          <ObjectSelectedTabs
            title="working status"
            img="Carbattery"
            values={Vehicles}
            device={device}
            position={position}
          />
          <ObjectSelectedTabs
            title="sensors"
            img="Sensors"
            position={position}
            CarSensors={Vehicles}
          />
          <ObjectSelectedTabs title="controls" img="Control" device={device}/>
          {/**<ObjectSelectedTabs title="camera" img="Camera" />**/}
        </div>
      ) : objectselect === false ? (
        <ObjectMinimized title="vehicle" minimize={handleShowSelected} />
      ) : (
        ""
      )}
    </>
  );
}
