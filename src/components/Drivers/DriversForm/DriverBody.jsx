import React, { useContext, useEffect, useState } from "react";
import ProfilePicture from "./../../Helpers/UploadPicture/PorfilePicture";
import DriverInfo from "./DriverInfo";
import DriverDateInfo from "./DriverDateInfo";
import Dropfile from "../../Helpers/Dropzone/Dropzone";
import OffcanvasFooter from "../../Helpers/Offcanvasfooter/OffcanvasFooter";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  useAddDriverMutation,
  useDeleteDriverAttachmentMutation,
  useDeleteDriverPictureMutation,
  useEditDriverAttachmentMutation,
  useEditDriverMutation,
} from "../../../Redux/service/Drivers/Drivers";
import { toast } from "react-toastify";
import { popupcontext } from "../../../context/Popupscontext";
import Loader from "../../Helpers/Loader/Loader";
export default function DriverBody({ onSuccess, Editvalues, onEdit }) {
  const [submitAttempt, setSubmitAttempt] = useState(false);
  let [addDrivers, { isLoading: AddLoading }] = useAddDriverMutation();
  let [editDrivers, { isLoading: EditLoading }] = useEditDriverMutation();
  let [editDriverAttachment] = useEditDriverAttachmentMutation();
  let [deleteAttachment] = useDeleteDriverAttachmentMutation();
  let [deletePicture] = useDeleteDriverPictureMutation();

  const {
    isEditing,
    handleClose,
    attachments,
    setAttachments,
    attachmentsId,
    setAttachmentsId,
    picture,
  } = useContext(popupcontext);

  const initialValues = {
    name: isEditing ? Editvalues?.name : "",
    code: isEditing ? Editvalues?.code : "",
    idNo: isEditing ? Editvalues?.idNo : "",
    phoneNumber: isEditing ? Editvalues?.phoneNumber : "",
    emergencyPhoneNumber: isEditing ? Editvalues?.emergencyPhoneNumber : "",
    address: isEditing ? Editvalues?.address : "",
    licenseNo: isEditing ? Editvalues?.licenseNo : "",
    licenseStartDate: isEditing ? Editvalues?.licenseStartDate : "",
    licenseExpireDate: isEditing ? Editvalues?.licenseExpireDate : "",
    licenseExpireReminder: isEditing
      ? Editvalues?.licenseExpireReminder
      : false,
    contractStartDate: isEditing ? Editvalues?.contractStartDate : "",
    contractExpireDate: isEditing ? Editvalues?.contractExpireDate : "",
    contractExpireReminder: isEditing
      ? Editvalues?.contractExpireReminder
      : false,
    picture: isEditing ? Editvalues?.picture : [],
    parent: isEditing ? Editvalues?.parent : "",
    attachments: isEditing ? Editvalues?.attachments : [],
  };
  let validSchema = Yup.object({
    name: Yup.string()
      .typeError("Name must be a string")
      .required("Name is required"),
    phoneNumber: Yup.number()

      .typeError("Phone Number must be a number")
      .test("is-valid-sim", "Phone number must be international", (value) => {
        if (!value) return false;

        const simNumberStr = value.toString();

        // Example validation: should be numeric and between 6 to 15 digits long
        const isValid = /^\d{9,18}$/.test(simNumberStr);

        return isValid;
      }),
    emergencyPhoneNumber: Yup.number()
      .typeError("Emergency Number must be a number")
      .test(
        "is-valid-sim",
        "Emergency number must be international",
        (value) => {
          if (!value) return false;

          const simNumberStr = value.toString();

          // Example validation: should be numeric and between 6 to 15 digits long
          const isValid = /^\d{9,18}$/.test(simNumberStr);

          return isValid;
        }
      ),
    licenseStartDate: Yup.date().nullable(),

    licenseExpireDate: Yup.date()
      .when("licenseStartDate", {
        is: (value) => !!value,
        then: (licenseExpireDate) =>
          licenseExpireDate.required("License Expiration Date is required"),
      })
      .nullable(),
    contractStartDate: Yup.date().nullable(),
    contractExpireDate: Yup.date()
      .when("contractStartDate", {
        is: (value) => !!value,
        then: (contractExpireDate) =>
          contractExpireDate.required("Contract Expiration Date Is Required"),
      })
      .nullable(),
    parent: Yup.string().required("Parent Is Required"),
  });

  const addDriver = useFormik({
    initialValues,
    validationSchema: validSchema,
    onSubmit: async (val) => {
      delete val.driver_users;
      const filterEmptyValues = (obj) => {
        return Object.fromEntries(
          Object.entries(obj).filter(
            ([_, value]) =>
              value !== "" && value !== null && value !== undefined
          )
        );
      };
      const filteredValues = filterEmptyValues(val);
      try {
        if (isEditing) {
          const Attachments = val.attachments;
          const driverData = { ...val };
          delete driverData.attachments;
          delete driverData.id;
          const x = filterEmptyValues(driverData);
          const updatedDrivers = await editDrivers({
            id: Editvalues?.id,
            val: x,
          })
            .unwrap()
            .catch((err) => console.log("ERORR", err));
          if (attachments.length > 0) {
            editDriverAttachment({
              driverId: Editvalues?.id,
              attachments: Attachments || Editvalues.attachments,
            })
              .unwrap()
              .catch((err) => console.log(err));
          }
          if (attachmentsId.length > 0) {
            attachmentsId.forEach(async (id) => {
              await deleteAttachment(id).unwrap();
            });
          }
          if (picture) {
            deletePicture(Editvalues.id)
              .unwrap()
              .catch((err) => console.log("PIC ERROR", err));
          }
          if (onEdit) {
            toast.success("Driver Edited Successfully", { autoClose: 800 });
            onEdit(updatedDrivers);
            setAttachments([]);
            setAttachmentsId([]);
            handleClose("form");
          }
        } else {
          const addedDrivers = await addDrivers(filteredValues).unwrap();
          if (onSuccess) {
            toast.success("New Driver Is Added", { autoClose: 800 });
            await onSuccess(addedDrivers);
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
    addDriver.handleSubmit(e);
  };
  useEffect(() => {
    if (isEditing && Editvalues) {
      const { ...values } = Editvalues;
      addDriver.setValues(values);
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
  console.log("EEE", Editvalues);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <ProfilePicture addData={addDriver} />
        <DriverInfo addData={addDriver} />
        <DriverDateInfo addData={addDriver} />
        <Dropfile
          addData={addDriver}
          name="attachments"
          EditableAttachments={Editvalues?.attachments}
        />
        <OffcanvasFooter addData={addDriver} submitAttempt={submitAttempt} />
      </form>
    </>
  );
}
