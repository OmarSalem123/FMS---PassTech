import React, { useContext } from "react";
import Close from "../../../../Helpers/CloseBtn/Close";
import { popupcontext } from "../../../../../context/Popupscontext";
import { useGetAllUsersQuery } from "../../../../../Redux/service/Users/Users";

export default function ObjectUsersHead() {
  let { handleClose } = useContext(popupcontext);
  const { data: AllUsers } = useGetAllUsersQuery();
  const Branches = AllUsers?.filter(
    (user) => user.administrator === false && user.userLimit > 0
  );
  return (
    <>
      <div className="flex-between sticky p-16">
        <div className="d-flex">
          <div className="fs-16 fw-600 me-2">Available Users</div>
          <div className="users-availability">
            <div className="users-count">{Branches.length}</div>
          </div>
        </div>
        <div className="close">
          <Close
            img="close"
            close={() => {
              handleClose("objectUsers");
            }}
          />
        </div>
      </div>
      <div className="H-line"></div>
    </>
  );
}
