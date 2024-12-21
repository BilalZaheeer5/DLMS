"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./page.module.scss";
import { useFormik } from "formik";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import * as Yup from "yup";
import { LoginUser } from "@/libs/ServerActions";
import { setCookie } from "@/libs/cookie";
import { CgSpinner } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { ToastContext } from "@/context/ToastContext";
export default function Login() {
  const router = useRouter();
  const { setShowToast } = useContext(ToastContext);
  const validationSchemas = Yup.object({
    email: Yup.string()
      .email()
      .required("Please Enter Email")
      .matches(
        /^(?!\d)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|[a-zA-Z]{2,}))$/,
        "Enter Valid Email"
      ),
    password: Yup.string().max(12).min(8).required("Please Enter Password"),
  });
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: validationSchemas,
      onSubmit: (value, action) => {
        const btn = document.getElementById("btn");
        const spinner = document.getElementById("spinner");
        btn.style.opacity = "30%";
        btn.disabled = true;
        spinner.style.display = "block";

        LoginUser(value.email, value.password).then((res) => {
          if (res.status_code == 200) {
            btn.style.opacity = "100%";
            btn.disabled = false;
            spinner.style.display = "none";
            setCookie("_JKW32JD", JSON.stringify(res.data));
            setShowToast({
              isOpen: true,
              message: "Login SuccessFully!",
              type: "success",
            });
            router.push("/admin");
          } else {
            btn.style.opacity = "100%";
            btn.disabled = false;
            spinner.style.display = "none";
            setShowToast({ isOpen: true, message: res.message, type: "error" });
          }
        });
      },
    });
  const [passwordShow, setPasswordShow] = useState(false);
  return (
    <div className={style.container}>
      <div className={style.loginBox}>
        <h1>Login</h1>
        <div className={style.loginForm}>
          <form onSubmit={handleSubmit} method="POST">
            <label htmlFor="">Email</label>
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <p className={style.error}>
              {errors.email && touched.email ? errors.email : ""}
            </p>
            <label htmlFor="">Password</label>
            <div className={style.passwordInput}>
              <input
                type={passwordShow ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={handleChange}
              />

              {passwordShow ? (
                <FaRegEyeSlash
                  className={style.icon}
                  onClick={() => {
                    setPasswordShow(!passwordShow);
                  }}
                />
              ) : (
                <FaRegEye
                  className={style.icon}
                  onClick={() => {
                    setPasswordShow(!passwordShow);
                  }}
                />
              )}
            </div>
            <p className={style.error}>
              {errors.password && touched.password ? errors.password : ""}
            </p>
            <button type="submit" id="btn">
              <CgSpinner className={style.icon} id="spinner" />
              <p className={style.logintext}>Login</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
