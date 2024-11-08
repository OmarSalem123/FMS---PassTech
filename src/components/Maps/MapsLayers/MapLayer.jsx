import React from "react";

export default function MapLayer({
  mapname,
  maplayer,
  selected,
  handleLayerSelect,
  setSelectedMap,
}) {
  return (
    <>
      <div
        className="flex-between map-tile-item"
        onClick={() => {
          handleLayerSelect(maplayer);
          setSelectedMap(mapname);
        }}
      >
        <p className={`map-tile-item ${selected === maplayer && "selected"}`}>
          {mapname}
        </p>
        {selected === maplayer ? (
          <div className="y-15">
            <img src="/assets/Right.svg" width={20} alt="" />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
