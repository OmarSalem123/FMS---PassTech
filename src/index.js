import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/ColorsFonts/colors.css";
import "./Styles/ColorsFonts/fonts.css";
import "./Styles/SizesBg/style.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "react-datepicker/dist/react-datepicker.css";
import "react-dropzone/";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";

import { persistor, store } from "./Redux/Store";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store} persistor={persistor}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
