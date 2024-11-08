import React from "react";
import { useGetSpecificDeviceQuery } from "../../../Redux/service/Devices";
import PositionsPopupsHead from "./PositionsPopupsHead";
 import PositionsPopupsBody from "./PositionsPopupsBody";

export default function PositionsPopups({ mark, lat, lon, devicestatus }) {
  console.log("mark", mark);
  let { data: DeviceData } = useGetSpecificDeviceQuery(mark?.deviceId, {
    skip: !mark?.deviceId,
  });
  console.log("Device Data", DeviceData);
  return (
    <>
      <div className="device-popup">
        <PositionsPopupsHead
          DeviceData={DeviceData}
          devicestatus={devicestatus}
          mark={mark}
        />
        <PositionsPopupsBody mark={mark} devicestatus={devicestatus} />
      </div>
    </>
  );
}
