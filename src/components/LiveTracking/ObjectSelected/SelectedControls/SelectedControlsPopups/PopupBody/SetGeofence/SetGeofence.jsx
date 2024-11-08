/* eslint-disable react/style-prop-object */
/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";

import Button from "../../../../../../Helpers/Button/Button";
import {
  useGetAllGeofencesQuery,
  useGetGeofencesByDeviceQuery,
} from "../../../../../../../Redux/service/Geofences/Geofences";
import Close from "../../../../../../Helpers/CloseBtn/Close";
import { useAddPermissionMutation, useDeletePermissionMutation } from "../../../../../../../Redux/service/Permissions/Permissions";

const SetGeofence = ({ title, device }) => {
  const [selectedGeofence, setSelectedGeofence] = useState([]);
  const { data: allGeofences = [], refetch: refetchAllGeofences } =
    useGetAllGeofencesQuery();
  const { data: initialSelected = [], refetch: refetchSelectedGeofences } =
    useGetGeofencesByDeviceQuery(device.id);
  const [alreadySelected, setAlreadySelected] = useState([]);
  const [addPermission] = useAddPermissionMutation();
  const [deletePermission] = useDeletePermissionMutation();

  useEffect(() => {
    refetchAllGeofences();
  }, []);

  useEffect(() => {
    if (initialSelected.length > 0) {
      setAlreadySelected(initialSelected);
      setSelectedGeofence(initialSelected.map((geo) => geo.id));
    }
  }, [initialSelected]);

  const formik = useFormik({
    initialValues: { deviceId: device.id, geofenceId: [] },
    validationSchema: Yup.object({
      geofenceId: Yup.array().required("At least one Geofence is required"),
    }),
    onSubmit: async () => {
      try {
        for (const id of selectedGeofence) {
          const body = { deviceId: device.id, geofenceId: id };
          await addPermission(body).unwrap();
        }
        await refetchSelectedGeofences();
        console.log("Permissions added successfully.");
      } catch (error) {
        console.log("Error:", error);
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue("geofenceId", selectedGeofence);
  }, [selectedGeofence]);

  const toggleGeofences = (optionId) => {
    const selectedGeo = allGeofences.find((geo) => geo.id === optionId);
    setSelectedGeofence((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
    if (selectedGeo) {
      setAlreadySelected((prev) =>
        prev.some((geo) => geo.id === optionId)
          ? prev.filter((geo) => geo.id !== optionId)
          : [...prev, selectedGeo]
      );
    }
  };

  const handleDelete = async (geoId) => {
    const body = { deviceId: `${device.id}`, geofenceId: geoId };
    try {
      await deletePermission(body).unwrap();
      setAlreadySelected((prev) => prev.filter((geo) => geo.id !== geoId));
      setSelectedGeofence((prev) => prev.filter((id) => id !== geoId));
      await refetchSelectedGeofences();
      console.log("Deleted successfully:", body);
    } catch (error) {
      console.error("Error deleting geofence:", error);
    }
  };

  const filteredGeofences = allGeofences.filter(
    (geo) => !alreadySelected.some((selectedGeo) => selectedGeo.id === geo.id)
  );

  if (title !== "set geofence") return <></>;

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="pb-3 ml-12">
        <p>Selected GeoFences</p>
        <div className="Tag-container">
          {alreadySelected.map((geo) => (
            <div
              className="Tag"
              key={geo.id}
              onClick={() => handleDelete(geo.id)}
            >
              <Close className="close-10" img="Close" />
              <p>{geo.name}</p>
            </div>
          ))}
        </div>
        <div className="flex-row">
          <Dropdown>
            <Dropdown.Toggle
              variant=""
              className="border-black"
              id="dropdown-basic"
            >
              Select Geofences
            </Dropdown.Toggle>
            <Dropdown.Menu className="absolute-dropdown">
              {filteredGeofences.map((option) => (
                <Dropdown.Item
                  key={option.id}
                  onClick={() => toggleGeofences(option.id)}
                  active={selectedGeofence.includes(option.id)}
                >
                  {option.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Button
          text="Save"
          type="submit"
          style="button fs-14 p-6-12 btn-success mt-20"
        />
      </div>
    </form>
  );
};

export default SetGeofence;
