/* eslint-disable react/style-prop-object */
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../Helpers/Input/Input";
import Button from "../../../../../../Helpers/Button/Button";

const StopEngine = ({ device, setControlsPopup, setIsControlsPopup }) => {

  return (
      <div>
        <p className="text2">Do you want to start the engine for “ <span className="text1">{device.name}</span> “</p>
        <div className="w-100 flex-row justify-end gap-2">
        <Button
            text="Cancel"
            type="button"
            style="button btn-default fs-14 p-6-12 mt-12"
            onClick={() => setControlsPopup("")}
          />
          <Button
            text="Yes"
            type="button"
            style="button fs-14 p-6-12 btn-success mt-12"
            onClick={() => setControlsPopup("")}
          />
        </div>
      </div>
  );
};

export default StopEngine;
