import React from "react";
import { Outlet } from "react-router";
import Header from "../components/header";
import Footer from "../components/footer";

function MainPage() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainPage;
