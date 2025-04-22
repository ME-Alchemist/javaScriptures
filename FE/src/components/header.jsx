import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, Outlet, useNavigate } from "react-router";
import { useState, useCallback } from "react";
import axios from "axios";

const StyledHeader = styled.header`
  background: red;
  margin: 0px;
  text-align: center;
  h1 {
    margin: 0px;
  }
`;

const StyledCanvas = styled(Offcanvas)`
  height: 7.6em !important;

  background-image: url(images/bannerBG.webp) !important;
  background-position: center !important;

  /*
  transition: transform 0.3s ease-in-out !important;

  &.show {
    transform: translateY(0%) !important;
    visibility: visible !important;
  }

  &:not(.show) {
    transform: translateY(-100%) !important;
    visibility: visible;
    transition: transform 0.3s ease-in-out !important;
  }

  &.hiding {
    visibility: hidden !important;
  }
    */
`;

const Header = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const interval = setInterval(() => getStats(), 10000);
  // const stopInterval = () => clearInterval(interval);

  const getStats = useCallback(() => {
    // console.log("getStats");
    axios
      .get("http://localhost:3000/stats", { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("invalid token", err);
        clearInterval();
        navigate("/sign-in", { replace: true });
      });
  }, [navigate]);

  // useEffect(() => {
  //   setInterval(() => getStats(), 10000);
  // }, [getStats]);

  return (
    <>
      <StyledHeader className="shadow-sm d-flex flex-row justify-content-center gap-5">
        <h1>Welcome traveler!</h1>
        <Button onClick={handleShow}>Primary</Button>
      </StyledHeader>

      <StyledCanvas
        className="h-25 offcanvas-top"
        show={show}
        onHide={handleClose}
        placement="top"
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
            {/* the header is only meant to be shown when the user is logged in, first page is the login page or welcome page if the user is not logged in*/}
            <ul
              style={{ color: "white" }}
              className="d-flex flex-row gap-5 justify-content-center"
            >
              {/* Quit current quest and return to main menu, a state is needed to check wether or not the player is currently in a quest and if it's not finished yet warn the player progress will be lost, upon confiming, the progression of the current quest is reset and the player is returned to the main menu, a boolean state may be needed false/true to check wether or not the player currently is in a quest */}
              <li onClick={handleClose}>
                <Link to="/">Home</Link>
              </li>
              {/* open modal displaying the player stats without leaving the current page/quest*/}
              <li
                onClick={(e) => {
                  e.preventDefault();
                  getStats();
                }}
              >
                Stats
              </li>
              {/* Sign out, ask the user to confirm before closing the app and perform a POST request to the server in order to save user progression for later use before logout*/}
              <li onClick={handleClose}>Sign out</li>
              {/* test page for the 404 error page */}
              <li onClick={handleClose}>
                <Link to="/404">404 test page</Link>
              </li>
            </ul>
          </div>
        </Offcanvas.Body>
      </StyledCanvas>
      <Outlet />
    </>
  );
};

export default Header;
