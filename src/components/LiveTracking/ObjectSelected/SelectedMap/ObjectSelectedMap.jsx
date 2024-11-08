import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import { useSelector } from "react-redux";

function ResizeMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position?.latitude && position?.longitude) {
      map.invalidateSize();
      map.setView([position.latitude, position.longitude], 15);
    }
  }, [map, position]);

  return null;
}

export default function ObjectSelectedMap({ position }) {
  const inf = useSelector((state) => state.users.user);

  const customIcon = new Icon({
    iconUrl: "https://www.svgrepo.com/show/513317/location-pin.svg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // Default fallback coordinates (update as needed)
  const defaultPosition = inf?.latitude && inf?.longitude
    ? { latitude: inf.latitude, longitude: inf.longitude }
    : { latitude: 24.7136, longitude: 46.738586 }; 

  const mapPosition =
    position?.latitude && position?.longitude ? position : defaultPosition;

  return (
    <div className="s">
      <MapContainer
        id="map-container"
        center={[mapPosition.latitude, mapPosition.longitude]}
        zoomControl={false}
        zoom={15}
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
          url="https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga"
        />
        {mapPosition.latitude && mapPosition.longitude && (
          <Marker
            position={[mapPosition.latitude, mapPosition.longitude]}
            icon={customIcon}
          />
        )}
        <ResizeMap position={mapPosition} />
      </MapContainer>
    </div>
  );
}
