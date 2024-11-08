import React from "react";
import { Input } from "../../../Helpers/Input/Input";

export default function FuelSupport({ addData }) {
  return (
    <>
      <div className="flex-between">
          <Input
            title="Fuel Capacity"
            type="text"
            placeholder="Fuel Capacity"
            id="fuelCapacity"
            name="fuelCapacity"
            formstyle="vehicle-form"
            onBlur={addData.handleBlur}
            onChange={addData.handleChange}
            errors={addData.errors.fuelCapacity}
            touched={addData.touched.fuelCapacity}
            value={addData.values.fuelCapacity || ""}
          />
          <Input
            title="Tank Height"
            type="text"
            placeholder="Tank Height"
            id="tankHeight"
            name="tankHeight"
            formstyle="vehicle-form"
            onBlur={addData.handleBlur}
            onChange={addData.handleChange}
            errors={addData.errors.tankHeight}
            touched={addData.touched.tankHeight}
            value={addData.values.tankHeight || ""}
          />
      </div>

      <div className="flex-between">
          <Input
            title="Tank Width"
            type="text"
            placeholder="Tank Width"
            id="tankWidth"
            name="tankWidth"
            onBlur={addData.handleBlur}
            onChange={addData.handleChange}
            errors={addData.errors.tankWidth}
            touched={addData.touched.tankWidth}
            value={addData.values.tankWidth || ""}
          />
          <Input
            title="Tank Length"
            type="text"
            placeholder="Tank Length"
            id="tankLength"
            name="tankLength"
            onBlur={addData.handleBlur}
            onChange={addData.handleChange}
            errors={addData.errors.tankLength}
            touched={addData.touched.tankLength}
            value={addData.values.tankLength || ""}
          />
      </div>
    </>
  );
}
