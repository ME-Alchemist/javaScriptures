import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router";
import titleStore from "../zustore/titleStore";
import { useEffect } from "react";
import JSON from "../static.json";
// import { Link, useNavigate } from "react-router";
// import axios from "axios";
// import Spinner from "../components/spinner";

const StyledSection = styled.section`
  display: flex !important;
  flex-wrap: wrap !important;
  justify-content: center !important;
  align-items: center !important;
  flex-direction: row !important;
  max-height: 80vh !important;
  overflow-y: auto;
  font-size: 1.1rem;

  & article {
    color: white;
    text-shadow: 2px 4px 3px black;
    margin: 4px 2px 0px 2px;
    border: 2px solid black;
    border-radius: 15px;
    border-style: inset;
    padding: 5px;
    height: 300px;
    width: 260px;
    overflow-y: auto;
  }

  & ul {
    /* list-style-type: none; */
    list-style-position: inside;
    padding: 0;
  }
`;

const Credits = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { setTitle } = titleStore();
  const { sounds } = JSON;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/check`, { withCredentials: true })
      .then((response) => {
        console.log("the response:", response);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login", { replace: true });
      });

    setTitle("Credits");

    return () => {
      setTitle("Welcome traveler");
    };
  }, []);

  return (
    <>
      <h1 className="fs-1 fw-bold" style={{ textShadow: "2px 3px 12px white" }}>
        The guild was not built in a day...
      </h1>

      <StyledSection className="">
        <article className="bg-dark bg-opacity-50">
          <h2>The Tools</h2>
          <hr />
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>Bootstrap</li>
            <li>Aiven</li>
            <li>MySQL</li>
            <li>Sequelize</li>
            <li>Visual Studio Code</li>
            <li>Express</li>
            <li>jsonwebtoken</li>
            <li>cookie-parser</li>
            <li>cors</li>
            <li>dotenv</li>
            <li>bcrypt-js</li>
            <li>React Router</li>
            <li>React Context</li>
            <li>Zustand</li>
            <li>AOS</li>
            <li>styled-components</li>
            <li>DnD Kit</li>
            <li>prismJS</li>
          </ul>
        </article>

        <article className="bg-dark bg-opacity-50">
          <h2>The Resources</h2>
          <hr />
          <ul>
            <li>W3Schools</li>
            <li>MDN</li>
            <li>Freesound</li>
            <li>Pixabay</li>
            <li>Stack Overflow</li>
            <li>YouTube</li>
            <li>GitHub</li>
            <li>Google</li>
            <li>SORA AI</li>
          </ul>
        </article>

        <article className="bg-dark bg-opacity-50">
          <h2>The Sounds</h2>
          <hr />
          <ul>
            {sounds.map((sound, index) => (
              <li key={index}>
                {sound.sound_name}
                <p>
                  By: {sound.author_name} <br />
                  Url: <a href={sound.sound_url}>Freesound link</a> <br />
                  License: {sound.license_name}
                </p>
                <hr />
              </li>
            ))}
          </ul>
        </article>

        <article className="bg-dark bg-opacity-50">
          <h2>And a special thanks to...</h2>
          <hr />
          <ul>
            <li>
              IT Hogskolan Gothenburg / Higher Vocational Education of
              Gothenburg
            </li>
            <li>The teachers</li>
            <li>School colleagues</li>
            <li>
              Resource Point AB for giving me the chance to work with them and
              web development in a working environment
            </li>
            <li>My family and friends</li>
          </ul>
        </article>
      </StyledSection>
    </>
  );
};

export default Credits;
