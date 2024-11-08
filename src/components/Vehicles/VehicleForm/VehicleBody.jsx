import React, { useContext, useEffect, useState } from "react";
import VehicleInfo from "./VehicleInfo";
import VehicleSetup from "./VehicleSetup";
import VehicleSensors from "./VehicleSensors";
import Dropfile from "../../Helpers/Dropzone/Dropzone";
import OffcanvasFooter from "../../Helpers/Offcanvasfooter/OffcanvasFooter";
import Loader from "../../Helpers/Loader/Loader";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  useAddVehiclesMutation,
  useDeleteVehicleAttachmentsMutation,
  useEditVehicleAttachmentsMutation,
  useEditVehicleMutation,
} from "../../../Redux/service/Vehicles/Vehicles";
import { popupcontext } from "../../../context/Popupscontext";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function VehicleBody({ onSuccess, Editvalues, onEdit }) {
  let [addNewVehicle, { isLoading: AddLoading }] = useAddVehiclesMutation();
  let [editVehicle, { isLoading: EditLoading }] = useEditVehicleMutation();
  let [editVehicleAttachment] = useEditVehicleAttachmentsMutation();
  let [deleteAttachment] = useDeleteVehicleAttachmentsMutation();
  const inf = useSelector((state) => state.users.user);
  const {
    isEditing,
    handleClose,
    attachments,
    setAttachments,
    attachmentsId,
    setAttachmentsId,
  } = useContext(popupcontext);
  const [submitAttempt, setSubmitAttempt] = useState(false);
  const initialValues = {
    name: isEditing ? Editvalues?.name : "",
    code: isEditing ? Editvalues?.code : "",
    imei: isEditing ? Editvalues?.imei : "",
    make: isEditing ? Editvalues?.make : "",
    model: isEditing ? Editvalues?.model : "",
    registrationNumber: isEditing ? Editvalues?.registrationNumber : "",
    fuelType: isEditing ? Editvalues?.fuelType : "",
    fuelConsumption: isEditing ? Editvalues?.fuelConsumption : null,
    fuelCost: isEditing ? Editvalues?.fuelCost : null,
    vehicleType: isEditing ? Editvalues?.vehicleType : "",
    plateNumber: isEditing ? Editvalues?.plateNumber : "",
    vin: isEditing ? Editvalues?.vin : "",
    licenseExpire: isEditing ? Editvalues?.licenseExpire : "",
    licenseExpireReminder: isEditing
      ? Editvalues?.licenseExpireReminder
      : false,
    simNumber: isEditing ? Editvalues?.simNumber : "",
    simNumberSerial: isEditing ? Editvalues?.simNumberSerial : "",
    odometer: isEditing ? Editvalues?.odometer : null,
    brand: isEditing ? Editvalues?.brand : "",
    color: isEditing ? Editvalues?.color : "",
    year: isEditing ? Editvalues?.year : null,
    vehicleExpires: isEditing ? Editvalues?.vehicleExpires : "",
    parent: isEditing ? Editvalues?.parent : inf.id,
    accSupport: isEditing ? Editvalues?.accSupport : false,
    fuelSupport: isEditing ? Editvalues?.fuelSupport : false,
    fuelCapacity: isEditing ? Editvalues?.fuelCapacity : "",
    tankHeight: isEditing ? Editvalues?.tankHeight : "",
    tankWidth: isEditing ? Editvalues?.tankWidth : "",
    tankLength: isEditing ? Editvalues?.tankLength : "",
    doorSupport: isEditing ? Editvalues?.doorSupport : false,
    weightSensorSupport: isEditing ? Editvalues?.weightSensorSupport : false,
    temperatureSensorSupport: isEditing
      ? Editvalues?.temperatureSensorSupport
      : false,
    iButtonSensorSupport: isEditing ? Editvalues?.iButtonSensorSupport : false,
    ptoSensorSupport: isEditing ? Editvalues?.ptoSensorSupport : false,
    seatSensorSupport: isEditing ? Editvalues?.seatSensorSupport : false,
    refrigeratorSensorSupport: isEditing
      ? Editvalues?.refrigeratorSensorSupport
      : false,
    headlightsSensorSupport: isEditing
      ? Editvalues?.headlightsSensorSupport
      : false,
    idleTime: isEditing ? Editvalues?.idleTime : "",
    idleAlert: isEditing ? Editvalues?.idleAlert : false,
    archived: isEditing ? Editvalues?.archived : false,
    department: isEditing ? Editvalues?.department : 1,
    driverId: isEditing ? Editvalues?.driverId : "",
    icon: isEditing ? Editvalues?.icon : "icon-car.png",
    attachments: isEditing ? Editvalues?.attachments : [],
  };

  let validSchema = Yup.object({
    name: Yup.string().required("Name Is Required"),
    imei: Yup.string().required("IMEI Is Required"),
    plateNumber: Yup.string().required("Plate Number Is Required"),

    vehicleType: Yup.string().required("Vehicle Type Is Required"),
    licenseExpire: Yup.string()
      .when("licenseExpireReminder", {
        is: true,
        then: (licenseExpire) =>
          licenseExpire.required("License Expiration Is Required"),
      })
      .nullable(),
    simNumber: Yup.number()
      .typeError("Sim Number must be a number")
      .required("Sim Number Is Required")
      .test("is-valid-sim", "Sim must be an international number", (value) => {
        if (!value) return false;

        const simNumberStr = value.toString();

        // Example validation: should be numeric and between 6 to 15 digits long
        const isValid = /^\d{9,18}$/.test(simNumberStr);

        return isValid;
      }),
    vehicleExpires: Yup.string().required("Vehicle Expiration Is Required"),
    parent: Yup.number().required("Parent Is Required"),
    fuelCost: Yup.number().typeError("Fuel Cost must be a number"),
    fuelConsumption: Yup.number().typeError(
      "Fuel Consumption must be a number"
    ),
    fuelCapacity: Yup.number()
      .typeError("Fuel Capacity must be a number")
      .when("fuelSupport", {
        is: true,
        then: (fuelCapacity) =>
          fuelCapacity.required("Fuel Capacity Is Required"),
      })
      .nullable(),
    tankHeight: Yup.number()
      .typeError("Tank Height must be a number")
      .when("fuelSupport", {
        is: true,
        then: (tankHeight) => tankHeight.required("Tank Height Is Required"),
      })
      .nullable(),
    tankWidth: Yup.number()
      .typeError("Tank Width must be a number")
      .when("fuelSupport", {
        is: true,
        then: (tankWidth) => tankWidth.required("Tank Width Is Required"),
      })
      .nullable(),
    tankLength: Yup.number()
      .typeError("Tank Length must be a number")
      .when("fuelSupport", {
        is: true,
        then: (tankLength) => tankLength.required("Tank Length Is Required"),
      })
      .nullable(),
    idleTime: Yup.number()
      .typeError("Idle Time must be a number")
      .when("idleAlert", {
        is: true,
        then: (idleTime) => idleTime.required("Idle Time Is Required"),
      })
      .nullable(),
    year: Yup.number().typeError("Year must be a number").nullable(),
    odometer: Yup.number().typeError("Odometer must be a number").nullable(),
    driverId: Yup.number().nullable(),
    code: Yup.string().nullable(),
  });

  const addVehicle = useFormik({
    initialValues,
    validationSchema: validSchema,
    onSubmit: async (val) => {
      if (val.licenseExpireReminder === false) {
        delete val.licenseExpire;
      }

      if (val.fuelSupport === false) {
        delete val.fuelCapacity;
        delete val.tankHeight;
        delete val.tankWidth;
        delete val.tankLength;
      }

      if (val.idleAlert === false) {
        delete val.idleTime;
      }
      if (val.driverId === "" || val.driverId === null) {
        delete val.driverId;
      }
      const Attachments = val.attachments;
      const vehicleData = { ...val };
      delete vehicleData.attachments;
      delete vehicleData.odometer;
      delete val.vehicle_user;
      delete vehicleData.vehicle_user;

      try {
        if (isEditing) {
          const updatedVehicle = await editVehicle({
            id: Editvalues.id,
            val: vehicleData,
          }).unwrap();

          if (attachments.length > 0) {
            editVehicleAttachment({
              vehicleId: Editvalues.id,
              attachments: Attachments || Editvalues.attachments,
            }).unwrap();
          }
          if (attachmentsId.length > 0) {
            attachmentsId.forEach(async (id) => {
              await deleteAttachment(id).unwrap();
            });
          }
          if (onEdit) {
            toast.success("Vehicle Edited Successfully", { autoClose: 800 });
            onEdit(updatedVehicle);
            setAttachments([]);
            setAttachmentsId([]);
            handleClose("form");
          }
        } else {
          const addedVehicle = await addNewVehicle(val).unwrap();
          if (onSuccess) {
            toast.success("New Vehicle Is Added", { autoClose: 800 });
            await onSuccess(addedVehicle);
            handleClose("form");
          }
        }
      } catch (error) {
        toast.error(`${error?.data?.message}`);
      }
    },
  });
  const handleSubmit = (e) => {
    setSubmitAttempt(true);
    addVehicle.handleSubmit(e);
  };
  useEffect(() => {
    if (isEditing && Editvalues) {
      const { id, driver, ...valuesWithoutId } = Editvalues;
      addVehicle.setValues(valuesWithoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Editvalues]);
  if (AddLoading)
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  if (EditLoading)
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  return (
    <form onSubmit={handleSubmit}>
      <VehicleInfo addData={addVehicle} />
      <VehicleSetup addData={addVehicle} />
      <VehicleSensors addData={addVehicle} />

      <Dropfile
        addData={addVehicle}
        EditableAttachments={Editvalues?.attachments}
        name="attachments"
      />
      <OffcanvasFooter addData={addVehicle} submitAttempt={submitAttempt} />
    </form>
  );
}
