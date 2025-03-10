import React from "react";
import styled from "styled-components";
import { Button, Offcanvas } from "react-bootstrap";
import { useState } from "react";

const StyledHeader = styled.header`
  background: red;
  margin: 0px;
  text-align: center;
  h1 {
    margin: 0px;
  }
`;
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

      {show && (
        <Offcanvas show={show} onHide={handleClose} placement="top">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>
      )}
    </>
  );
};

export default Header;
