import React, { useContext, useEffect, useState } from "react";
import GeofenceHead from "./GeofenceHead/GeofenceHead";
import GeofenceBody from "./GeofenceBody/GeofenceBody";
import GeofenceFooter from "./GeofenceFooter/GeofenceFooter";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  useAddGeofencesMutation,
  useEditGeofencesMutation,
} from "../../../Redux/service/Geofences/Geofences";
import { useDispatch } from "react-redux";
import { popupcontext } from "../../../context/Popupscontext";
import {
  addGeofence,
  editGeofence,
} from "../../../Redux/service/Geofences/GeofenceSlice";
import { toast } from "react-toastify";
import { useMap } from "react-leaflet";

export default function GeofenceForm({ area, Editvalues }) {
  const [submitAttempt, setSubmitAttempt] = useState(false);
  const [addGeofences] = useAddGeofencesMutation();
  const [editGeofences] = useEditGeofencesMutation();
  const dispatch = useDispatch();
  const map = useMap();

  let { handleClose, isEditing, setEdited, setRefetchGeofences } =
    useContext(popupcontext);

  const handleAddGeo = async (val) => {
    try {
      const addedGeofence = await addGeofences(val)
        .unwrap()
        .catch((err) => console.log(err));
      map.dragging.enable();
      map.scrollWheelZoom.enable();

      toast.success("New Geofence Is Added", { autoClose: 800 });
      dispatch(addGeofence(addedGeofence));
      handleClose("editing");
      setRefetchGeofences(true);
    } catch (error) {
      toast.error(`${error?.data?.message}`);
    }
  };
  const handleEditGeo = async (val) => {
    try {
      const editedGeofence = await editGeofences({
        id: Editvalues.id,
        val: val,
      })
        .unwrap()
        .catch((err) => console.log(err));
      toast.success("Geofence Is Edited Successfully", { autoClose: 800 });
      setEdited(true);
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      handleClose("editing");
      setRefetchGeofences(true);
      dispatch(editGeofence(editedGeofence));
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  let validSchema = Yup.object({
    name: Yup.string().required("Name Is Required"),
    attributes: Yup.object({
      color: Yup.string().required("Color is required"),
      speedLimit: Yup.number().typeError("Speed Limit must be a number"),
    
    }),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      attributes: {
        color: "",
        speedLimit: "",
      },
      area: area,
    },
    validationSchema: validSchema,
    onSubmit: async (val) => {
      if (!isEditing) {
        setSubmitAttempt(true);
        handleAddGeo(val);
      } else {
        setSubmitAttempt(true);
        handleEditGeo(val);
      }
    },
  });
  useEffect(() => {
    if (isEditing && Editvalues) {
      formik.setValues(Editvalues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Editvalues]);
  const handleSubmit = (e) => {
    setSubmitAttempt(true);
    formik.handleSubmit(e);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="Geofence-Form">
        <GeofenceHead />
        <div className="H-line"></div>
        <GeofenceBody AddGeo={formik} />
        <div className="H-line"></div>
        <GeofenceFooter AddGeo={formik} submitAttempt={submitAttempt} />
      </div>
    </form>
  );
}
