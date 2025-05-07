import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import Slider from "react-slick";
// import "../../node_modules/slick-carousel/slick/slick.css";
// import "../../node_modules/slick-carousel/slick/slick-theme.css";

var settings = {
  dots: false,
  infinite: true,
  initialSlide: 0,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
};

const ChooseVocation = () => {
  const [vocations, setVocations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/vocations")
      .then((res) => {
        console.log(res.data);
        setVocations(res.data);
      })
      .catch((err) => {
        console.log("invalid token", err);
      });
  }, []);

  return (
    <>
      <h1>Choose your vocation</h1>

      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-4">
        <div
          style={{
            width: "400px",
            height: "fit-content",
            border: "2px solid black",
            borderRadius: "15px",
          }}
        >
          <p>Choose your vocation frame 2 text</p>
        </div>

        <div
          style={{
            width: "500px",
            border: "2px solid black",
            borderRadius: "15px",
          }}
        >
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
    </>
  );
};

export default ChooseVocation;
