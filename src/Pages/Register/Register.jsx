import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "name must be at least 3 characters")
      .max(15, "name must be at most 15 characters"),
    email: Yup.string()
      .required("email is required")
      .email("email is not valid"),
    phone: Yup.string()
      .required("phone is required")
      .matches(phoneRegex, "phone number is not valid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][0-9a-zA-Z]{5,25}$/,
        "password should start with uppercase letter followed by a combinations of letters and number from 5 to 25 "
      ),
    rePassword: Yup.string()
      .required("re-password is required")
      .oneOf(
        [Yup.ref("password")],
        "password and re-password should be the same"
      ),
  });

  async function sendDataToRegister(values) {
    let id;
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };

      id = toast.loading("Waiting...");

      const { data } = await axios.request(options);
      console.log(data);

      toast.dismiss(id);
      toast.success("User Created Successfully");

      setTimeout(() => {
        if (data.message === "success") {
          navigate("/auth/login");
        }
      }, 3000);
    } catch (error) {
      toast.dismiss(id);
      toast.error(error.response.data.message);
      console.log(error);
      setErrorMsg(error.response.data.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    validationSchema,

    onSubmit: sendDataToRegister,
  });

  return (
    <>
      <section>
        <h2 className="text-2xl text-primary font-bold mb-6">
          <i className="fa-regular fa-circle-user me-3"></i>
          <span>Register Now</span>
        </h2>

        <form className="space-y-3" onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="text"
              className="form-control w-full"
              placeholder="username"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.name && formik.touched.name ? (
              <div className="text-red-600 font-semibold mt-2">
                * {formik.errors.name}
              </div>
            ) : (
              ""
            )}
          </div>

          <div>
            <input
              type="email"
              className="form-control w-full"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="text-red-600 font-semibold mt-2">
                * {formik.errors.email}
              </div>
            ) : (
              ""
            )}
            {errorMsg ? (
              <div className="text-red-600 font-semibold mt-2">
                * {errorMsg}
              </div>
            ) : (
              ""
            )}
          </div>

          <div>
            <input
              type="tel"
              className="form-control w-full"
              placeholder="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="text-red-600 font-semibold mt-2">
                * {formik.errors.phone}
              </div>
            ) : (
              ""
            )}
          </div>

          <div>
            <input
              type="password"
              className="form-control w-full"
              placeholder="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="text-red-600 font-semibold mt-2">
                * {formik.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>

          <div>
            <input
              type="password"
              className="form-control w-full"
              placeholder="Re-password"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="text-red-600 font-semibold mt-2">
                * {formik.errors.rePassword}
              </div>
            ) : (
              ""
            )}
          </div>

          <button type="submit" className="btn-primary">
            Sign Up
          </button>
        </form>
      </section>
    </>
  );
}
