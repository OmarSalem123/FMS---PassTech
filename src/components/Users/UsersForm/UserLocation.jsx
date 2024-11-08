import React, { useEffect, useState } from "react";
import { Input } from "../../Helpers/Input/Input";
import { Icon } from "leaflet";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import MapLocationSearch from "../../Maps/FeatureGroup/MapLocationSearch";

export default function UserLocation({ addData }) {
  const [position, setPosition] = useState(null);

  Icon.Default.mergeOptions({
    iconUrl: "https://www.svgrepo.com/show/513317/location-pin.svg",
  });

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        addData.setFieldValue("latitude", e.latlng.lat);
        addData.setFieldValue("longitude", e.latlng.lng);
      },
    });
    return position === null ? null : <Marker position={position}></Marker>;
  }
  useEffect(() => {
    const lat = addData.values.latitude;
    const lng = addData.values.longitude;

    if (lat && lng) {
      setPosition({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      });
    }
  }, [addData.values.latitude, addData.values.longitude]);
  return (
    <div className="userinfo mb-24">
      <p className="fs-16 fw-700 brand-700 text-uppercase">user location</p>
      <div className="flex-between">
        <Input
          title="Latitude"
          type="text"
          placeholder="Ex. 30.15484612"
          formstyle="user-form"
          id="latitude"
          name="latitude"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          errors={addData.errors.latitude}
          touched={addData.touched.latitude}
          value={addData.values.latitude || ""}
        />

        <Input
          title="Longitude"
          type="text"
          placeholder="Ex. 33.45235645"
          formstyle="user-form"
          id="longitude"
          name="longitude"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          errors={addData.errors.longitude}
          touched={addData.touched.longitude}
          value={addData.values.longitude || ""}
        />
      </div>
      <p className="form-label text-uppercase">Choose Location from map</p>

      <MapContainer
        center={position ? [position.lat, position.lng] : [23.8859, 45.0792]} // Update center when position changes
        zoom={5}
        style={{ height: "300px", width: "100%" , borderRadius:"8px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapLocationSearch />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}