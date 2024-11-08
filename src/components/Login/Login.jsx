/* eslint-disable react/style-prop-object */
import React, { useState } from "react";
import { Input } from "../Helpers/Input/Input";
import Button from "../Helpers/Button/Button";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { webSocketManager } from "../../Sockets/WebSocketManager";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserInf } from "../../Redux/service/Users/UsersSlice";
import { Helmet } from "react-helmet";

export default function Login() {
  let navigate = useNavigate();
  const [submitAttempt, setSubmitAttempt] = useState(false); // New state for submit attempt
  let dispatch = useDispatch();
  let inf = useSelector((state) => state.users.user);

  const Login = async (values) => {
    let auth = qs.stringify(values);
    try {
      let response = await axios.post(
        "https://test.passenger-mea.com/api/session",
        auth,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );

      if (response) {
        dispatch(setUserInf(response.data));
        let token = await axios.post(
          "https://test.passenger-mea.com/api/session/token",
          auth,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `${values.email}:${values.password}`
              )}`,
            },
            withCredentials: true,
          }
        );
        if (token) {
          sessionStorage.setItem("token", String(token.data));
        }
        await axios.get("https://test.passenger-mea.com/api/session", {
          withCredentials: true,
        });
        webSocketManager.connect();
      }
      navigate("/dashboard");
    } catch (error) {
      if (error.response.status === 401)
        toast.error("Invalid Email or Password");
      else if (error.response.status === 500) {
        toast.info("Internal Server Error");
      }
      console.log(error);
      console.log("Invalid Email or Password");
    }
  };
  let validSchema = Yup.object({
    email: Yup.string().required("Email is required").email("invalid email"),
    password: Yup.string().required("Password is required"),
  });
  let register = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validSchema,
    onSubmit: (values) => {
      Login(values);
    },
  });
  const handleSubmit = (e) => {
    setSubmitAttempt(true);
    register.handleSubmit(e);
  };
  console.log("User Inf", inf);
  return (
    <> <Helmet>
    <title>Login</title>
    <meta name="description" content="Login" />
  </Helmet>
      <div className="AuthLayout">
        <div className="AuthBack">
          <div className="text-center">
            <img src="/assets/LoginLogo.svg" alt="" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="Auth-Form">
              <Input
                title="Email"
                type="email"
                placeholder="Enter Your Email"
                onBlur={register.handleBlur}
                onChange={register.handleChange}
                errors={register.errors.email}
                touched={register.touched.email}
                formstyle="login-input"
                id="email"
                name="email"
              />
              <Input
                title="Password"
                type="password"
                placeholder="Enter Your Password"
                onBlur={register.handleBlur}
                onChange={register.handleChange}
                errors={register.errors.password}
                touched={register.touched.password}
                formstyle="login-input"
                id="password"
                name="password"
              />
              <div className="text-center login-button-wrap">
                <Button
                  style="button btn-success p-4-10 login-button"
                  text="Login"
                  type="submit"
                  textstyle="mx-auto"
                />
                {submitAttempt && !register.isValid ? (
                  <div className="validation login-input">
                    Please Check Required Inputs
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}