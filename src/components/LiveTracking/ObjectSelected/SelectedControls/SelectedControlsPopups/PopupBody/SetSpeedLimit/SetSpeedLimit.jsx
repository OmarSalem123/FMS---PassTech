/* eslint-disable react/style-prop-object */
import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../Helpers/Input/Input";
import Button from "../../../../../../Helpers/Button/Button";
import { useGetSpecificDeviceQuery, useUpdateDeviceByIdMutation } from "../../../../../../../Redux/Devicestwo";

const SetSpeedLimit = ({ device, setControlsPopup, setIsControlsPopup }) => {
  const {
    data: oldData,
    refetch,
    isLoading,
  } = useGetSpecificDeviceQuery(device.id);
  const [updateDeviceById] = useUpdateDeviceByIdMutation();

  const formik = useFormik({
    initialValues: { speedLimit: oldData?.[0].attributes?.speedLimit || "" },
    enableReinitialize: true,
    validationSchema: Yup.object({
      speedLimit: Yup.number().required("Speed limit is required"),
    }),
    onSubmit: async (val) => {
      try {
        const body = {
          id: device.id,
          attributes: {
            speedLimit: val.speedLimit,
          },
          groupId: oldData?.[0].groupId,
          calendarId: oldData?.[0].calendarId,
          name: oldData?.[0].name,
          uniqueId: oldData?.[0].uniqueId,
          status: oldData?.[0].status,
          lastUpdate: oldData?.[0].lastUpdate,
          positionId: oldData?.[0].positionId,
          phone: oldData?.[0].phone,
          model: oldData?.[0].model,
          contact: oldData?.[0].contact,
          category: oldData?.[0].category,
          disabled: oldData?.[0].disabled,
          expirationTime: oldData?.[0].expirationTime,
        };
        await updateDeviceById({ id: device.id, val: body }).unwrap();
        await refetch();
        setControlsPopup("");
        setIsControlsPopup(false);
      } catch (error) {
        console.error("Error updating speed limit:", error);
      }
    },
  });

  if (isLoading) return <>Loading...</>;

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <Input
          title={"Enter Speed Limit"}
          type="number"
          placeholder="120 km/h"
          id="speedLimit"
          name="speedLimit"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.speedLimit}
        />
        {formik.touched.speedLimit && formik.errors.speedLimit ? (
          <div>{formik.errors.speedLimit}</div>
        ) : null}
        <div className="w-100 flex-row justify-end">
          <Button
            text="Save"
            type="submit"
            style="button fs-14 p-6-12 btn-success mt-12"
          />
        </div>
      </div>
    </form>
  );
};

export default SetSpeedLimit;
