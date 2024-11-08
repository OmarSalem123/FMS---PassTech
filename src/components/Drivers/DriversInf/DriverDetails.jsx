import React from "react";
import PopupBodyItem from "../../Helpers/Popup/PopupParts/PopupBodyItem";
import { formatDate } from "../../../JsHelpers/DateFormat";

export default function DriverDetails({ values = {} }) {
  const getValue = (value, defaultValue = "-----") =>
    value ? value : defaultValue;

  const {
    name = "",
    code = "",
    idNo = "",
    contractStartDate = "",
    contractExpireDate = "",
    contractExpireReminder = false,
    licenseExpireReminder = false,
    phoneNumber = "",
    emergencyPhoneNumber = "",
    licenseNo = "",
    address = "",
    licenseStartDate,
    licenseExpireDate,
  } = values;

  const formattedLicenseStartDate = licenseStartDate
    ? formatDate(licenseStartDate).formattedDate
    : "-----";
  const formattedLicenseExpireDate = licenseExpireDate
    ? formatDate(licenseExpireDate).formattedDate
    : "-----";
  const formattedContractStartDate = contractStartDate
    ? formatDate(contractStartDate).formattedDate
    : "-----";
  const formattedContractExpireDate = contractExpireDate
    ? formatDate(contractExpireDate).formattedDate
    : "-----";

  const getOnOffStatus = (status) => (status ? "ON" : "OFF");

  return (
    <>
      <p className="fs-16 fw-700 brand-700 text-uppercase">Driver Details</p>
      <div className="row">
        <div className="col-lg-6">
          <div className="display-border">
            <PopupBodyItem title="Driver Name" item={getValue(name)} />
            <PopupBodyItem title="Driver Code" item={getValue(code)} />
            <PopupBodyItem title="ID Number" item={getValue(idNo)} />
            <PopupBodyItem
              title="License Start Date"
              item={formattedLicenseStartDate}
            />
            <PopupBodyItem
              title="License Expire Date"
              item={formattedLicenseExpireDate}
            />
            <PopupBodyItem
              title="License Expire Reminder"
              item={getOnOffStatus(licenseExpireReminder)}
            />
            <PopupBodyItem title="Address" item={getValue(address)} />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="display-border">
            <PopupBodyItem title="Phone Number" item={getValue(phoneNumber)} />
            <PopupBodyItem
              title="Emergency Number"
              item={getValue(emergencyPhoneNumber)}
            />
            <PopupBodyItem title="License Number" item={getValue(licenseNo)} />
            <PopupBodyItem
              title="Contract Start Date"
              item={formattedContractStartDate}
            />
            <PopupBodyItem
              title="Contract End Date"
              item={formattedContractExpireDate}
            />
            <PopupBodyItem
              title="Contract Expire Reminder"
              item={getOnOffStatus(contractExpireReminder)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
