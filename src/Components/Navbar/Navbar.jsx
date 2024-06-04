import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { useContext, useEffect } from "react";
import { userContext } from "./../../Context/User.context";
import { cartContext } from "../../Context/Cart.context";
export default function Navbar() {
  const { token, logOut } = useContext(userContext);
  const { getCartInfo, cartInfo } = useContext(cartContext);

  useEffect(() => {
    getCartInfo();
  }, []);
  return (
    <>
      <nav className="bg-slate-100 p-3 fixed left-0 right-0 top-0 z-50">
        <div className="container  flex gap-8">
          <h1>
            <a href="/">
              <img src={logo} alt="" />
            </a>
          </h1>

          {token ? (
            <ul className="flex gap-6 items-center">
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] hover:before:w-full hover:font-bold  before:transition-[width] before:duration-300 before:bg-primary before:absolute before:left-0 before:-bottom-1 ${
                      isActive ? "font-bold before:w-full" : "before:w-0"
                    }`;
                  }}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary before:absolute before:left-0 before:-bottom-1 ${
                      isActive ? "font-bold before:w-full" : "before:w-0"
                    }`;
                  }}
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary before:absolute before:left-0 before:-bottom-1 ${
                      isActive ? "font-bold before:w-full" : "before:w-0"
                    }`;
                  }}
                  to="/categories"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary before:absolute before:left-0 before:-bottom-1 ${
                      isActive ? "font-bold before:w-full" : "before:w-0"
                    }`;
                  }}
                  to="/brands"
                >
                  Brands
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary before:absolute before:left-0 before:-bottom-1 ${
                      isActive ? "font-bold before:w-full" : "before:w-0"
                    }`;
                  }}
                  to="/allorders"
                >
                  Orders
                </NavLink>
              </li>
            </ul>
          ) : (
            ""
          )}

          <Link to="/cart" className="ms-auto relative">
            <i className="fa-solid fa-cart-shopping text-lg"></i>
            <span className="bg-primary w-5 h-5 flex justify-center items-center rounded-full text-sm font-bold text-white absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
              {cartInfo === null ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                cartInfo.numOfCartItems || 0
              )}
            </span>
          </Link>

          <ul className="flex gap-6 items-center">
            <li>
              <a href="https://www.facebook.com">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
          </ul>

          <ul className="flex gap-6 items-center">
            {!token ? (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary before:absolute before:left-0 before:-bottom-1 ${
                        isActive ? "font-bold before:w-full" : "before:w-0"
                      }`;
                    }}
                    to="/auth/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary before:absolute before:left-0 before:-bottom-1 ${
                        isActive ? "font-bold before:w-full" : "before:w-0"
                      }`;
                    }}
                    to="/auth/signup"
                  >
                    Sign up
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="cursor-pointer">
                <span onClick={logOut}>
                  <i className="fa-solid fa-right-from-bracket text-2xl"></i>
                </span>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
