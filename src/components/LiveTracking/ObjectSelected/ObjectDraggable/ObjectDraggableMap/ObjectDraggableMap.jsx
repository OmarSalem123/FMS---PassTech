import React, { useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import ObjectDraggableData from "./ObjectDraggableData";
import { Icon } from "leaflet";
import "leaflet-rotatedmarker";
import { useSelector } from "react-redux";

export default function ObjectDraggableMap({ data, position }) {
  const inf = useSelector((state) => state.users.user);
  const getIconUrl = () => {
    if (data && data.status === "online") {
      return "/assets/CarOnline.svg";
    } else {
      return "/assets/CarOffline.svg";
    }
  };
  let [view, setView] = useState(false);
  let course = position?.course ? position.course :0;
  let lat = position?.latitude ? position.latitude : inf.latitude
  let lon = position?.longitude ? position.longitude : inf.longitude
  return (
    <div className="object-draggable-map">
      <MapContainer
        id="map-container"
        center={[lat, lon]}
        zoomControl={false}
        zoom={16}
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
        <ObjectDraggableData
          data={data}
          position={position}
          view={view}
          setview={setView}
        />
        <Marker
          position={[lat, lon]}
          icon={
            new Icon({
              iconUrl: getIconUrl(),
              iconSize: [48, 48],
              shadowAnchor: [4, 62],
              popupAnchor: [-3, -20],
            })
          }
          rotationAngle={course}
          rotationOrigin="center"
          interactive={true}
          eventHandlers={{
            click: () => {
              setView(!view);
            },
          }}
        />
      </MapContainer>
    </div>
  );
}
