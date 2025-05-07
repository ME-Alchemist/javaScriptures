import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import UserDetails from "../zustore/userStore";
import titleStore from "../zustore/titleStore";

const StyledHeader = styled.header`
  background: red;
  margin: 0px;
  text-align: center;
  h1 {
    margin: 0px;
  }
`;

const StyledCanvas = styled(Offcanvas)`
  height: 6.6em !important;

  background-image: url(/images/bannerBG.webp) !important;
  background-position: center !important;

  .offcanvas-body {
    padding: unset !important;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { title } = titleStore();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const interval = setInterval(() => getStats(), 10000);
  // const stopInterval = () => clearInterval(interval);

  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        UserDetails.getState().reset();
        navigate("/login", { replace: true });
      } else {
        console.log("error logging out", response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const getStats = useCallback(() => {
  //   // console.log("getStats");
  //   axios
  //     .get("http://localhost:3000/stats", { withCredentials: true })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log("invalid token", err);
  //       clearInterval();
  //       navigate("/login", { replace: true });
  //     });
  // }, [navigate]);

  // useEffect(() => {
  //   setInterval(() => getStats(), 10000);
  // }, [getStats]);

  return (
    <>
      <StyledHeader className="shadow-sm d-flex flex-row justify-content-center gap-5">
        <h1>{title}</h1>
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
            padding: "0px 35px 0px 35px",
          }}
          closeButton
        >
          <Offcanvas.Title style={{ color: "white" }}>
            <p>Menu</p>
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
                <Link to="/main/quests">Home</Link>
              </li>
              {/* open modal displaying the player stats without leaving the current page/quest*/}
              <li onClick={handleClose}>
                <Link to={"/main/stats"}>Stats</Link>
              </li>
              {/* Sign out, ask the user to confirm before closing the app and perform a POST request to the server in order to save user progression for later use before logout*/}
              <li onClick={logout}>logout</li>
              {/* test page for the 404 error page */}
              <li onClick={handleClose}>
                <Link to="/main/BegunQuest">404 test page</Link>
              </li>
            </ul>
          </div>
        </Offcanvas.Body>
      </StyledCanvas>
    </>
  );
};

export default Header;
