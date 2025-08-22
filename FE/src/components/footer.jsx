import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, Outlet } from "react-router";
import Timer from "./timer";

const StyledFooter = styled.footer`
  background: #ff8f0075;
  margin: 0px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: auto;
`;

const Footer = () => {
  return (
    <>
      <StyledFooter className="flex-column flex-sm-row">
        <Timer />
        <p>&copy; 2025 JavaScriptures</p>
        <p>
          &copy; 2025, D&D monsters, names, and class designs used under fair
          use provisions.
        </p>
      </StyledFooter>
    </>
  );
};

export default Footer;
