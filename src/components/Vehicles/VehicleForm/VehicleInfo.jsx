import React from "react";
import {
  Input,
  InputCountriesGroup,
  InputFuelGroup,
  InputVehicleGroup,
  Sensors,
} from "../../Helpers/Input/Input";
import FuelSupport from "./FuelSupport/FuelSupport";

export default function VehicleInfo({ addData }) {
  return (
    <div className="vehicleinfo mb-24">
      <p className="fs-16 fw-700 brand-700 text-uppercase">vehicle info</p>
      <div className="flex-between">
        <Input
          title="Vehicle name"
          type="text"
          placeholder="Name"
          id="name"
          name="name"
          formstyle="vehicle-form"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          errors={addData.errors.name}
          touched={addData.touched.name}
          value={addData.values.name || ""}
        />

        <Input
          title="Plate Number"
          type="text"
          placeholder="License plate"
          id="plateNumber"
          name="plateNumber"
          formstyle="vehicle-form"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          errors={addData.errors.plateNumber}
          touched={addData.touched.plateNumber}
          value={addData.values.plateNumber || ""}
        />
      </div>
      <div className="flex-between">
        <Input
          title="VIN"
          type="text"
          placeholder="VIN"
          id="vin"
          name="vin"
          formstyle="vehicle-form"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          value={addData.values.vin || ""}
        />

        <Input
          title="Code"
          type="text"
          placeholder="Code"
          id="code"
          name="code"
          formstyle="vehicle-form"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          value={addData.values.code || ""}
        />
      </div>
      <div className="flex-between">
        <InputVehicleGroup
          id="vehicleType"
          name="vehicleType"
          formstyle="vehicle-form"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          errors={addData.errors.vehicleType}
          touched={addData.touched.vehicleType}
          value={addData.values.vehicleType || ""}
        />

        <Input
          title="Registration number"
          type="text"
          placeholder="Registration Number"
          id="registrationNumber"
          name="registrationNumber"
          formstyle="vehicle-form"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          errors={addData.errors.registrationNumber}
          touched={addData.touched.registrationNumber}
          value={addData.values.registrationNumber || ""}
        />
      </div>
      <div className="flex-between">
        <Input
          title="Model"
          type="text"
          placeholder="Model"
          id="model"
          name="model"
          formstyle="vehicle-form"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          value={addData.values.model || ""}
        />

        <Input
          title="Brand"
          type="text"
          placeholder="Vehicle Brand"
          id="brand"
          name="brand"
          formstyle="vehicle-form"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          value={addData.values.brand || ""}
        />
      </div>
      <div className="flex-between">
        <Input
          title="Color"
          type="text"
          id="color"
          name="color"
          placeholder="Vehicle Color"
          formstyle="vehicle-form"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          value={addData.values.color || ""}
        />

        <Input
          title="Year"
          type="text"
          id="year"
          name="year"
          placeholder="Year"
          formstyle="vehicle-form"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          errors={addData.errors.year}
          touched={addData.touched.year}
          value={addData.values.year || ""}
        />
      </div>
      <div className="flex-between">
        <InputCountriesGroup
          id="make"
          name="make"
          formstyle="vehicle-form"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          value={addData.values.make || ""}
        />

        <InputFuelGroup
          id="fuelType"
          name="fuelType"
          formstyle="vehicle-form"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          value={addData.values.fuelType || ""}
        />
      </div>
      <div className="flex-between">
        <Input
          title="Fuel Consumption"
          type="text"
          placeholder="Liter/100 KM"
          id="fuelConsumption"
          name="fuelConsumption"
          formstyle="vehicle-form"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          errors={addData.errors.fuelConsumption}
          touched={addData.touched.fuelConsumption}
          value={addData.values.fuelConsumption || ""}
        />

        <Input
          title="Fuel Cost"
          type="text"
          placeholder="0.0 SAR"
          id="fuelCost"
          name="fuelCost"
          formstyle="vehicle-form"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          errors={addData.errors.fuelCost}
          touched={addData.touched.fuelCost}
          value={addData.values.fuelCost || ""}
        />
      </div>

      <div className="w-50">
        <Sensors
          vehicleInf={true}
          title="Fuel"
          id="fuelSupport"
          name="fuelSupport"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          value={addData.values.fuelSupport || ""}
        />
      </div>
      {addData.values.fuelSupport && <FuelSupport addData={addData} />}
    </div>
  );
}
