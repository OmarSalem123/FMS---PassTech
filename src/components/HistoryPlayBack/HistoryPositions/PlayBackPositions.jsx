import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Marker, Polyline, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { popupcontext } from "../../../context/Popupscontext";
import axios from "axios";
import { toast } from "react-toastify";

export default function PlayBackPositions() {
  const historypositions = useSelector(
    (state) => state.webSocket.historypositions
  );
  const [currentAddress, setCurrentAddress] = useState("");

  const positions = historypositions.map((i) => [i.latitude, i.longitude]);

  const { isPlaying, setIsPlaying, posIndex, setPosIndex } =
    useContext(popupcontext);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setPosIndex((prevIndex) => {
          if (prevIndex < positions.length - 1) {
            return Number(prevIndex) + 1;
          }
          setIsPlaying(false);
          return prevIndex;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, positions.length, setIsPlaying, setPosIndex]);

  const firstMarkerIcon = new Icon({
    iconUrl: "/StartPoint.svg",
    iconSize: [20, 20],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -20],
  });

  const lastMarkerIcon = new Icon({
    iconUrl: "/EndPoint.svg",
    iconSize: [20, 20],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -20],
  });

  const defaultMarkerIcon = new Icon({
    iconUrl: "/Positions.svg",
    iconSize: [24, 24],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -20],
  });

  const currentPositionIcon = new Icon({
    iconUrl: "/Indicator.svg",
    iconSize: [40, 40],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -20],
  });

  const fetchAddress = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://test.passenger-mea.com/api/server/geocode?latitude=${lat}&longitude=${lon}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Add your token here
          },
        }
      );
      setCurrentAddress(response.data || "Address not found");
    } catch (error) {
      toast.error(`${error.data.message}`);
      setCurrentAddress("Error fetching address");
    }
  };
  return (
    <div>
      <Polyline positions={positions} color="#58A86A" />

      {positions.map((pos, index) => {
        let icon;
        if (index === 0) {
          icon = firstMarkerIcon;
        } else if (index === positions.length - 1) {
          icon = lastMarkerIcon;
        } else {
          icon = defaultMarkerIcon;
        }

        return (
          <Marker
            icon={icon}
            interactive={true}
            key={index}
            position={pos}
            eventHandlers={{
              click: () => {
                const [lat, lon] = positions[posIndex];
                fetchAddress(String(lat), String(lon));
                console.log(lat);
              },
            }}
          >
            {index === 0 && <Popup className="x">Start Point</Popup>}
            {index === positions.length - 1 && <Popup>End Point</Popup>}
            {index !== positions.length - 1 && index !== 0 && (
              <Popup>{currentAddress}</Popup>
            )}
          </Marker>
        );
      })}

      {positions.length > 0 && (
        <Marker
          icon={currentPositionIcon}
          position={positions[posIndex]}
          zIndexOffset={1000}
        >
          <Popup>Current Position</Popup>
        </Marker>
      )}
    </div>
  );
}
