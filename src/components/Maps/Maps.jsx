import React, { useContext, useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import MapFeatures from "./FeatureGroup/MapFeatures";
import MapsLayers from "./MapsLayers/MapsLayers";
import Object from "../LiveTracking/Object/Object";
import { sidebarcontext } from "../../context/Sidebarcontext";
import Positions from "../Positions/Positions";
import ManageZoom from "../Helpers/ManageZoom/ManageZoom";
import Geofences from "../Geofences/Geofences";
import ObjectFocus from "../LiveTracking/ObjectSelected/ObjectDraggable/ObjectFocus";
import { useLocation } from "react-router-dom";
export default function Maps() {
  let { isSideOpen } = useContext(sidebarcontext);
  let { pathname } = useLocation();
  console.log("s",pathname)
  const [maptile, setMapTile] = useState(
    "https://mt0.google.com/vt/lyrs=m,&hl=en&x={x}&y={y}&z={z}&s=Ga"
  );
  const changeLayers = (layer) => {
    setMapTile(layer);
  };
  const mapClass = isSideOpen ? "map-parent-max" : "map-parent-min";
  return (
    <div className={mapClass}>
      <MapContainer
        id="map-container"
        center={[23.8859, 45.0792]}
        zoomControl={false}
        zoom={6}
        scrollWheelZoom={true}
        minZoom={5}
        maxZoom={18}
        zoomAnimation={true}
        zoomSnap={0.1}
        dragging={true}
        className="map-container"
      >
        <ZoomControl position="bottomright" />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={maptile}
        />
        <Positions />
        <ManageZoom>
          {pathname === "/geofences" && <MapFeatures />}
          <Geofences />
          <Object />
        </ManageZoom>
      </MapContainer>
      {pathname === "/livetracking" && <ObjectFocus />}
      <MapsLayers handlelayers={changeLayers} />
    </div>
  );
}
