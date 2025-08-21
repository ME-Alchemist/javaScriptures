import React from "react";
import { Outlet } from "react-router";
import Header from "../components/header";
import Footer from "../components/footer";
import styled from "styled-components";

const StyledDiv = styled.div`
  background-image: url(/images/backdrops/poseBG3.webp);
  background-color: grey;
  background-size: cover;
  height: 100vh;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 380px) and (max-height: 680px) {
    /* height: unset; */
    /* padding: 5px; */
    justify-content: unset !important;
    overflow-y: scroll;
  }

  @media screen and (max-width: 1100px) and (max-height: 610px) {
    /* height: unset; */
    /* padding: 5px; */
    justify-content: unset !important;
    overflow-y: scroll;
  }
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
