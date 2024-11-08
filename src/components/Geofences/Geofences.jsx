import { wktToGeoJSON } from "@terraformer/wkt";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { useSelector } from "react-redux";
import { useContext, useEffect, useRef, useCallback } from "react";
import { useGetUsersGeofencesQuery } from "../../Redux/service/Geofences/Geofences";
import { popupcontext } from "../../context/Popupscontext";

export default function Geofences() {
  const map = useMap();
  const inf = useSelector((state) => state.users.user);
  const { data: initialGeofences, refetch } = useGetUsersGeofencesQuery(
    inf.id,
    { skip: !inf.id }
  );
  const { deleted, setDeleted, setRefetchGeofences } = useContext(popupcontext);
  const geofences = useSelector((state) => state.geofences.geofences);

  // Use refs to keep track of geofence and label layers on the map
  const geofenceLayers = useRef(new Map());
  const labelLayers = useRef(new Map());

  // Function to add or update name label for the geofence
  const updateGeoName = useCallback(
    (latLngs, geofenceId, name) => {
      // Create a unique label identifier based on geofence ID
      const labelId = `label-${geofenceId}`;

      // Clear existing label if it exists
      if (labelLayers.current.has(labelId)) {
        map.removeLayer(labelLayers.current.get(labelId));
        labelLayers.current.delete(labelId);
      }

      // Create a new label marker
      const polygonLayer = L.polyline(latLngs);
      const centroid = polygonLayer.getBounds().getCenter();
      const labelMarker = L.marker(centroid, {
        icon: L.divIcon({
          className: "label-icon",
          html: `<div>${name}</div>`,
        }),
        interactive: false,
      });

      labelMarker.addTo(map);
      labelLayers.current.set(labelId, labelMarker); // Store label by unique ID
    },
    [map]
  );

  const clearLayers = useCallback(() => {
    // Clear each geofence layer from the map and the ref map
    geofenceLayers.current.forEach((layer) => {
      map.removeLayer(layer);
    });
    geofenceLayers.current.clear();

    // Clear each label layer from the map and the ref map
    labelLayers.current.forEach((label) => {
      map.removeLayer(label);
    });
    labelLayers.current.clear();

    // Additional step to clear all layers on the map to ensure no leftovers
    map.eachLayer((layer) => {
      if (
        layer instanceof L.Polyline ||
        layer instanceof L.Polygon ||
        layer instanceof L.Marker
      ) {
        map.removeLayer(layer);
      }
    });
  }, [map]);

  const renderGeofencesOnMap = useCallback(
    (geofences) => {
      geofences.forEach((geo) => {
        const geojsonLayer = wktToGeoJSON(geo?.area);
        const color = geo?.attributes?.color;

        // Clear existing geofence layer and label if they exist
        if (geofenceLayers.current.has(geo.id)) {
          map.removeLayer(geofenceLayers.current.get(geo.id));
          geofenceLayers.current.delete(geo.id);
        }
        if (labelLayers.current.has(`label-${geo.id}`)) {
          map.removeLayer(labelLayers.current.get(`label-${geo.id}`));
          labelLayers.current.delete(`label-${geo.id}`);
        }

        // Add new geofence layer based on type
        if (geojsonLayer.type === "LineString") {
          const latLngs = geojsonLayer.coordinates.map(
            ([lng, lat]) => L.latLng(lng, lat) // Correct lat-lng order
          );
          const lineLayer = L.polyline(latLngs, { color, weight: 5 });
          lineLayer.addTo(map);
          geofenceLayers.current.set(geo.id, lineLayer); // Store by geofence ID
          updateGeoName(latLngs, geo.id, geo?.name);
        } else if (geojsonLayer.type === "Polygon") {
          geojsonLayer.coordinates.forEach((coord) => {
            const latLngs = coord.map(([lng, lat]) => L.latLng(lng, lat));
            const polygonLayer = L.polygon(latLngs, { color });
            polygonLayer.addTo(map);
            geofenceLayers.current.set(geo.id, polygonLayer);
            updateGeoName(latLngs, geo.id, geo?.name);
          });
        }
      });
    },
    [updateGeoName, map]
  );

  useEffect(() => {
    if (deleted) {
      clearLayers();
      refetch().then(() => {
        setDeleted(false); // Reset deleted status after refetch
        setRefetchGeofences(false);
      });
    }
  }, [deleted, clearLayers, refetch, setDeleted, setRefetchGeofences]);

  useEffect(() => {
    clearLayers();
    if (initialGeofences) {
      renderGeofencesOnMap(initialGeofences);
    }
    if (geofences.length > 0) {
      renderGeofencesOnMap(geofences);
    }
  }, [initialGeofences, geofences, clearLayers, renderGeofencesOnMap]);

  return null;
}
