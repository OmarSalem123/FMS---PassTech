import React from "react";
import { useSelector } from "react-redux";
import { webSocketManager } from "../Sockets/WebSocketManager";
import { useNavigate } from "react-router-dom";
import Loader from "./Helpers/Loader/Loader";
export default function Random() {
  let navigate = useNavigate();

  const handleLogout = () => {
    webSocketManager.disconnect();
    sessionStorage.setItem("token", "");
    const expires = new Date(Date.now() + 1);
    document.cookie =
      "JSESSIONID=; expires=" + expires.toUTCString() + "; path=/;";
    console.log("disconnect");

    navigate("/signin");
    window.location.reload();
  };
  const webSocketData = useSelector((state) => state.webSocket.data);
  /**  const getIconUrl = (deviceId) => {
    const device = devices.find((i) => i.id === deviceId);
    if (device && device.status === "online") {
      return "https://freesvg.org/img/car_topview.png"; // Online icon
    } else {
      return "https://uxwing.com/wp-content/themes/uxwing/download/transportation-automotive/car-top-view-icon.png"; // Offline icon
    }
  };
  const getIconUrl = (deviceId) => {
    return deviceStatus[deviceId]
      ? "https://freesvg.org/img/car_topview.png"
      : "https://uxwing.com/wp-content/themes/uxwing/download/transportation-automotive/car-top-view-icon.png";
  };
  **/
  return (
    <>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex tempore
        laboriosam rerum dolorum veniam quod quisquam, voluptate eos ullam
        voluptas nesciunt quam tenetur assumenda perspiciatis iusto perferendis
        deserunt, quasi porro.
      </div>

      <div onClick={handleLogout}>Logout</div>
      <p>WebSocket Data: {JSON.stringify(webSocketData)}</p>
      <Loader />
    </>
  );
}
