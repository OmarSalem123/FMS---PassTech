/* eslint-disable react/style-prop-object */
import React, { useContext, useEffect, useState } from "react";
import TableRow from "../../Helpers/Table/TableRow";
import TableActions from "../../Helpers/Table/TableActions";
import { useLazyGetChildUsersQuery } from "../../../Redux/service/Users/Users";
import { filtrationcontext } from "../../../context/Filtercontext";
import { popupcontext } from "../../../context/Popupscontext";

export default function UsersTableBody({ data }) {
  let { UserssearchQuery } = useContext(filtrationcontext);
  let { refetchTrigger } = useContext(popupcontext);
  let [getChildUser] = useLazyGetChildUsersQuery();
  const [subUsersData, setSubUsersData] = useState([]);

  useEffect(() => {
    if (data?.length) {
      data.forEach((user) => {
        getChildUser(user.id)
          .then((result) => {
            if (result && Array.isArray(result.data)) {
              setSubUsersData((prev) => ({
                ...prev,
                [user.id]: result.data,
              }));
            } else {
              setSubUsersData((prev) => ({
                ...prev,
                [user.id]: 0,
              }));
            }
          })
          .catch((error) => {
            console.error(
              `Error fetching sub-users for user ${user.id}:`,
              error
            );
            setSubUsersData((prev) => ({
              ...prev,
              [user.id]: 0,
            }));
          });
      });
    }
  }, [data, getChildUser , refetchTrigger]);

  let FilteredData = data?.filter(
    (i) =>
      i.administrator === true ||
      (i.administrator === false && (i.userLimit > 0 || i.userLimit >= -1))
  );

  let SearchFilteredData = FilteredData;
  if (UserssearchQuery) {
    SearchFilteredData = FilteredData.filter((user) =>
      user.name.toLowerCase().includes(UserssearchQuery.toLowerCase())
    );
  }

  return (
    <>
      {SearchFilteredData?.length > 0 ? (
        SearchFilteredData.map((i) => {
          const role = (admin, ulimit) => {
            if (admin === false && (ulimit > 0 || ulimit === -1)) {
              return "Manager";
            } else if (admin === false && ulimit === 0) {
              return "Regular User";
            } else {
              return "Admin";
            }
          };
          const type = () => {
            if (i.deviceReadonly === true) {
              return "Device Readonly";
            } else if (i.readonly === true) {
              return "Readonly";
            } else if (i.userLimit === 0 && i.deviceLimit === 0) {
              return "Readonly";
            } else {
              return "- - - - -";
            }
          };
          return (
            <div key={i.id} className="table-row">
              <TableRow value={i.name} style="table-element-code ps-0" />
              <TableRow value={role(i.administrator, i.userLimit)} />
              <TableRow value={type()} />
              <TableRow
                value={i.phone ? i.phone : "- - - - -"}
                style="table-element-code"
              />
              <TableRow value={i.email} />
              <TableRow
                value={
                  subUsersData[i.id] !== undefined
                    ? subUsersData[i.id]?.length
                    : "-"
                }
                view={{
                  status:
                    (subUsersData[i.id]?.length === 0) === true ||
                    i.administrator === true
                      ? false
                      : true,
                  type: "users",
                  id: i.id,
                  data: subUsersData[i.id],
                }}
              />
              <TableActions userId={i.id} />
            </div>
          );
        })
      ) : (
        <div className="Soon">No users found</div>
      )}
    </>
  );
}
