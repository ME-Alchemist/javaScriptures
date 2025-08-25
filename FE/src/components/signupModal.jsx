import styled from "styled-components";
import { useEffect, useState } from "react";

const StyledModal = styled.div`
  .modal-header {
    background-color: orange !important;
  }

  .modal-body {
    background-color: #98570375 !important;
  }

  .modal-footer {
    background-color: orange !important;
  }
`;
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function SignUpModal() {
  let modalShown = sessionStorage.setItem("showSignUpModal", "false");

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("showSignUpModal", "true");
  };

  useEffect(() => {
    setShow(true);
    // sessionStorage.setItem("showSignUpModal", "false");
  }, []);

  return (
    <>
      {modalShown === "false" && (
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header style={{ backgroundColor: "orange" }} closeButton>
            <Modal.Title
              className="mx-auto fw-bold text-decoration-underline"
              style={{
                textShadow: "2px 2px 5px black",
                color: "white",
              }}
            >
              {" "}
              Real mail not required! Make one up!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              backgroundColor: "#b6721a",
              color: "white",
              textShadow: "2px 2px 5px black",
            }}
            className="fs-5"
          >
            {" "}
            There is no need for real mail adresses here, no verification mail
            is sent so please feel free to make one up, this form is mainly used
            for constraints and checking purposes, if a mail is valid or perhaps
            already in use.
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "orange" }}>
            <Button variant="success" onClick={handleClose} className="mx-auto">
              I understand!
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default SignUpModal;
