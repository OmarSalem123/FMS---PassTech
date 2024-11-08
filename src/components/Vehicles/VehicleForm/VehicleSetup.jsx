import React from "react";
import {
  Input,
  InputDriversGroup,
  InputParentGroup,
  Switch,
} from "../../Helpers/Input/Input";
import PhoneInput from "react-phone-input-2";

export default function VehicleSetup({ addData }) {
  return (
    <div className="vehiclesetup mb-24">
      <p className="fs-16 fw-700 brand-700 text-uppercase">vehicle setup</p>

      <div className="flex-between">
        <div className="vehicle-input">
          <Input
            title="IMEI number"
            type="text"
            placeholder="IMEI"
            id="imei"
            name="imei"
            formstyle="vehicle-form"
            onBlur={addData.handleBlur}
            onChange={addData.handleChange}
            errors={addData.errors.imei}
            touched={addData.touched.imei}
            value={addData.values.imei || ""}
          />
        </div>
        <div
          className={`position-relative driver-input driver-form ${
            addData.touched.simNumber &&
            addData.errors.simNumber &&
            "form-error"
          }`}
        >
          {/**   <Input
            title="SIM number"
            type="text"
            placeholder="SIM"
            id="simNumber"
            name="simNumber"
            formstyle="vehicle-form"
            onBlur={addData.handleBlur}
            onChange={addData.handleChange}
            errors={addData.errors.simNumber}
            touched={addData.touched.simNumber}
            value={addData.values.simNumber || ""}
          />**/}{" "}
          <label className="form-label">SIM Number</label>
          <PhoneInput
            country={"sa"}
            id="simNumber"
            name="simNumber"
            onBlur={addData.handleBlur}
            onChange={(value) => addData.setFieldValue("simNumber", value)}
            value={addData.values.simNumber || ""}
            countryCodeEditable={false}
            enableSearch={true}
            disableSearchIcon
          />
          {addData.touched.simNumber && addData.errors.simNumber ? (
            <div className="validation">{addData.errors.simNumber}</div>
          ) : null}
        </div>
      </div>

      <div className="flex-between">
        <div className="vehicle-input">
          <Input
            title="SIM Number Serial"
            type="text"
            placeholder="SIM"
            id="simNumberSerial"
            name="simNumberSerial"
            formstyle="vehicle-form"
            onBlur={addData.handleBlur}
            onChange={addData.handleChange}
            value={addData.values.simNumberSerial || ""}
          />
        </div>
        <div className="vehicle-input">
          <Input
            title="Odometer"
            type="text"
            placeholder="KM"
            id="odometer"
            name="odometer"
            formstyle="vehicle-form"
            onBlur={addData.handleBlur}
            onChange={addData.handleChange}
            errors={addData.errors.odometer}
            touched={addData.touched.odometer}
            value={addData.values.odometer || ""}
          />
        </div>
      </div>

      <div className="flex-between">
        <div className="vehicle-input">
          <Input
            title="Vehicle Expiration"
            type="date"
            id="vehicleExpires"
            name="vehicleExpires"
            formstyle="vehicle-form"
            onBlur={addData.handleBlur}
            onChange={addData.handleChange}
            errors={addData.errors.vehicleExpires}
            touched={addData.touched.vehicleExpires}
            value={addData.values.vehicleExpires || ""}
          />
        </div>
        <div className="vehicle-input">
          <div className="vehicle-form">
            <div className="by-100 flex-between">
              <label className="form-label by-25">
                Liscense Expiration Reminder
              </label>
              <div className="y-15">
                <Switch
                  id="licenseExpireReminder"
                  name="licenseExpireReminder"
                  onBlur={addData.handleBlur}
                  onChange={addData.handleChange}
                  value={addData.values.licenseExpireReminder || ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-between">
        {addData.values.licenseExpireReminder && (
          <div className="vehicle-input">
            <Input
              title="License Expire"
              type="date"
              id="licenseExpire"
              name="licenseExpire"
              formstyle="vehicle-form"
              onBlur={addData.handleBlur}
              onChange={addData.handleChange}
              errors={addData.errors.licenseExpire}
              touched={addData.touched.licenseExpire}
              value={addData.values.licenseExpire || ""}
            />
          </div>
        )}
        <div className="vehicle-input">
          <InputParentGroup
            id="parent"
            name="parent"
            formstyle="vehicle-form"
            onBlur={addData.handleBlur}
            onChange={addData.handleChange}
            errors={addData.errors.parent}
            touched={addData.touched.parent}
            value={addData.values.parent || ""}
          />
        </div>
       {/** <div className="vehicle-input">
          <InputDriversGroup
            id="driverId"
            name="driverId"
            title="Driver"
            type="text"
            placeholder="Driver"
            formstyle="vehicle-form"
            onBlur={addData.handleBlur}
            onChange={addData.handleChange}
            value={addData.values.driverId || ""}
          />
        </div>*/}
        <div className="vehicle-input">
          <div className="position-relative">
            <Input
              title="Idle time"
              type="text"
              placeholder="Minutes/s"
              id="idleTime"
              name="idleTime"
              formstyle="vehicle-form"
              onBlur={addData.handleBlur}
              onChange={addData.handleChange}
              errors={addData.values.idleAlert ? addData.errors.idleTime : ""}
              touched={addData.values.idleAlert ? addData.touched.idleTime : ""}
              disabled={addData.values.idleAlert ? false : true}
              value={addData.values.idleAlert ? addData.values.idleTime : ""}
            />
            <div className="Input-switch">
              <Switch
                id="idleAlert"
                name="idleAlert"
                onBlur={addData.handleBlur}
                onChange={addData.handleChange}
                value={addData.values.idleAlert}
              />
              <div>
                <span className="switch-alert-label">Alert</span>
              </div>
            </div>
          </div>
        </div>
        <div className="vehicle-input">
          <div className="vehicle-form">
            <label className="form-label">Vehicle condition</label>
            <div className="d-flex">
              <Switch
                id="archived"
                name="archived"
                onBlur={addData.handleBlur}
                onChange={addData.handleChange}
                value={addData.values.archived}
              />
              <span className="switch-archive-label">Archived</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
