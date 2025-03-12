import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, Outlet } from "react-router";
import { useState } from "react";

const StyledHeader = styled.header`
  background: red;
  margin: 0px;
  text-align: center;
  h1 {
    margin: 0px;
  }
`;

// const StyledCanvas = styled(Offcanvas)`
//   transition: transform 0.3s ease-in-out !important;

//   &.show {
//     transform: translateY(0%) !important;
//     visibility: visible !important; /* Ensure it's visible */
//   }

//   &:not(.show) {
//     transform: translateY(-100%) !important;
//     visibility: visible; /* Keep visible until animation finishes */
//     transition: transform 0.3s ease-in-out !important;
//   }

//   &.hiding {
//     visibility: hidden !important; /* Delay visibility hiding */
//   }
// `;

const Header = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <StyledHeader className="shadow-sm d-flex flex-row justify-content-center gap-5">
        <h1>Welcome traveler!</h1>
        <Button onClick={handleShow}>Primary</Button>
      </StyledHeader>

      <Offcanvas
        className="h-25 offcanvas-top"
        show={show}
        onHide={handleClose}
        placement="top"
        style={{
          backgroundImage: "url(images/bannerBG.webp)",
        }}
      >
        <Offcanvas.Header
          style={{
            padding: "10px 35px 0px 35px",
          }}
          closeButton
        >
          <Offcanvas.Title style={{ color: "white" }}>
            Menu (Quest in progress)
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="h-25">
          <div>
            <ul
              style={{ color: "white" }}
              className="d-flex flex-row gap-5 justify-content-center"
            >
              {/* Quit current quest and return to main menu, a state is needed to check wether or not the player is currently in a quest and if it's not finished yet to reset the progression of the current quest between to states, false/true */}
              <li onClick={handleClose}>
                <Link to="/">Home</Link>
              </li>
              {/* open modal displaying the player stats without leaving the current page/quest*/}
              <li onClick={handleClose}>Stats</li>
              {/* Sign out, the same as exit game, once again ask the user to confirm before closing the app and perform a POST request to the server in order to save user progression for later use*/}
              <li onClick={handleClose}>Sign out</li>
              {/* ask user to confirm logout and closing the app, perform a POST request to the server in order to save user progression for later use before logout*/}
              <li onClick={handleClose}>Exit game</li>
              {/* test page for the 404 error page */}
              <li onClick={handleClose}>
                <Link to="/404">404 test page</Link>
              </li>
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Outlet />
    </>
  );
};

export default Header;
