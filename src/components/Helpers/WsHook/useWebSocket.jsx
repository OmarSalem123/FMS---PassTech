import { useEffect } from "react";
import { webSocketManager } from "../../../Sockets/WebSocketManager";

export default function useWebSocket() {
  useEffect(() => {
    if (document.cookie.includes("JSESSIONID")) {
      webSocketManager.connect();
    }
  }, []);
}
