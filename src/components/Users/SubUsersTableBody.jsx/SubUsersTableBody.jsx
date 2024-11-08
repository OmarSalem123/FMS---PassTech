/* eslint-disable react/style-prop-object */
import React, { useEffect } from "react";
import TableRow from "../../Helpers/Table/TableRow";
import TableActions from "../../Helpers/Table/TableActions";
import { useGetChildUsersQuery } from "../../../Redux/service/Users/Users";

export default function SubUsersTableBody({ id }) {
  let { data: AllUsers, refetch } = useGetChildUsersQuery(id, {
    skip: !id,
  });
  useEffect(() => {
    if (AllUsers) {
      refetch();
    }
  }, [AllUsers, refetch]);

  return (
    <>
      {AllUsers?.map((i) => {
        const role = (admin, ulimit) => {
          if (admin === false && (ulimit > 0 || ulimit === -1)) {
            return "Manager";
          } else if (admin === false && ulimit === 0) {
            return "Regular User";
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
          <div key={i.id} className="d-flex p-16 ">
            <TableRow value={i.name} style="table-element-code ps-0" />
            <TableRow value={role(i.administrator, i.userLimit)} />
            <TableRow value={type()} />
            <TableActions subuserId={i.id} type="subuser" />
          </div>
        );
      })}
    </>
  );
}
