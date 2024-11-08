/* eslint-disable react/style-prop-object */
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Button from "../../Helpers/Button/Button";
import { useSelector } from "react-redux";

export default function DashboardHead() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const inf = useSelector((state) => state.users.user);
  return (
    <>
      <div className="flex-between">
        <div className="dashboard-welcome">
          <p className="fs-24 fw-600">Welcome back, {inf.name}</p>
        </div>
        <div className="flex-between y-15">
          <Button
            style="button p-4-10 btn-default me-2"
            text="Export"
            img="Download.svg"
          />
          {/**   <div>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              portalId="root"
              onChange={(update) => {
                setDateRange(update);
              }}
              className="datepicker"
            />
          </div>**/}
        </div>
      </div>
    </>
  );
}