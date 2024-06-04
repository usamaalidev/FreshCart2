import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";

export default function Layout() {
  return (
    <>
      <Navbar />

      <Online>
        <div className="container pb-[240px] pt-[80px]">
          <Outlet />
        </div>
      </Online>
      <div className="container pb-[240px] pt-[80px]">
        <h2>Offline</h2>
      </div>

      <Offline></Offline>
      <Footer />
    </>
  );
}
