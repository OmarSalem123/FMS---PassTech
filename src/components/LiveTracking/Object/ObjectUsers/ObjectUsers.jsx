import React from "react";
import ObjectUsersBody from "./ObjectUsersBody/ObjectUsersBody";
import ObjectUsersHead from "./ObjectUsersHead/ObjectUsersHead";
import ObjectUsersFooter from "./ObjectUsersFooter/ObjectUsersFooter";

export default function ObjectUsers() {
  return (
    <>
      <div className="bg-white-rounded p-0 object-users">
        <ObjectUsersHead />
        <ObjectUsersBody />
        <ObjectUsersFooter />
      </div>
    </>
  );
}
