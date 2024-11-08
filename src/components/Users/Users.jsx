import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import SecondHeader from "../Header/SecondHeader";
import { popupcontext } from "../../context/Popupscontext";
import UsersHead from "./UsersParts/UsersHead";
import Table from "../Helpers/Table/Table";
import { useGetChildUsersQuery } from "../../Redux/service/Users/Users";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../Redux/service/Users/UsersSlice";
import Loader from "../Helpers/Loader/Loader";
import UsersForm from "./UsersForm/UsersForm";

export default function Users() {
  const { handleShow, setEdited } = useContext(popupcontext);
  const inf = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  let {
    data: AllUsers,
    isLoading,
    refetch,
  } = useGetChildUsersQuery(inf.id, { skip: !inf.id });
  useEffect(() => {
    if (AllUsers) dispatch(setUsers(AllUsers));
  });

  const handleSuccess = (newUser) => {
    if (newUser) {
      setEdited(true);
      refetch();
    }
  };

  const HeadField = [
    "Name",
    "ٌRole",
    "Type",
    "Phone Number",
    "Email",
    "Sub-Users",
    "Actions",
  ];

  return (
    <div className="users">
      <Helmet>
        <title>Users</title>
        <meta name="description" content="Users" />
      </Helmet>
      <SecondHeader
        title="Users"
        add="Add new user"
        onClick={() => handleShow("addForm")}
      />
      <UsersHead />
      {isLoading ? (
        <>
          <div className="loader-container loader-table">
            <Loader />
          </div>
        </>
      ) : (
        <Table HeadField={HeadField} BodyData={AllUsers} type="users" />
      )}
      <UsersForm onSuccess={handleSuccess} />
    </div>
  );
}
