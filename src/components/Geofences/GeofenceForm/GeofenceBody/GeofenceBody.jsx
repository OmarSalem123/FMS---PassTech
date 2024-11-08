import React from "react";
import { Input, InputGeofenceStatus } from "../../../Helpers/Input/Input";
import { useSelector } from "react-redux";

export default function GeofenceBody({ AddGeo }) {
  console.log(AddGeo);
  let inf = useSelector((state) => state.users.user);
  return (
    <div className="p-16">
      <Input
        formstyle="w-100 mb-2"
        title="Name"
        type="text"
        placeholder="Geofence Name"
        id="name"
        name="name"
        onBlur={AddGeo.handleBlur}
        onChange={AddGeo.handleChange}
        errors={AddGeo.errors.name}
        touched={AddGeo.touched.name}
        value={AddGeo.values.name || ""}
      />
      <Input
        formstyle="w-100 mb-2"
        title="Description"
        type="text"
        placeholder="Geofence Description"
        id="description"
        name="description"
        onBlur={AddGeo.handleBlur}
        onChange={AddGeo.handleChange}
        value={AddGeo.values.description || ""}
      />

      <InputGeofenceStatus
        formstyle="w-100 mb-2"
        title="Color"
        type="color"
        id="attributes.color"
        name="attributes.color"
        onBlur={AddGeo.handleBlur}
        onChange={AddGeo.handleChange}
        value={AddGeo.values.attributes?.color || ""}
        errors={AddGeo.errors.attributes?.color}
        touched={AddGeo.touched.attributes?.color}
      />
      <Input
        formstyle="w-100 mb-2"
        title={`Speed Limit (${
          inf.attributes.speedUnit ? inf.attributes.speedUnit : "kn"
        })`}
        type="text"
        placeholder="Set Speed Limit"
        id="attributes.speedLimit"
        name="attributes.speedLimit"
        onBlur={AddGeo.handleBlur}
        onChange={AddGeo.handleChange}
        value={AddGeo.values.attributes.speedLimit || ""}
      />
     
    </div>
  );
}
