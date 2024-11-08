import React from "react";
import PopupBodyItem from "../../Helpers/Popup/PopupParts/PopupBodyItem";
import { useListAllDriversQuery } from "../../../Redux/service/Drivers/Drivers";

export default function VehicleDetails({ values = {} }) {
  const getValue = (value, defaultValue = "-----") =>
    value ? value : defaultValue;

  const {
    name = "",
    code = "",
    plateNumber = "",
    fuelType = "",
    idleAlert = "",
    vin = "",
    simNumber = "",
    simNumberSerial = "",
    make = "",
    model = "",
    year = "",
    fuelCapacity = "",
    tankLength = "",
    tankHeight = "",
    tankWidth = "",
    vehicleType = "",
    driverId = "",
    registrationNumber = "",
    odometer = "",
    fuelSupport = "",
    fuelCost = "",
    fuelConsumption = "",
    idleTime = "",
    archived = "",
    imei = "",
    vehicleExpires = "",
    licenseExpire = "",
    licenseExpireReminder,
    brand = "",
    color = "",
  } = values;

  const { data: driversData = [] } = useListAllDriversQuery();
  const selectedDriver = driversData.find((driver) => driver.id === driverId);
  const formatIdleTime = (time) =>
    time ? `${time} Minute${time > 1 ? "s" : ""}` : "-----";
  const formatOdometer = (distance) => (distance ? `${distance} KM` : "-----");
  const getOnOffStatus = (status) => (status === true ? "ON" : "OFF");
  const getFMSStatus = (status) => (status === true ? "Archived" : "Active");
  return (
    <>
      <p className="fs-16 fw-700 brand-700 text-uppercase">Vehicle Details</p>
      <div className="row">
        <div className="col-lg-6">
          <div className="display-border">
            <PopupBodyItem title="Name" item={getValue(name)} />
            <PopupBodyItem title="Code" item={getValue(code)} />{" "}
            <PopupBodyItem title="Plate Number" item={getValue(plateNumber)} />
            <PopupBodyItem title="Vehicle Type" item={getValue(vehicleType)} />
            <PopupBodyItem title="Make" item={getValue(make)} />
            <PopupBodyItem title="Model" item={getValue(model)} />{" "}
            <PopupBodyItem title="Brand" item={getValue(brand)} />
            <PopupBodyItem title="Year" item={getValue(year)} />
            <PopupBodyItem title="Color" item={getValue(color)} />
            <PopupBodyItem title="Fuel Type" item={getValue(fuelType)} />
            <PopupBodyItem
              title="Fuel Capacity"
              item={getValue(fuelCapacity)}
            />
            <PopupBodyItem
              title="Fuel Consumption"
              item={getValue(fuelConsumption)}
            />
            <PopupBodyItem
              title="Fuel Cost"
              item={getValue(fuelCost) + " " + "SAR"}
            />
            <PopupBodyItem
              title="Fuel Support"
              item={getOnOffStatus(fuelSupport)}
            />
            <PopupBodyItem title="Tank Height" item={getValue(tankHeight)} />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="display-border">
            <PopupBodyItem title="Tank Width" item={getValue(tankWidth)} />
            <PopupBodyItem title="Tank Length" item={getValue(tankLength)} />
            <PopupBodyItem title="IMEI" item={getValue(imei)} />
            <PopupBodyItem
              title="SIM Number"
              item={`+${getValue(simNumber)}`}
            />
            <PopupBodyItem
              title="SIM Number Serial"
              item={`${getValue(simNumberSerial)}`}
            />
            <PopupBodyItem title="VIN" item={getValue(vin)} />
            <PopupBodyItem
              title="Registration Number"
              item={getValue(registrationNumber)}
            />
            <PopupBodyItem
              title="Vehicle Expire Date"
              item={getValue(vehicleExpires)}
            />
            <PopupBodyItem
              title="License Expire Date"
              item={getValue(licenseExpire)}
            />
            <PopupBodyItem
              title="License Expire Reminder"
              item={getOnOffStatus(licenseExpireReminder)}
            />
            <PopupBodyItem title="FMS Status" item={getFMSStatus(archived)} />{" "}
            <PopupBodyItem title="Odometer" item={formatOdometer(odometer)} />
            <PopupBodyItem title="Idle Time" item={formatIdleTime(idleTime)} />
            <PopupBodyItem
              title="Idle Alert"
              item={getOnOffStatus(idleAlert)}
            />
            <PopupBodyItem
              title="Assigned Driver"
              item={getValue(selectedDriver?.name)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
