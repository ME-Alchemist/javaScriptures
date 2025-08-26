import JSON from "../static.json";
import categories from "../utils/categories";
import axios from "axios";
import styled from "styled-components";
import titleStore from "../zustore/titleStore";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
// import { code } from "../utils/utils";
import Spinner from "../components/spinner";
import Code from "../components/prism";

const StyledSection = styled.section`
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  flex-direction: column;

  .prepDeco {
    filter: drop-shadow(rgb(0, 0, 0) 10px 5px 5px);
    float: right;
  }

  .figure {
    color: white;
    text-shadow: 2px 4px 3px black;
  }

  & p {
    padding: 10px;
    font-size: larger;
    font-weight: bold;
    color: #fffefe;
    text-shadow: 2px 4px 3px black;
  }

  @media screen and (max-width: 500px) {
    & p {
      font-size: large !important;
    }
  }
`;

const QuestPrep = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { setTitle } = titleStore();
  // const { categories } = JSON;
  const [display, setDisplay] = useState("none");

  const [prep, setPrep] = useState({
    preparation:
      "Before you embark, traveler...The lands you are about to enter hold knowledge both ancient and arcane. Each quest is a trial of wit and wisdom, forged in the fires of the Code. Here, you shall glimpse the scrolls once studied by the Elders — the Runes of Structure, the Cloaks of Style, the Scrolls of Behavior. Take this moment to prepare. Read the signs, study the glyphs, sharpen your understanding. For once the quest begins, there shall be no turning back — only forward, into the unknown. May your thoughts be swift and your spirit steady. The Guild watches... and believes in you.",
    reference: "https://www.w3schools.com/",
    title: null,
    img: null,
    code: null,
  });

  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (category) => {
    setPrep({
      preparation: category.preparation,
      reference: category.reference,
      title: category.title,
      img: category.img,
      code: category.code_block,
    });
    setDisplay("block");
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/check`, { withCredentials: true })
      .then((response) => {
        console.log("the response:", response);

        setTitle("Prepare for the quests ahead");

        const img = new Image();
        img.src = "/images/decorations/dmDeco.webp";
        img.onload = () => {
          setIsLoading(false);
        };

        return () => {
          setTitle("Welcome traveler");
        };
      })
      .catch((err) => {
        console.log(err);
        navigate("/login", { replace: true });
      });
  }, []);

  return (
    <>
      <h1 style={{ fontWeight: "bolder", textShadow: "2px 3px 12px white" }}>
        Adequately prepared is key to success
      </h1>
      <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center">
        {categories.map((category, index) => {
          return (
            <button
              onClick={() => handleClick(category)}
              key={index}
              className="btn btn-dark m-1 p-2"
            >
              {category.title}
            </button>
          );
        })}
      </div>
      <StyledSection
        className="d-flex flex-row align-items-center justify-content-center mx-auto"
        style={{ maxWidth: "650px", width: "100%" }}
      >
        <div className="border border-black rounded-4 m-2 bg-dark bg-opacity-50 overflow-auto">
          <div style={{ height: "390px" }}>
            <p>
              <img
                style={{ float: "left" }}
                width={"100px"}
                src={`${import.meta.env.BASE_URL}${prep.img}`}
                alt={prep.id}
                title={prep.id}
                className="d-sm-block d-md-none d-lg-none"
              />
              {prep.preparation}
            </p>
            <pre style={{ display: display }}>
              <Code code={prep.code} language="js" />
            </pre>
            <p style={{ display: display }}>
              Brush up on your knowledge by
              <br />
              pressing
              <Link target="_blank" to={prep.reference}>
                {" "}
                here
              </Link>
            </p>
          </div>
        </div>
        <div className="d-flex flex-column d-none d-md-block d-lg-block">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <img
                className="rounded-end-4 prepDeco"
                src={`${
                  import.meta.env.BASE_URL
                }images/decorations/dmDeco.webp`}
                alt="DM"
                title="Duke MacQuoid"
                width={"250px"}
              />
              <q className="figure fs-5">Duke MacQuoid, Guide</q>
            </>
          )}
        </div>
      </StyledSection>
    </>
  );
};

export default QuestPrep;
