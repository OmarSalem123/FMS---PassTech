import React from "react";
import { Input, Switch } from "../../Helpers/Input/Input";
import { formatDate } from "../../../JsHelpers/DateFormat";

export default function DriverDateInfo({ addData }) {
  const convertDateFormat = (date) => {
    if (!date || date === null) return "";
    const [month, day, year] = date.split("/").map(Number);
    return `${year}-${month?.toString().padStart(2, "0")}-${day
      ?.toString()
      .padStart(2, "0")}`;
  };
  const { formattedDate: licenseStart } = formatDate(
    addData.values.licenseStartDate
  );
  const { formattedDate: licenseExpire } = formatDate(
    addData.values.licenseExpireDate
  );
  const { formattedDate: contractStart } = formatDate(
    addData.values.contractStartDate
  );
  const { formattedDate: contractExpire } = formatDate(
    addData.values.contractExpireDate
  );
  const addOneDay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="driverinfo mb-24">
      <p className="fs-16 fw-700 brand-700 text-uppercase">date info</p>
      <div className="flex-between">
        <Input
          title="Contract start date"
          type="date"
          formstyle="vehicle-form"
          id="contractStartDate"
          name="contractStartDate"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          value={
            addData.values.contractStartDate
              ? convertDateFormat(contractStart)
              : ""
          }
        />
        <Input
          title="Contract expiry date"
          type="date"
          formstyle="vehicle-form"
          id="contractExpireDate"
          name="contractExpireDate"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          value={
            addData.values.contractExpireDate
              ? convertDateFormat(contractExpire)
              : ""
          }
          errors={addData.errors.contractExpireDate}
          touched={addData.touched.contractExpireDate}
          disabled={addData.values.contractStartDate ? false : true}
          min={
            addData.values.contractStartDate
              ? addOneDay(addData.values.contractStartDate)
              : undefined
          }
        />
      </div>
      <div className="flex-between">
        <div className="flex-between w-50  mb-16">
          <label className="form-label">Contract Expire Reminder</label>
          <div className="y-25">
            <Switch
              id="contractExpireReminder"
              name="contractExpireReminder"
              onBlur={addData.handleBlur}
              onChange={addData.handleChange}
              value={addData.values.contractExpireReminder || ""}
            />
          </div>
        </div>
      </div>
      <div className="flex-between">
        <Input
          title="Liscense start date"
          type="date"
          formstyle="vehicle-form"
          id="licenseStartDate"
          name="licenseStartDate"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          value={
            addData.values.licenseStartDate
              ? convertDateFormat(licenseStart)
              : ""
          }
        />
        <Input
          title="Liscense expiry date"
          type="date"
          formstyle="vehicle-form"
          id="licenseExpireDate"
          name="licenseExpireDate"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          value={
            addData.values.licenseExpireDate
              ? convertDateFormat(licenseExpire)
              : ""
          }
          errors={addData.errors.licenseExpireDate}
          touched={addData.touched.licenseExpireDate}
          disabled={addData.values.licenseStartDate ? false : true}
          min={
            addData.values.licenseStartDate
              ? addOneDay(addData.values.licenseStartDate)
              : undefined
          }
        />
      </div>
      <div className="flex-between">
        <div className="d-flex justify-content-between align-items-center w-50">
          <label className="form-label">Liscense Expire Reminder</label>
          <div className="y-25">
            <Switch
              onBlur={addData.handleBlur}
              onChange={addData.handleChange}
              id="licenseExpireReminder"
              name="licenseExpireReminder"
              value={addData.values.licenseExpireReminder || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
