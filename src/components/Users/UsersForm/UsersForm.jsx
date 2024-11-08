import React, { useContext, useEffect } from "react";
import Form from "../../Helpers/Form/Form";
import { popupcontext } from "../../../context/Popupscontext";
import { Offcanvas } from "react-bootstrap";
import FormHeader from "../../Helpers/Form/FormParts/FormHeader";
import UserBody from "./UserBody";
import { useGetSpecificUserQuery } from "../../../Redux/service/Users/Users";

export default function UsersForm({ onSuccess }) {
  const { form, isEditing, currentUserId } = useContext(popupcontext);
  const { refetch, data: userDetails } = useGetSpecificUserQuery(
    currentUserId,
    { skip: !currentUserId }
  );
  useEffect(() => {
    if (isEditing && currentUserId) {
      refetch();
      console.log("userDetails");
    }
  }, [currentUserId, isEditing, userDetails, refetch]);

  return (
    <>
      <Form show={form}>
        <Offcanvas.Header>
          <FormHeader title={isEditing ? "Edit User" : "Add new User"} />
        </Offcanvas.Header>
        <div className="H-line"></div>
        <Offcanvas.Body>
          <UserBody onSuccess={onSuccess} Editvalues={userDetails} />
        </Offcanvas.Body>
      </Form>
    </>
  );
}
