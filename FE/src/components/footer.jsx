import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, Outlet } from "react-router";
// import { useState, useCallback } from "react";
// import axios from "axios";

const StyledFooter = styled.footer`
  background: #ff8f0075;
  margin: 0px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: auto;
  /* h1 {
    margin: 0px;
  } */
`;

// const StyledCanvas = styled(Offcanvas)`
//   height: 6.6em !important;

//   background-image: url(images/bannerBG.webp) !important;
//   background-position: center !important;

//   .offcanvas-body {
//     padding: unset !important;
//   }
// `;

const Header = () => {
  //   const navigate = useNavigate();

  //   const [show, setShow] = useState(false);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  // const interval = setInterval(() => getStats(), 10000);
  // const stopInterval = () => clearInterval(interval);

  //   const getStats = useCallback(() => {
  //     // console.log("getStats");
  //     axios
  //       .get("http://localhost:3000/stats", { withCredentials: true })
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log("invalid token", err);
  //         clearInterval();
  //         navigate("/login", { replace: true });
  //       });
  //   }, [navigate]);

  // useEffect(() => {
  //   setInterval(() => getStats(), 10000);
  // }, [getStats]);

  return (
    <>
      <StyledFooter className="flex-column flex-sm-row">
        <p>&copy; 2025 JavaScriptures</p>
        <p>
          &copy; 2025, D&D monsters, names, and class designs used under fair
          use provisions.
        </p>
      </StyledFooter>
    </>
  );
};

export default Header;
