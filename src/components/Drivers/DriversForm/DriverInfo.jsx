import React from "react";
import { Input, InputParentGroup } from "../../Helpers/Input/Input";
import PhoneInput from "react-phone-input-2";

export default function DriverInfo({ addData }) {
  return (
    <div className="driverinfo mb-24">
      <div className="flex-between">
        <Input
          title="Name"
          type="text"
          placeholder="Ex. Ahmed Ali"
          formstyle="driver-form"
          id="name"
          name="name"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          errors={addData.errors.name}
          touched={addData.touched.name}
          value={addData.values.name || ""}
        />
        <Input
          title="Code"
          type="text"
          placeholder="Ex. 123AB"
          formstyle="driver-form"
          id="code"
          name="code"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          value={addData.values.code || ""}
        />
      </div>

      <div className="flex-between">
        <Input
          title="Address"
          type="text"
          placeholder="EX. Riydah - SaudiArabia"
          formstyle="driver-form"
          id="address"
          name="address"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          value={addData.values.address || ""}
        />
        <Input
          title="ID number"
          type="text"
          placeholder="EX. A12345678910"
          formstyle="driver-form"
          id="idNo"
          name="idNo"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          value={addData.values.idNo || ""}
        />
      </div>
      <div className="flex-between">
        <div
          className={`position-relative driver-input driver-form ${
            addData.touched.phoneNumber &&
            addData.errors.phoneNumber &&
            "form-error"
          }`}
        >
          <label className="form-label">Phone Number</label>
          <PhoneInput
            country={"sa"}
            id="phoneNumber"
            name="phoneNumber"
            onBlur={addData.handleBlur}
            onChange={(value) => addData.setFieldValue("phoneNumber", value)}
            value={addData.values.phoneNumber || ""}
            countryCodeEditable={false}
            enableSearch={true}
            disableSearchIcon
          />
          {addData.touched.phoneNumber && addData.errors.phoneNumber ? (
            <div className="validation">{addData.errors.phoneNumber}</div>
          ) : null}
        </div>
        <div
          className={`position-relative driver-input driver-form ${
            addData.touched.emergencyPhoneNumber &&
            addData.errors.emergencyPhoneNumber &&
            "form-error"
          }`}
        >
          <label className="form-label">Emergency Number</label>
          <PhoneInput
            country={"sa"}
            id="emergencyPhoneNumber"
            name="emergencyPhoneNumber"
            onBlur={addData.handleBlur}
            onChange={(value) =>
              addData.setFieldValue("emergencyPhoneNumber", value)
            }
            value={addData.values.emergencyPhoneNumber || ""}
            countryCodeEditable={false}
            enableSearch={true}
            disableSearchIcon
          />
          {addData.touched.emergencyPhoneNumber &&
          addData.errors.emergencyPhoneNumber ? (
            <div className="validation">
              {addData.errors.emergencyPhoneNumber}
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex-between">
        <Input
          title="Liscence Nnumber"
          type="text"
          placeholder="abc - 123"
          id="licenseNo"
          name="licenseNo"
          formstyle="driver-form"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          value={addData.values.licenseNo || ""}
        />
        <InputParentGroup
          id="parent"
          name="parent"
          title="Parent"
          formstyle="driver-form"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          errors={addData.errors.parent}
          touched={addData.touched.parent}
          value={addData.values.parent || ""}
        />
      </div>
    </div>
  );
}
