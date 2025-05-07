import React from "react";
import { Outlet } from "react-router";
import Header from "../components/header";
import Footer from "../components/footer";
import styled from "styled-components";

const StyledDiv = styled.div`
  background-image: url(/images/background2.png);
  background-size: repeat;
  height: 100vh;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function MainPage() {
  return (
    <>
      <Header />
      <StyledDiv loading="lazy">
        <Outlet />
      </StyledDiv>
      <Footer />
    </>
  );
}

export default MainPage;
