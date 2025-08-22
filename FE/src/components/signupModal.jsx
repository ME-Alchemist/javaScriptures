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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "orange" }} closeButton>
          <Modal.Title
            className="mx-auto fw-bold text-decoration-underline"
            style={{
              textShadow: "2px 4px 3px black",
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
            textShadow: "2px 4px 3px black",
          }}
          className="fs-5"
        >
          {" "}
          There's no need for real mail adresses here, no verification mail is
          sent so please make one up, this form is mainly used for constraints
          and check purposes, wether a mail is valid or perhaps already in use
          along with username and proper password creation.
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "orange" }}>
          <Button variant="success" onClick={handleClose} className="mx-auto">
            Understood!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignUpModal;
