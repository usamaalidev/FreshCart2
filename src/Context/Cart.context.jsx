import { createContext, useContext, useState } from "react";
import { userContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const cartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartInfo, setCartInfo] = useState(null);
  const { token } = useContext(userContext);

  async function getCartInfo() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);
      console.log(data);
      setCartInfo(data);
    } catch (error) {
      if (error.response.data.message.includes("No cart")) {
        setCartInfo([]);
      }
    }
  }

  async function addProductToCart({ id }) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId: id,
        },
      };

      let { data } = await axios.request(options);
      toast.success("product added to cart"); // *[data:{}]
      setCartInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProductFromCart({ id }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);

      if (data.numOfCartItems === 0) {
        setCartInfo([]);
      } else {
        setCartInfo(data);
      }
      toast.success("product removed successfully");
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProductCount({ id, count }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        },
      };

      let { data } = await axios.request(options);
      setCartInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function clearCart() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);

      if (data.message === "success") {
        setCartInfo([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        getCartInfo,
        cartInfo,
        removeProductFromCart,
        updateProductCount,
        clearCart,
        setCartInfo,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
