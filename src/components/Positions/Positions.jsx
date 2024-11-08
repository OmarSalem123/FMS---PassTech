/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import PositionsPopups from "./Positions-Popups/PositionsPopups";
import { useSelector, useDispatch } from "react-redux";
import { setDevices, setPositions } from "../../Redux/service/Websocket";
import { webSocketManager } from "../../Sockets/WebSocketManager";
import "leaflet-rotatedmarker";
import { filtrationcontext } from "../../context/Filtercontext";
import { useLazyGetUsersDeviceQuery } from "../../Redux/service/Devices";

const MemoizedMarker = React.memo(({ mark, deviceStatus, url }) => {
  return (
    <Marker
      position={[mark.latitude, mark.longitude]}
      icon={
        new Icon({
          iconUrl: url,
          iconSize: [48, 48],
          shadowAnchor: [4, 62],
          popupAnchor: [-3, -20],
        })
      }
      rotationAngle={mark.course}
      rotationOrigin="center"
      interactive={true}
    >
      <Popup closeOnEscapeKey autoPan={false}>
        <PositionsPopups
          mark={mark}
          lat={mark.latitude}
          lon={mark.longitude}
          devicestatus={deviceStatus}
        />
      </Popup>
    </Marker>
  );
});

export default function Positions() {
  const dispatch = useDispatch();
  const positions = useSelector((state) => state.webSocket.positions);
  const devices = useSelector((state) => state.webSocket.devices);
  const [deviceStatus, setDeviceStatus] = useState({});
  const { parentCheck, childCheck, filter } = useContext(filtrationcontext);
  const [getUsersDevice, { data: filteredDevicesData }] =
    useLazyGetUsersDeviceQuery();

  const [filteredDeviceIds, setFilteredDeviceIds] = useState([]);

  Icon.Default.mergeOptions({
    iconUrl: "https://www.svgrepo.com/show/513317/location-pin.svg",
  });

  const webSocketData = useSelector((state) => state.webSocket.data);

  useEffect(() => {
    if (document.cookie.includes("JSESSIONID")) {
      webSocketManager.connect();
    }
  }, []);

  useEffect(() => {
    if (webSocketData) {
      const updatedDevices = [...devices];
      webSocketData?.devices?.forEach((newDevice) => {
        const existingIndex = updatedDevices.findIndex(
          (device) => device.id === newDevice.id
        );
        if (existingIndex >= 0) {
          updatedDevices[existingIndex] = newDevice;
        } else {
          updatedDevices.push(newDevice);
        }
      });
      dispatch(setDevices(updatedDevices));

      const updatedPositions = [...positions];
      webSocketData?.positions?.forEach((newPosition) => {
        const existingIndex = updatedPositions.findIndex(
          (pos) => pos.deviceId === newPosition.deviceId
        );
        if (existingIndex >= 0) {
          updatedPositions[existingIndex] = newPosition;
        } else {
          updatedPositions.push(newPosition);
        }
        const device = updatedDevices.find(
          (device) => device.id === newPosition.deviceId
        );
        if (device) {
          setDeviceStatus((prevStatus) => ({
            ...prevStatus,
            [device.id]: device.status !== "offline",
          }));
        }
      });
      dispatch(setPositions(updatedPositions));
    }
  }, [webSocketData]);

  useEffect(() => {
    if (filter && (parentCheck.length > 0 || childCheck.length > 0)) {
      const idsToFetch = [...parentCheck, ...childCheck];
      getUsersDevice(idsToFetch);
    } else if (!filter) {
      setFilteredDeviceIds([]);
    }
  }, [parentCheck, childCheck, filter]);
  useEffect(() => {
    if (filteredDevicesData) {
      const ids = filteredDevicesData.map((device) => device.id);
      setFilteredDeviceIds(ids);
    }
  }, [filteredDevicesData]);

  const getIconUrl = (deviceId) => {
    const device = devices.find((i) => i.id === deviceId);
    if (device && device.status === "online") {
      return "/assets/CarOnline.svg";
    } else {
      return "/assets/CarOffline.svg";
    }
  };

  const filteredPositions = positions.filter((pos) => {
    if (filteredDeviceIds.length > 0) {
      return filteredDeviceIds.includes(pos.deviceId);
    }
    return true;
  });

  return (
    <>
      <MarkerClusterGroup chunkedLoading>
        {filteredPositions.map((mark) => (
          <MemoizedMarker
            key={`${mark.deviceId}-${mark.course}`}
            mark={mark}
            url={getIconUrl(mark.deviceId)}
            deviceStatus={deviceStatus[mark.deviceId] || false}
          />
        ))}
      </MarkerClusterGroup>
    </>
  );
}