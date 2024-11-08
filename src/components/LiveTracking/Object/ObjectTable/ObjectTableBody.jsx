import React, { useContext, useEffect, useState } from "react";
import ObjectTableRows from "./ObjectTableRows";
import {
  useGetAllUsersQuery,
  useGetSpecificUserQuery,
} from "../../../../Redux/service/Users/Users";
import { filtrationcontext } from "../../../../context/Filtercontext";
import Loader from "../../../Helpers/Loader/Loader";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function ObjectTableBody() {
  const [openDropdowns, setOpenDropdowns] = useState([]);
  const [shownData, setShownData] = useState([]);
  const [userDevices, setUserDevices] = useState([]);
  const { filter, ObjectsearchQuery, parentCheck, childCheck } =
    useContext(filtrationcontext);
  let { pathname } = useLocation();

  const inf = useSelector((state) => state.users.user);
  const { data: UserInf, isLoading: userLoading } = useGetSpecificUserQuery(
    inf?.id
  );

  const toggleDropdown = (userId) => {
    setOpenDropdowns((prevOpenDropdowns) =>
      prevOpenDropdowns.includes(userId)
        ? prevOpenDropdowns.filter((id) => id !== userId)
        : [...prevOpenDropdowns, userId]
    );
  };

  const { data: allUsers, isLoading: allUsersLoading } = useGetAllUsersQuery();

  useEffect(() => {
    if (!allUsers) return;
    let filteredData = [];
    if (!filter) {
      if (UserInf) {
        filteredData = [UserInf];
      }
    } else {
      filteredData = allUsers?.filter((user) => {
        const matchesFilter =
          childCheck.includes(user.id) || parentCheck.includes(user.id);

        return matchesFilter;
      });
    }

    setShownData(filteredData);
  }, [UserInf, childCheck, allUsers, filter, parentCheck, ObjectsearchQuery]);
  if (userLoading || allUsersLoading) return <Loader />;

  return (
    <>
      {pathname === "/livetracking" &&
        shownData?.map((user) => (
          <div key={user.id}>
            <div
              className="object-body-title"
              role="button"
              onClick={() => toggleDropdown(user.id)}
            >
              <div className="d-flex">
                <div className="table-checkbox by-15">
                  <input type="checkbox" onChange={() => {}} name="" id="" />
                </div>
                <div
                  className="fs-14 fw-400 neutral-500 object-table-element"
                  role="button"
                >
                  <div className={user ? "fw - 900" : ""}>{user.name}</div>
                </div>
              </div>
              <div className={user ? "d-none" : ""}>
                <img
                  src={
                    openDropdowns.includes(user.id)
                      ? "/assets/Uparrow.svg"
                      : "/assets/Downarrow.svg"
                  }
                  alt="arrow"
                />
              </div>
            </div>
            {openDropdowns.includes(user.id) || user ? (
              <ObjectTableRows
                userid={user.id}
                userDevices={userDevices}
                setUserDevices={setUserDevices}
              />
            ) : null}
          </div>
        ))}

      {pathname === "/geofences" && (
        <div>
          <ObjectTableRows userid={inf.id} />
        </div>
      )}
    </>
  );
}
