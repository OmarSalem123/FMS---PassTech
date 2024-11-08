// src/service/websocket.js
import { setWebSocketData } from "../Redux/service/Websocket";
import { store } from "../Redux/Store";

class WebSocketManager {
  constructor() {
    this.socket = null;
  }

  connect() {
   this.socket = new WebSocket("wss://test.passenger-mea.com/api/socket");

    this.socket.onopen = () => {
      console.log("WebSocket connected");
    };

    this.socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      console.log(parsedData);
      //console.log("------------------------");
      store.dispatch(setWebSocketData(parsedData)); // Dispatch the data to Redux store
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export const webSocketManager = new WebSocketManager();
