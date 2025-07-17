import React from "react";
import styled from "styled-components";
// import useSound from "use-sound";
import { useSoundContext } from "../components/soundContext";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import UserDetails from "../zustore/userStore";
import titleStore from "../zustore/titleStore";

const StyledHeader = styled.header`
  background: #ff8f0075;
  margin: 0px;
  text-align: center;
  h1 {
    margin: 0px;
  }

  & button {
    width: 150px !important;
  }
`;

const StyledCanvas = styled(Offcanvas)`
  height: 100% !important;
  /* font-weight: bold; */
  font-size: larger;
  font-weight: bolder;
  width: 250px !important;

  & p {
    margin-bottom: 0px;
  }

  & a {
    text-decoration: none;
    font-weight: bolder;
    font-size: larger;
    color: inherit;
    transition: all 0.2s ease-in-out;
  }

  & a:hover {
    color: #144095;
    text-shadow: 2px 2px 2px #eee;
  }

  background-color: #997043 !important;
  background-image: url("/images/backdrops/bannerBG2.webp") !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;

  .offcanvas-body {
    padding: unset !important;
    list-style-type: none;
  }

  .logout {
    font-size: larger;
    transition: all 0.2s ease-in-out;
  }

  .logout:hover {
    color: #144095;
    text-shadow: 2px 2px 2px #eee;
    cursor: pointer;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const { title } = titleStore();

  const [show, setShow] = useState(false);
  const { mute, playing, toggleMute, toggleBGM, pauseBGM } = useSoundContext();
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
        pauseBGM();
        UserDetails.getState().reset();
        navigate("/login", { replace: true });
      } else {
        console.log("error logging out", response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <StyledHeader className="shadow-sm d-flex flex-column justify-content-center">
        <h1 className="flex-grow-1">{title}</h1>
        <div className="d-flex flex-row justify-content-center align-items-center gap-5">
        <button
          className="btn bi bi-caret-right-fill fs-5 fw-bold"
          onClick={handleShow}
        >
          Menu
        </button>
        <button onClick={toggleBGM} className="btn bi bi-music-note-beamed fw-bold" style={{ fontSize: "1.5rem" }}>
          {playing ? "BGM: On" : "BGM: Off"}
        </button>
        <button onClick={toggleMute} className="btn bi bi-volume-off-fill fw-bold" style={{ fontSize: "1.5rem" }}>
          {mute ? "SFX: Off" : "SFX: On"}
        </button>

        </div>
      </StyledHeader>

      <StyledCanvas
        className="h-75 offcanvas-start"
        show={show}
        onHide={handleClose}
        placement="start"
        data-bs-theme="dark"
      >
        <Offcanvas.Header
          style={{
            padding: "0px 35px 0px 35px",
            color: "white",
          }}
          closeButton
        >
          <Offcanvas.Title style={{ color: "white" }}>
            <p>Menu</p>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-row justify-content-center">
          <div>
            {/* the header is only meant to be shown when the user is logged in, first page is the login page or welcome page if the user is not logged in*/}
            <ul
              style={{ color: "white", listStyleType: "none" }}
              className="mt-3 d-flex flex-column gap-3 justify-content-center"
            >
              {" "}
              {/* Quit current quest and return to main menu,*/}
              <li onClick={handleClose}>
                <Link to="/main/home">Home</Link>
              </li>
              {/* Quit current quest and return to main menu,*/}
              <li onClick={handleClose}>
                <Link to="/main/preparations">Preparations</Link>
              </li>
              {/* Quit current quest and return to main menu,*/}
              <li onClick={handleClose}>
                <Link to="/main/quests">Quests</Link>
              </li>
              {/*has a page to display the stats of the player*/}
              <li onClick={handleClose}>
                <Link to={"/main/stats"}>Stats</Link>
              </li>
              {/* has a page to display the credits for links, bgm and sound effects*/}
              <li onClick={handleClose}>
                <Link to={"/main/credits"}>Credits</Link>
              </li>
              {/* Sign out, ask the user to confirm before closing the app, POST requests  for user progressinon are now made during result screens so no need to perform additonal requests before logout*/}
              <li className="logout" onClick={logout}>
                logout
              </li>
            </ul>
          </div>
        </Offcanvas.Body>
      </StyledCanvas>
    </>
  );
};

export default Header;
