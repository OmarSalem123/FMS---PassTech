import React, { useContext, useEffect, useState } from "react";
import ObjectSelected from "../../ObjectSelected/ObjectSelected";
import { popupcontext } from "../../../../context/Popupscontext";
import { useGetUsersDeviceQuery } from "../../../../Redux/service/Devices";
import { formatDate } from "../../../../JsHelpers/DateFormat";
import { useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import Loader from "../../../Helpers/Loader/Loader";
import { useLocation } from "react-router-dom";
import Delete from "../../../Helpers/Delete/DeletePopup";
import { useGetUsersGeofencesQuery } from "../../../../Redux/service/Geofences/Geofences";
import Display from "../../../Helpers/Table/Table Actions/Display";
import { draggablecontext } from "../../../../context/Draggablecontext";
import { filtrationcontext } from "../../../../context/Filtercontext";

export default function ObjectTableRows({ userid, setUserDevices }) {
  let {
    handleShowObject,
    handleShow,
    object,
    objectselect,
    setObjectselect,
    setHistoryPlayback,
    handleEditForm,
    refetchGeofences,
    setRefetchGeofences,
  } = useContext(popupcontext);
  let { GeofencessearchQuery, filter } = useContext(filtrationcontext);
  let { handleFocusClick } = useContext(draggablecontext);
  let { pathname } = useLocation();
  const [selectedId, setSelectedId] = useState(null);
  const [imei, setImei] = useState(null);
  const [shownData, setShownData] = useState([]);
  const { ObjectsearchQuery } = useContext(filtrationcontext);
  let { data, isLoading } = useGetUsersDeviceQuery(userid);
  const { data: Geofences, refetch } = useGetUsersGeofencesQuery(userid, {
    skip: !userid,
  });

  useEffect(() => {
    let filteredData = [];
    if (!ObjectsearchQuery) {
      filteredData = data;
    } else {
      filteredData = data?.filter((devices) => {
        const matchesSearch = ObjectsearchQuery
          ? devices.name.toLowerCase().includes(ObjectsearchQuery.toLowerCase())
          : true;
        return matchesSearch;
      });
    }
    setShownData(filteredData);
  }, [ObjectsearchQuery, data, filter]);
  const positions = useSelector((state) => state.webSocket.positions);
  const devices = useSelector((state) => state.webSocket.devices);
  const map = useMap();

  const getFormattedDate = (serverTime) => formatDate(serverTime);

  const handleRowClick = (id, lat, lon, imei) => {
    setObjectselect(id === selectedId ? !objectselect : true);
    setSelectedId(id);
    handleShowObject();
    const targetCoordinates = lat && lon ? [lat, lon] : [33, 30];
    map.setView(targetCoordinates, 13);
    setImei(imei);
    setHistoryPlayback({ state: true, Id: id });
  };

  const handleDeleteClick = (GeoId) => {
    if (GeoId) {
      handleShow("deleteItem", "geofences", GeoId);
    }
  };
  const parseWKTPolygon = (wkt) => {
    const cleanedWKT = wkt.replace("POLYGON ((", "").replace("))", "");
    const coordinates = cleanedWKT.split(", ").map((coord) => {
      const [lng, lat] = coord.split(" ").map(Number);
      return [lng, lat];
    });
    return coordinates;
  };
  useEffect(() => {
    if (refetchGeofences) {
      refetch();
      setRefetchGeofences(false);
    }
  }, [refetchGeofences, refetch, setRefetchGeofences]);
  const filteredGeofences = Geofences?.filter((geofence) =>
    geofence.name.toLowerCase().includes(GeofencessearchQuery.toLowerCase())
  );
  if (isLoading) return <Loader />;
  if (pathname === "/geofences") {
    if (filteredGeofences?.length === 0) {
      return (
        <>
          <div className="my-5 p-5">
            <div className="text-center text-success fs-16 fw-700">
              No data shown
            </div>
          </div>
        </>
      );
    }
  }
  return (
    <>
      {pathname === "/livetracking" && (
        <>
          {shownData?.map((i) => {
            const position = positions.find(
              (position) => position.deviceId === i.id
            );
            const device = devices.find((device) => device.id === i.id);
            const speed = position ? `${Math.round(position.speed)}` : 0;
            const { formattedDate, formattedTime } = getFormattedDate(
              position?.serverTime
            );

            return (
              <div key={i.id}>
                <div
                  className="object-table object-table-row"
                  onClick={() => {
                    handleRowClick(
                      i.id,
                      position?.latitude ?? 24.7136,
                      position?.longitude ?? 46.6753,
                      i?.uniqueId
                    );
                  }}
                >
                  <div className="table-checkbox">
                    <input
                      type="checkbox"
                      checked={
                        (object && i.id === selectedId) ||
                        (object && objectselect && i.id === selectedId)
                      }
                      onChange={() => {}}
                    />
                  </div>
                  <div className="fs-14 fw-400 object-table-element w-25">
                    {i.name}
                  </div>
                  <div className="fs-14 fw-400 object-table-element">
                    {device?.status === "online" &&
                    position?.attributes.motion !== false
                      ? speed
                      : 0}{" "}
                    Km/h
                  </div>
                  <div
                    className="fs-14 fw-400 object-table-element"
                    style={{ width: "80px" }}
                  >
                    <p className="fs-14 fw-400 object-table-element m-0">
                      {formattedDate !== "Invalid Date" ? formattedDate : "N/A"}
                    </p>
                    <p className="fs-14 fw-400 object-table-element m-0">
                      {formattedTime !== "Invalid Date" ? formattedTime : ""}
                    </p>
                  </div>
                  <div className="object-table-element">
                    <div
                      className={
                        device?.status === "online"
                          ? "status-online"
                          : "status-offline"
                      }
                    ></div>
                  </div>
                  <div
                    className="object-table-element object-eye-focus "
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFocusClick(i.id, i?.uniqueId, i);
                    }}
                  >
                    <img src="/assets/Eye.svg" alt="Eye Icon" />
                  </div>
                </div>
                {object && imei === i?.uniqueId ? (
                  <ObjectSelected imei={imei} device={i} position={position} />
                ) : null}
              </div>
            );
          })}
        </>
      )}
      {pathname === "/geofences" && (
        <>
          {filteredGeofences?.length > 0 &&
            filteredGeofences.map((i) => {
              const coordinates = parseWKTPolygon(i.area);
              return (
                <div key={i.id}>
                  <div
                    className="object-table object-table-row"
                    onClick={() => map.setView(coordinates[2], 8)}
                  >
                    <div className="table-checkbox">
                      <input
                        type="checkbox"
                        checked={
                          (object && i.id === selectedId) ||
                          (object && objectselect && i.id === selectedId)
                        }
                        onChange={() => {}}
                      />
                    </div>
                    <div className="fs-14 fw-400 object-table-element w-25">
                      {i.name}
                    </div>
                    <div className="object-table-element d-flex">
                      <Display GeoId={i.id} type="geofences" />
                      <img
                        role="button"
                        src="/assets/Edit.svg"
                        alt="edit"
                        onClick={() => {
                          handleEditForm("geofences", i.id);
                        }}
                      />
                      <Delete
                        GeoId={i.id}
                        handleDeleteClick={() => {
                          handleDeleteClick(i.id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </>
  );
}
