import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import Slider from "react-slick";
import styled from "styled-components";

const StyledDiv = styled.div`
  background-size: cover;
  background-position: center;
  height: auto;

  & h1 {
    font-weight: bolder;
    text-shadow: 2px 3px 12px white;
  }

  .vocationDescription {
    text-align: center;
    font-size: x-large;
    text-shadow: 4px 4px 3px black;
    color: white;
    font-weight: bolder;
  }

  .bodyContainer {
    gap: 6rem !important;

    @media screen and (max-width: 990px) {
      gap: 2rem !important;

      .vocationDescription {
        font-size: larger;
      }

      .aboutVocationContainer {
        width: 400px !important;
        height: 320px !important;
      }
    }

    @media screen and (max-width: 550px) {
      gap: 2rem !important;
    }

    @media screen and (max-width: 430px) {
      gap: 1rem !important;
      .vocationDescription {
        font-size: large;
        margin: unset !important;
      }

      .aboutVocationContainer {
        width: 285px !important;
        overflow-y: auto;
      }
    }
  }

  .vocationContainer {
    background-color: black;
    background-image: url(/images/backdrops/vocationBG.webp);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    width: 400px;
    border: 4px solid black;
    border-style: outset;
    border-radius: 15px;
    @media screen and (max-width: 550px) {
      width: 290px;
    }

    @media screen and (max-width: 430px) {
      width: 260px;
      margin-bottom: 30px;

      .slick-prev,
      .slick-next {
        top: 50%;
        z-index: 9999999;
      }

      .slick-prev {
        left: 0px;
      }

      .slick-next {
        right: 25px;
      }
    }
  }

  .aboutVocationContainer {
    width: 400px;
    height: 420px;
    display: flex;
    align-items: center;
    border: 4px solid black;
    border-style: outset;
    border-radius: 15px;

    @media screen and (max-width: 550px) {
      width: 290px;
    }

    @media screen and (max-width: 430px) {
      width: 275px;
      height: 370px;
    }
  }

  .slick-prev {
    left: -55px;
  }

  .slick-prev::before,
  .slick-next::before {
    color: black;
    font-size: 50px;
  }
`;

const ChooseVocation = () => {
  const [vocations, setVocations] = useState([]);
  const [vocationsTypeB, setVocationsTypeB] = useState([]);
  const [currentVocation, setCurrentVocation] = useState({});
  const [currentVocationTypeB, setCurrentVocationTypeB] = useState({});
  const [display, setDisplay] = useState("block");
  const [show, setShow] = useState(true);
  const description = useRef(null);
  const descriptionTypeB = useRef(null);
  // const currentVocationRef = useRef(null);
  const navigate = useNavigate();
  // const [next, setNext] = useState(0);

  const updateChoseVocation = () => {
    if (show) {
      axios
        .patch(
          "http://localhost:3000/user/update/vocation",
          { chosenVocation: 1, vocation_id: currentVocation.vocation_id },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          alert(`Vocation chosen: ${currentVocation.vocation_name}`);
          navigate("/main/home", { replace: true });
        })
        .catch((err) => {
          console.log("invalid token", err);
        });
    } else {
      axios
        .patch(
          "http://localhost:3000/user/update/vocation",
          { chosenVocation: 1, vocation_id: currentVocationTypeB.vocation_id },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          alert(`Vocation chosen: ${currentVocationTypeB.vocation_name}`);
          navigate("/main/home", { replace: true });
        })
        .catch((err) => {
          console.log("invalid token", err);
        });
    }
  };

  // change body type
  // update the value of the current vocation id based on what body type has been chosen
  const changeBodyType = () => {
    setShow((show) => !show);
    setDisplay(show ? "none" : "block");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/vocations")
      .then((res) => {
        // set the twelve last ones for body type B
        setVocationsTypeB(res.data.slice(12));
        // limit array to the first twelve options for body type A
        setVocations(res.data.slice(0, 12));
        setCurrentVocation(res.data[0]);
        setCurrentVocationTypeB(res.data[12]);
      })
      .catch((err) => {
        console.log("invalid token", err);
      });
  }, []);

  useEffect(() => {
    if (currentVocation) {
      description.current.innerHTML = currentVocation.vocation_description;
    }
  }, [currentVocation]);

  useEffect(() => {
    if (currentVocationTypeB) {
      descriptionTypeB.current.innerHTML =
        currentVocationTypeB.vocation_description;
    }
  }, [currentVocationTypeB]);

  // slider settings
  var settings = {
    dots: false,
    infinite: true,
    initialSlide: 0,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    beforeChange: (current, next) => {
      if (show) {
        let vocation = vocations[next];
        setCurrentVocation(vocation);
      } else {
        let vocation = vocationsTypeB[next];
        setCurrentVocationTypeB(vocation);
      }
    },
  };

  return (
    <StyledDiv>
      <h1 className="mb-4">Choose your vocation</h1>

      <div className="bodyContainer d-flex flex-column flex-lg-row justify-content-center align-items-center">
        <div
          style={{ display: display }}
          className="aboutVocationContainer bg-dark bg-opacity-50"
        >
          <p ref={description} className="vocationDescription"></p>
        </div>

        <div
          style={{ display: display === "none" ? "block" : "none" }}
          className="aboutVocationContainer bg-dark bg-opacity-50"
        >
          <p ref={descriptionTypeB} className="vocationDescription"></p>
        </div>

        <div className="vocationContainer">
          <Slider style={{ display: display }} className="" {...settings}>
            {vocations ? (
              vocations.map((vocation) => {
                return (
                  <div key={vocation.vocation_id}>
                    <img
                      id={vocation.vocation_id}
                      width={"280px"}
                      src={vocation.vocation_img}
                      key={vocation.vocation_id}
                      alt="vocation"
                      title={vocation.vocation_name}
                      style={{ objectFit: "cover" }}
                      className="mx-auto img-fluid"
                    />
                  </div>
                );
              })
            ) : (
              <Spinner animation="border" />
            )}
          </Slider>

          <Slider
            style={{ display: display === "none" ? "block" : "none" }}
            className=""
            {...settings}
          >
            {vocationsTypeB ? (
              vocationsTypeB.map((vocation) => {
                return (
                  <div key={vocation.vocation_id}>
                    <img
                      width={"280px"}
                      src={vocation.vocation_img}
                      key={vocation.vocation_id}
                      alt="vocation"
                      title={vocation.vocation_name}
                      style={{ objectFit: "cover" }}
                      className="mx-auto img-fluid"
                    />
                  </div>
                );
              })
            ) : (
              <Spinner animation="border" />
            )}
          </Slider>
        </div>
      </div>
      <div className="mt-4 d-flex justify-content-center gap-2">
        {/* <button className="btn btn-dark btn-lg">Body Type A</button> */}
        <button
          onClick={() => changeBodyType()}
          className="btn btn-dark btn-lg"
        >
          {show ? "Body Type A" : "Body Type B"}
        </button>
      </div>
      <button
        className="btn btn-dark btn-lg mt-4 mb-4"
        onClick={updateChoseVocation}
      >
        Confirm Choice
      </button>
    </StyledDiv>
  );
};

export default ChooseVocation;
