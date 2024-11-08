import L from "leaflet";
import "leaflet-control-geocoder";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
export default function MapLocationSearch() {
  const map = useMap();
  useEffect(() => {
    L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on("markgeocode", function (e) {
        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map);
  }, [map]);

  return null;
}
