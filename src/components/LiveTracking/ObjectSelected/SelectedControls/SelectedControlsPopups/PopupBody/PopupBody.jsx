import React from "react";
import SetGeofence from "./SetGeofence/SetGeofence";
import SetSpeedLimit from "./SetSpeedLimit/SetSpeedLimit";
import StartEngine from "./startEngine/StartEngine";
import StopEngine from "./stopEngine/StopEngine";

const PopupBodyContent = ({
  title,
  device,
  setControlsPopup,
  setIsControlsPopup,
}) => {
  switch (title) {
    case "set geofence":
      return <SetGeofence title={title} device={device} />;

    case "set speed limit":
      return (
        <SetSpeedLimit
          title={title}
          device={device}
          setControlsPopup={setControlsPopup}
          setIsControlsPopup={setIsControlsPopup}
        />
      );

    case "start engine":
      return (
          <StartEngine
          title={title}
          device={device}
          setControlsPopup={setControlsPopup}
          setIsControlsPopup={setIsControlsPopup}
        />
      );
      case "stop engine":
        return (
            <StopEngine
            title={title}
            device={device}
            setControlsPopup={setControlsPopup}
            setIsControlsPopup={setIsControlsPopup}
          />
        );
  
    default:
      return <></>;
  }
};

export default PopupBodyContent;
