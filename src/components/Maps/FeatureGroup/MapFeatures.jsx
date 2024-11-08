import React, { useContext, useEffect, useState } from "react";
 
import GeofenceForm from "../../Geofences/GeofenceForm/GeofenceForm";
import { popupcontext } from "../../../context/Popupscontext";
import { useGetSpecificGeofenceQuery } from "../../../Redux/service/Geofences/Geofences";
import { EditControl } from "react-leaflet-draw";
import { FeatureGroup } from "react-leaflet";
import { rectangle } from "leaflet";

export default function MapFeatures() {
  const [geometry, setGeometry] = useState("");
  let {
    handleShowGeo,
    displayGeo,
    currentGeofenceId,
    edited,
  } = useContext(popupcontext);
  let { data: EditValues, refetch } = useGetSpecificGeofenceQuery(
    currentGeofenceId,
    {
      skip: !currentGeofenceId,
    }
  );
  useEffect(() => {
    if (edited && currentGeofenceId) {
      refetch();
    }
  }, [edited, currentGeofenceId, refetch]);
  const drawControlOptions = {
    position: "topright",
    draw: {
      rectangle: true,
      circle: false,
      polyline: false,
      rectangle:false,
      polygon: {
        allowIntersection: false,
        showArea: true,
        shapeOptions: {
          color: "#22c55e",
          opacity: 1,
          weight: 5,
          fillColor: "#22c55e",
          fillOpacity: 0.2,
        },
      },
      marker: false,
      circlemarker: false,
    },
    edit: {
      edit: false,
    },
  };
  const createPolygon = (e) => {
    const { layerType, layer } = e;
    if (layerType === "polyline") {
      const latlngs = layer.getLatLngs();
      //console.log(latlngs);
      const lineStringFormat = `LINESTRING (${latlngs
        .map((latlng) => `${latlng.lng} ${latlng.lat}`)
        .join(", ")})`;
      setGeometry(lineStringFormat);
      //console.log("LINESTRING:", lineStringFormat);
    } else if (layerType === "polygon") {
      const latlngs = layer.getLatLngs()[0];
      const polygonFormat = `POLYGON ((${latlngs
        .map((latlng) => `${latlng.lat} ${latlng.lng}`)
        .join(", ")}))`;
      setGeometry(polygonFormat);
      //console.log("POLYGON:", polygonFormat);
    } else if (layerType === "rectangle") {
      const latlngs = layer.getLatLngs()[0];
      const rectangleFormat = `POLYGON ((${latlngs
        .map((latlng) => `${latlng.lat} ${latlng.lng}`)
        .join(", ")}))`;
      setGeometry(rectangleFormat);
      //console.log("RECTANGLE (as POLYGON):", rectangleFormat);
    } else if (layerType === "circle") {
      const center = layer.getLatLng();
      const radius = layer.getRadius();
      const circleFormat = `CIRCLE ((${center.lng} ${center.lat}), RADIUS ${radius})`;
      setGeometry(circleFormat);
      //console.log("CIRCLE:", circleFormat);
    }
    handleShowGeo();
  };
  console.log("Edit", EditValues);
  return (
    <>
      <FeatureGroup>
        <EditControl
          {...drawControlOptions}
          onCreated={createPolygon}
          onEdited={createPolygon}
        />
      </FeatureGroup>
      {displayGeo ? (
        <GeofenceForm area={geometry} Editvalues={EditValues} />
      ) : (
        ""
      )}
    </>
  );
}
