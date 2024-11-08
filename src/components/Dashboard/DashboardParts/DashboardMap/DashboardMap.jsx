import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

const DashboardMap = () => {
  const [zoom] = useState(1); // Track zoom level

  const markers = [
    { markerOffset: 15, name: "Riydah", coordinates: [46.6753, 24.7136] },
    { markerOffset: 15, name: "Jeddah", coordinates: [39.17757, 21.4925] },
    { markerOffset: 15, name: "Mecca", coordinates: [40.512714, 21.437273] },
    { markerOffset: 15, name: "Medina", coordinates: [39.612236, 24.470901] },
    { markerOffset: 15, name: "Dammam", coordinates: [49.98436, 26.39925] },
    { markerOffset: 15, name: "Al Qatif", coordinates: [49.996376, 26.565191] },
    { markerOffset: 15, name: "Dhahran", coordinates: [50.0326, 26.236355] },
  ];



  return (
    <>
      <ComposableMap
        className="dashboard-map"
        projection="geoAzimuthalEqualArea" // Adjust projection if needed
        projectionConfig={{
          rotate: [0, 0, 0], // Adjust rotation and center for centering Saudi Arabia
          center: [44.0, 25.0], // Adjust rotation and center for centering Saudi Arabia
          scale: 3000,
        }}
        
      >
        <ZoomableGroup zoom={zoom}>
          {/* Pass zoom level to ZoomableGroup */}
          <Geographies
            geography="SA_regions.json"
            fill="#6CDF4F0F"
            stroke="#528A70"
            strokeWidth={0.5}
          >
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
          {markers.map(({ name, coordinates, markerOffset }) => (
            <Marker key={name} coordinates={coordinates}>
              <g
                fill="none"
                stroke="#F35533"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                transform={`translate(-12, -24) scale(${zoom})`} // Apply zoom to transform
              >
                <circle cx="12" cy="10" r={3 * zoom} />{" "}
                {/* Adjust circle size with zoom */}
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
              </g>
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{
                  fontFamily: "system-ui",
                  fontSize: 24,
                  fill: "#5D5A6D",
                }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default DashboardMap;
