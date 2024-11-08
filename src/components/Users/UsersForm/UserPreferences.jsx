import React from "react";
import {
  InputAltitudeUnit,
  InputDistanceUnit,
  InputSpeedUnit,
  InputVolumeUnit,
} from "../../Helpers/Input/Input";
import PhoneInput from "react-phone-input-2";

export default function UserPreferences({ addData }) {
  return (
    <div className="userinfo mb-24">
      <p className="fs-16 fw-700 brand-700 text-uppercase">user preferences</p>
      <div className="flex-between">
        <div className={`position-relative driver-input user-form `}>
          <label className="form-label">Phone Number</label>
          <PhoneInput
            country={"sa"}
            id="phone"
            name="phone"
            countryCodeEditable={false}
            enableSearch={true}
            disableSearchIcon
            onBlur={addData.handleBlur}
            onChange={(value) => addData.setFieldValue("phone", value)}
            value={addData.values.phone || ""}
          />
        </div>
        <InputSpeedUnit
          formstyle="user-form"
          id="attributes.speedUnit"
          name="attributes.speedUnit"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          value={addData.values.attributes.speedUnit || ""}
        />
      </div>
      <div className="flex-between">
        <InputDistanceUnit
          formstyle="user-form"
          id="attributes.distanceUnit"
          name="attributes.distanceUnit"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          value={addData.values.attributes.distanceUnit || ""}
        />
        <InputAltitudeUnit
          formstyle="user-form"
          id="attributes.altitudeUnit"
          name="attributes.altitudeUnit"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          value={addData.values.attributes.altitudeUnit || ""}
        />
        <InputVolumeUnit
          formstyle="user-form"
          id="attributes.volumeUnit"
          name="attributes.volumeUnit"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          value={addData.values.attributes.volumeUnit || ""}
        />
      </div>
    </div>
  );
}
