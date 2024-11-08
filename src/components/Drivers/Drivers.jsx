/* eslint-disable react/style-prop-object */
import React, { useContext, useEffect, useState } from "react";
import SecondHeader from "../Header/SecondHeader";
import DriversHead from "./DriversParts/DriversHead";

import { popupcontext } from "../../context/Popupscontext";
import { Helmet } from "react-helmet";
import { useGetAllDriversQuery } from "../../Redux/service/Drivers/Drivers";
import { filtrationcontext } from "../../context/Filtercontext";
import Loader from "../Helpers/Loader/Loader";
import Table from "../Helpers/Table/Table";
import Pagination from "../Helpers/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { addDrivers } from "../../Redux/service/Drivers/DriversSlice";
import { DriverForm } from "./DriversForm/DriverForm";

export default function Drivers() {
  let { handleShow, setEdited } = useContext(popupcontext);

  const { limit, setLimit, totalPages } = useContext(filtrationcontext);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  sessionStorage.setItem("page", currentPage);
  const dispatch = useDispatch();

  let {
    data: DriverData,
    isLoading,
    refetch,
  } = useGetAllDriversQuery(
    { page: currentPage, limit: limit },
    {
      skip: !currentPage || !limit,
    }
  );
  console.log("sadasfdsaf", DriverData);
  const HeadField = [
    "Driver Name",
    "Driver Code",
    "ID Number",
    "Phone number",
    "Address",
    "Actions",
  ];
  useEffect(() => {
    return () => setLimit(10);
  }, [setLimit]);

  useEffect(() => {
    if (DriverData) {
      dispatch(addDrivers(DriverData.drivers));
      if (DriverData?.drivers.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }

    setLoading(false);
  }, [DriverData, currentPage, dispatch]);

  const handleSuccess = async (newDriver) => {
    if (DriverData) {
      setLoading(true);

      //const updatedDrivers = [newDriver, ...DriverData.drivers].slice(0, 5);
      refetch();
    }
  };
  const handleEdit = async (updatedDriver) => {
    if (DriverData) {
      dispatch(
        addDrivers(
          DriverData.drivers.map((driver) =>
            driver?.id === updatedDriver?.id ? updatedDriver : driver
          )
        )
      );
      setEdited(true);
      refetch();
    }
  };
  const handlePageClick = async (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
  };
  const inf = useSelector((state) => state.users.user);

  return (
    <>
      <Helmet>
        <title>Drivers</title>
        <meta name="description" content="Drivers" />
      </Helmet>
      {(inf.administrator === true ||
        inf.deviceReadonly === true ||
        (inf.administrator === false &&
          (inf.deviceLimit > 0 || inf.deviceLimit === -1))) && (
        <>
          <SecondHeader
            title="Drivers"
            add="Add new driver"
            onClick={() => handleShow("addForm")}
          />
        </>
      )}

      <DriversHead />
      {isLoading || loading ? (
        <div className="loader-container loader-table">
          <Loader />
        </div>
      ) : (
        <>
          <Table
            HeadField={HeadField}
            BodyData={DriverData?.drivers}
            type="drivers"
          />
          <Pagination
            handlePageClick={handlePageClick}
            pageCount={
              totalPages
                ? Math.ceil(totalPages / limit)
                : Math.ceil(DriverData.totalPages)
            }
          />
        </>
      )}
      <DriverForm onSuccess={handleSuccess} onEdit={handleEdit} />
    </>
  );
}
