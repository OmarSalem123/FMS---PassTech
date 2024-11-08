import React, { useContext, useState } from "react";
import { sidebarcontext } from "../../context/Sidebarcontext";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import MapsLayers from "../Maps/MapsLayers/MapsLayers";
import PlayBackDate from "./HistoryDate/PlayBackDate";
import ManageZoom from "../Helpers/ManageZoom/ManageZoom";
import PlayBackPositions from "./HistoryPositions/PlayBackPositions";
import PlayBackTable from "./HistoryTable/PlayBackTable";
import PlayBackHead from "./HistoryHead/PlayBackHead";
import { Helmet } from "react-helmet";

export default function PlayBack() {
  let { isSideOpen } = useContext(sidebarcontext);
  const [maptile, setMapTile] = useState(
    "https://mt0.google.com/vt/lyrs=m,&hl=en&x={x}&y={y}&z={z}&s=Ga"
  );
  const changeLayers = (layer) => {
    setMapTile(layer);
  };
  return (
    
    <>
      <Helmet>
        <title>History Playback</title>
        <meta name="description" content="History Playback" />
      </Helmet>
    <div className={isSideOpen ? "map-parent-max" : "map-parent-min"}>
      <MapContainer
        id="map-container"
        center={[23.8859, 45.0792]}
        zoomControl={false}
        zoom={6}
        scrollWheelZoom={true}
        minZoom={5}
        maxZoom={30}
        zoomAnimation={true}
        zoomSnap={0.1}
        dragging={true}
        className="map-container"
      >
        <ZoomControl position="bottomright" />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={maptile}
          maxNativeZoom={30}
          maxZoom={30}
        />
        <PlayBackPositions />
        <ManageZoom>
          <div className="history-playback-date p-0">
            <PlayBackHead />
            <div className="H-line"></div>
            <PlayBackDate />
          </div>

          <PlayBackTable />
        </ManageZoom>
      </MapContainer>

      <MapsLayers handlelayers={changeLayers} />
    </div>   
     </>

  );
}
