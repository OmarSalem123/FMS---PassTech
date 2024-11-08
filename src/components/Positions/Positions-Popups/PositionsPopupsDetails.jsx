import React from "react";

export default function PositionsPopupsDetails({ title, item, img, lat, lon }) {
  let formattedItem = item;
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  };

  if (img === "Time" && item) {
    const dateObject = new Date(item);
    formattedItem = dateObject.toLocaleDateString("en-GB", options);
  }

  const truncateItem = (text) => {
    const maxLength = 25; 
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="device-popup-row">
      <img src={`/assets/${img}.svg`} alt={img} />
      <div className="device-pop-item">
        {lat && lon ? (
          <div>
            <div>Lat: {lat}</div>
            <div>Lon: {lon}</div>
          </div>
        ) : (
          <div title={formattedItem}>
            {" "}
            {truncateItem(formattedItem)}
          </div>
        )}
      </div>
    </div>
  );
}
 