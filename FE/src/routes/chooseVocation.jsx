import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import Slider from "react-slick";
import styled from "styled-components";
// import "../../node_modules/slick-carousel/slick/slick.css";
// import "../../node_modules/slick-carousel/slick/slick-theme.css";

const StyledDiv = styled.div`
  /* background-image: url(/images/backdrops/mainPageBackground2.webp); */
  background-size: cover;
  background-position: center;
  height: auto;
  margin-top: 30px;

  .vocationDescription {
    text-align: center;
    font-size: x-large;
    text-shadow: 2px 1px 2px white;
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
  const [currentVocation, setCurrentVocation] = useState({});
  const description = useRef(null);
  const navigate = useNavigate();
  // const [next, setNext] = useState(0);

  const updateChoseVocation = () => {
    axios
      .patch(
        "http://localhost:3000/user/update/vocation",
        { chosenVocation: 1, vocation_id: currentVocation.vocation_id },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        alert("Vocation updated successfully");
        navigate("/main", { replace: true });
      })
      .catch((err) => {
        console.log("invalid token", err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/vocations")
      .then((res) => {
        console.log(res.data);
        setVocations(res.data);
        setCurrentVocation(res.data[0]);
      })
      .catch((err) => {
        console.log("invalid token", err);
      });
  }, []);

  useEffect(() => {
    console.log(currentVocation.vocation_description);
    if (currentVocation) {
      description.current.innerHTML = currentVocation.vocation_description;
    }
  }, [currentVocation]);

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
      let vocation = vocations[next];
      setCurrentVocation(vocation);
      console.log("the one it stops on", next);
      console.log("the one before the it stops on", current);
    },
  };

  return (
    <StyledDiv>
      <h1 className="mb-4">Choose your vocation</h1>

      <div className="bodyContainer d-flex flex-column flex-lg-row justify-content-center align-items-center">
        <div className="aboutVocationContainer ">
          <p ref={description} className="vocationDescription"></p>
        </div>

        <div className="vocationContainer">
          <Slider {...settings}>
            {vocations ? (
              vocations.map((vocation) => {
                return (
                  <div key={vocation.vocation_id}>
                    <img
                      width={"350px"}
                      height={"500px"}
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
      <button
        className="btn btn-dark btn-lg mt-4 mb-4"
        onClick={updateChoseVocation}
      >
        Confirm Choice
      </button>
      {/* <button onClick={previousSlide}>previous</button>
      <button onClick={nextSlide}>next</button> */}
    </StyledDiv>
  );
};

export default ChooseVocation;
