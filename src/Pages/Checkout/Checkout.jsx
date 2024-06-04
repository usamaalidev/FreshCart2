import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { cartContext } from "../../Context/Cart.context";
import { userContext } from "../../Context/User.context";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartInfo, setCartInfo } = useContext(cartContext);
  const { token } = useContext(userContext);
  const [orderType, setOrderType] = useState(null);
  const navigate = useNavigate();

  async function createCashOrder(values) {
    console.log("######### CASH");
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.data._id}`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        values,
      },
    };

    let { data } = await axios.request(options);
    console.log(data);
    setCartInfo([]);
    setTimeout(() => {
      navigate("/allorders");
    }, 2000);
  }

  async function createOnlineOrder(values) {
    console.log("######### Online");

    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.data._id}?url=http://localhost:5174`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        values,
      },
    };

    let { data } = await axios.request(options);
    console.log(data);

    toast.loading("redirect to payment gateway");

    setTimeout(() => {
      if (data.status === "success") {
        window.location.href = data.session.url;
      }
    }, 3000);
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },

    onSubmit: (values) => {
      if (orderType === "cash") createCashOrder(values);
      else createOnlineOrder(values);
    },
  });

  return (
    <>
      <h2 className="text-2xl font-bold mb-5">Shipping Address</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          className="form-control w-full mb-3"
          placeholder="City"
          name="shippingAddress.city"
          value={formik.values.shippingAddress.city}
          onChange={formik.handleChange}
        />
        <input
          type="tel"
          className="form-control w-full mb-3"
          placeholder="Phone"
          value={formik.values.shippingAddress.phone}
          onChange={formik.handleChange}
          name="shippingAddress.phone"
        />
        <textarea
          className="form-control w-full mb-3"
          placeholder="details"
          value={formik.values.shippingAddress.details}
          onChange={formik.handleChange}
          name="shippingAddress.details"
        ></textarea>

        <button
          onClick={() => {
            setOrderType("cash");
          }}
          type="submit"
          className="btn-primary bg-blue-500 mr-4"
        >
          Cash Order
        </button>

        <button
          onClick={() => {
            setOrderType("online");
          }}
          type="submit"
          className="btn-primary"
        >
          Online Order
        </button>
      </form>
    </>
  );
}
