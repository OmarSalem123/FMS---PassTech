import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  let token = sessionStorage.getItem("token");
  try {
    if (token && document.cookie.includes("JSESSIONID")) {
      return children;
    } else {
      return <Navigate to="/signin" />;
    }
  } catch (error) {
    console.log("error");
    //sessionStorage.clear();
    return <Navigate to="/signin" />;
  }
}
