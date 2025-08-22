import { useSoundContext } from "../components/soundContext";
import { Link } from "react-router";
import styled from "styled-components";

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

const Modal = () => {
  const {
    stopBGM,
    playBoss,
    setPlayingBoss,
    stopBattle,
    setPlayingBattle,
    playing,
    setPlaying,
  } = useSoundContext();

  const bossBGMbutton = () => {
    if (playing) {
      stopBGM();
      stopBattle();
      setPlaying(false);
      setPlayingBattle(false);
      playBoss();
      setPlayingBoss(true);
    }
  };

  return (
    <>
      <StyledModal
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 mx-auto fw-bold"
                id="exampleModalLabel"
              >
                You 're about to challenge The Dragon Queen
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body"
              style={{ height: "250px", overflowY: "scroll" }}
            >
              <p>
                This is the final trial — a gauntlet of 15 questions spanning
                HTML, CSS, and JavaScript. Each wrong answer costs a hit point,
                and only steady focus will see you through. It is strongly
                recommended that you complete HTML, CSS, and JS Basics 1 before
                attempting this challenge. The Dragon Queen offers no second
                chances… but great rewards await those who endure. <br />
                Do you still wish to proceed?
              </p>
            </div>
            <div className="modal-footer">
              <div className="mx-auto d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-dark"
                  data-bs-dismiss="modal"
                >
                  Turn back
                </button>
                <Link to={"/main/quests/start/Dragon Queen's challenge"}>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={bossBGMbutton}
                  >
                    Proceed
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </StyledModal>
    </>
  );
};

export default Modal;
