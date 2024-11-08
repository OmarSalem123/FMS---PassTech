import React, { useContext } from "react";
import { Input } from "../../Helpers/Input/Input";
import { popupcontext } from "../../../context/Popupscontext";

export default function UserInfo({ addData }) {
  let {isEditing} = useContext(popupcontext)
  return (
    <div className="userinfo mb-24">
      <p className="fs-16 fw-700 brand-700 text-uppercase">user info</p>
      <div className="flex-between">
        <Input
          title="Name"
          type="text"
          placeholder="Ex. Ahmed Ali"
          formstyle="user-form"
          id="name"
          name="name"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          errors={addData.errors.name}
          touched={addData.touched.name}
          value={addData.values.name || ""}
        />
        <Input
          title="Email"
          type="email"
          placeholder="Ex@gmail.com"
          formstyle="user-form"
          id="email"
          name="email"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          errors={addData.errors.email}
          touched={addData.touched.email}
          value={addData.values.email || ""}
        />
      </div>

      <div className="flex-between">
        <Input
          title="Password"
          type="password"
          placeholder="*********"
          formstyle="user-form"
          id="password"
          name="password"
          onBlur={addData.handleBlur}
          onChange={addData.handleChange}
          errors={addData.errors.password}
          touched={addData.touched.password}
          value={addData.values.password || ""}
        />
      </div>
    </div>
  );
}
