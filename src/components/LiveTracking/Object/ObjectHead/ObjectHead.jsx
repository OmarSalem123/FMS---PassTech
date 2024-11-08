import React, { useContext, useEffect, useState } from "react";
import { popupcontext } from "../../../../context/Popupscontext";
import {
  useGetAllDevicesQuery,
  useLazyGetUsersDeviceQuery,
} from "../../../../Redux/service/Devices";
import { filtrationcontext } from "../../../../context/Filtercontext";
import { useMap } from "react-leaflet";
import { useLocation } from "react-router-dom";
import { useGetUsersGeofencesQuery } from "../../../../Redux/service/Geofences/Geofences";
import { useSelector } from "react-redux";

export default function ObjectHead() {
  const map = useMap();
  let inf = useSelector((state) => state.users.user);
  let { handleClose, setObjectselect } = useContext(popupcontext);
  const [offlineCount, setOfflineCount] = useState(0);
  const [onlineCount, setOnlineCount] = useState(0);
  const { parentCheck, childCheck } = useContext(filtrationcontext);

  const [getUsersDevice] = useLazyGetUsersDeviceQuery();
  const { data: allDevices } = useGetAllDevicesQuery();
  const { data: Geofences } = useGetUsersGeofencesQuery(inf.id, {
    skip: !inf.id,
  });
  let { pathname } = useLocation();
  const handleClick = () => {
    handleClose("object");
    setObjectselect(false);
    map.dragging.enable();
  };

  useEffect(() => {
    const fetchDataForIds = async () => {
      let offline = 0;
      let online = 0;
      const ids = [...parentCheck, ...childCheck];
      const promises = ids.map((id) =>
        getUsersDevice(id)
          .unwrap()
          .then((devices) => {
            devices.forEach((device) => {
              if (device.status === "offline" || device.status === "unknown") {
                offline++;
              } else {
                online++;
              }
            });
          })
          .catch((error) => {
            console.error(`Error fetching devices for userId ${id}:`, error);
          })
      );
      await Promise.all(promises);
      setOfflineCount(offline);
      setOnlineCount(online);
    };

    if (parentCheck.length > 0 || childCheck.length > 0) {
      fetchDataForIds();
    } else if (allDevices) {
      let offline = 0;
      let online = 0;
      allDevices.forEach((device) => {
        if (device.status === "offline" || device.status === "unknown") {
          offline++;
        } else {
          online++;
        }
      });
      setOfflineCount(offline);
      setOnlineCount(online);
    }
  }, [parentCheck, childCheck, allDevices, getUsersDevice]);

  return (
    <>
      <div className="flex-between p-8-10 my-8">
        {pathname === "/livetracking" ? (
          <div className="w-233 d-flex">
            <div className="fs-16 fw-600 me-2">Vehicles</div>
            <div className="object-details-head object-head-first">
              {parentCheck.length > 0 || childCheck.length > 0
                ? offlineCount + onlineCount
                : allDevices?.length || 0}
              <span className=""> Total</span>
            </div>
            <div className="object-details-head object-head-second">
              {onlineCount}
            </div>
            <div className="object-details-head object-head-third">
              {offlineCount}
            </div>
          </div>
        ) : (
          <div className="w-233 d-flex">
            <div className="fs-16 fw-600 me-2">Geofences</div>
            <div className="object-details-head object-head-first">
              {Geofences?.length}
              <span className=""> Total</span>
            </div>
          </div>
        )}

         
          <img
            src="/assets/Double-arrow.svg"
            alt="Doublearrow"
            role="button"
            onClick={handleClick}
          />      </div>
    </>
  );
}
