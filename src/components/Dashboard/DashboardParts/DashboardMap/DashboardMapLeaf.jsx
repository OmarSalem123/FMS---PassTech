import React, { useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import {
  useGetChildUsersQuery,
  useLazyGetChildUsersQuery,
} from "../../../../Redux/service/Users/Users";
import { useSelector } from "react-redux";
import { DivIcon } from "leaflet";
import { useLazyGetUsersDeviceQuery } from "../../../../Redux/service/Devices";

export default function DashboardLeafMap() {
  const inf = useSelector((state) => state.users.user);
  const { data: childUsers } = useGetChildUsersQuery(inf.id, { skip: !inf.id });
  const [getChildUser] = useLazyGetChildUsersQuery();
  const [getUsersDevice] = useLazyGetUsersDeviceQuery();
  const [vehicleData, setVehicleData] = useState({});
  const [childUserData, setChildUserData] = useState({});
  
  const fetchDevices = (userId) => {
    getUsersDevice(userId).then((response) => {
      setVehicleData((prev) => ({
        ...prev,
        [userId]: response.data,
      }));
    });
    getChildUser(userId).then((response) => {
      setChildUserData((prev) => ({
        ...prev,
        [userId]: response.data,
      }));
    });
  };

  return (
    <div className="dashboard-map">
      <MapContainer
        id="map-container"
        center={[23.8859, 45.0792]}
        zoomControl={false}
        zoom={5}
        scrollWheelZoom={true}
        minZoom={5}
        maxZoom={18}
        zoomAnimation={true}
        zoomSnap={0.1}
        dragging={true}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://mt0.google.com/vt/lyrs=m,&hl=en&x={x}&y={y}&z={z}&s=Ga"
        />

        {childUsers?.map((mark) => (
          <Marker
            key={mark.id}
            position={[mark.latitude, mark.longitude]}
            icon={
              new DivIcon({
                html: `
                  <div class="dashboard-map-marker">
                    <img src="https://www.svgrepo.com/show/513317/location-pin.svg"
                         alt="Marker" class="marker-icon"/>
                    <div class="dashboard-mark-popup">
                      <div class="dashboard-mark-title">${mark.name}</div>
                      ${
                        vehicleData[mark.id]
                          ? `<div class="dashboard-mark-content">${
                              vehicleData[mark.id]?.length
                            } Vehicles</div>`
                          : "<div>Loading vehicles...</div>"
                      }
                      ${
                        childUserData[mark.id]
                          ? `<div class="dashboard-mark-content">${
                              childUserData[mark.id]?.length
                            } Users</div>`
                          : "<div>Loading users...</div>"
                      }
                    </div>
                  </div>`,
                className: "custom-marker",
              })
            }
            eventHandlers={{
              add: () => fetchDevices(mark.id),
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}