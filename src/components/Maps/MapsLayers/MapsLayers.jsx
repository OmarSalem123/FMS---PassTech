import React, { useRef, useState } from "react";
import MapLayer from "./MapLayer";
import useOutsideClick from "../../Helpers/OutsideClick/useOutsideClick";

export default function MapsLayers({ handlelayers }) {
  let googlemap =
    "https://mt0.google.com/vt/lyrs=m,&hl=en&x={x}&y={y}&z={z}&s=Ga";
  let osm = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  let satellite =
    "https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga";
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState(googlemap);
  const [selectedmap, setSelectedMap] = useState("Google");
  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleLayerSelect = (layer) => {
    setSelected(layer);
    handlelayers(layer);
  };
  const menuRef = useRef(null);

  useOutsideClick(menuRef, () => setMenu(false), "click");

  return (
    <>
      <div
        role="button"
        className="map-tiles"
        ref={menuRef}
        onClick={handleMenu}
      >
        <div className="flex-between">
          <p>{selectedmap}</p>
          <div className="y-40">
            <img
              src={menu ? "/assets/chevron-down.svg" : "/assets/chevron-up.svg"}
              alt=""
            />
          </div>
        </div>
      </div>

      {menu ? (
        <div role="button" className="map-tiles-menu">
          <MapLayer
            maplayer={osm}
            mapname="OSM"
            selected={selected}
            handleLayerSelect={handleLayerSelect}
            setSelectedMap={setSelectedMap}
          />

          <MapLayer
            maplayer={googlemap}
            mapname="Google"
            selected={selected}
            handleLayerSelect={handleLayerSelect}
            setSelectedMap={setSelectedMap}
          />

          <MapLayer
            maplayer={satellite}
            mapname="Satellite"
            selected={selected}
            handleLayerSelect={handleLayerSelect}
            setSelectedMap={setSelectedMap}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
