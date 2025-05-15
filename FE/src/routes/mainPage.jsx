import React from "react";
import { Outlet } from "react-router";
import Header from "../components/header";
import Footer from "../components/footer";
import styled from "styled-components";

const StyledDiv = styled.div`
  background-image: url(/images/backdrops/poseBG2.webp);
  background-color: grey;
  background-size: cover;
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
