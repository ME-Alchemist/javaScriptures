// import { useState } from "react";
// import reactLogo from "../assets/react.svg";
// import viteLogo from "/vite.svg";
import "../App.css";
import { Link } from "react-router";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components";

const Background = styled.div`
  background-image: url(/images/backdrops/mainPageBackground2.webp);
  background-size: cover;
  background-position: center;
  /* height: auto; */
  background-color: #f5f0e6;
  color: #3e2f1c;

  & a {
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease-in-out;
  }

  & a:hover {
    color: #25488a;
    text-shadow: 1px 1px 2px blue;
  }

  .secondAnchor {
    transition: all 0.2s ease-in-out;
  }

  & .secondAnchor:hover {
    color: #258a57;
    text-shadow: 1px 1px 2px green;
  }

  & h1:first-child {
    text-shadow: #000 4px 5px 4px;
    color: white;
    font-weight: bold;
    margin-top: 30px;
  }

  & section {
    /* overflow: auto; */
    border: 3px solid #000000;
    border-radius: 15px;
    max-width: 350px;
    min-width: 280px;
    background-color: #fffff0c2;
    margin-left: 10px;

    @media screen and (max-width: 400px) {
      max-width: 300px;
      margin: unset;

      & section:nth-child(2n) {
        align-self: flex-start !important;
      }
    }
  }

  & section:nth-child(2n) {
    margin-right: 10px !important;
  }

  & section:nth-child(5) {
    margin-right: 10px !important;
  }

  & section:last-child {
    max-width: 450px;
    margin-bottom: 20px;
  }

  & main {
    width: 50em !important;
    font-weight: bold;
    font-size: larger;
    margin-top: 5rem !important;
    @media screen and (max-width: 900px) {
      width: 100% !important;
    }
  }
`;

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <Background>
      <h1>Welcome to the JavaScriptures</h1>
      <h1>Where Code is Power and Every Line Matters</h1>
      <main
        className="d-flex flex-column gap-5 mx-auto justify-content-center align-items-center mt-5"
        // style={{ width: "65%" }}
      >
        <section className="align-self-start" data-aos="fade-right">
          <div>
            <p>
              This isn’t just another tutorial. It’s a world built on logic,
              challenge, and growth.
            </p>
            <p>
              In this game, your tools are HTML, CSS, and JavaScript. Each quest
              is a trial. Every bug, a monster to defeat. And the deeper you go,
              <img
                src="/images/decorations/mimicDeco.webp"
                alt=""
                width={"130px"}
                style={{ float: "left" }}
                loading="lazy"
              />
              the stronger you become.
            </p>
          </div>
        </section>

        <section className="align-self-end" data-aos="fade-left">
          <div>
            <p>Pick your class. Sharpen your skills. Rewrite your fate</p>
            <p>
              <img
                src="/images/decorations/rogueDeco.webp"
                alt=""
                width={"150px"}
                style={{ float: "right" }}
                loading="lazy"
              />{" "}
              Sign up to begin your journey — and earn your place among the
              legends of this digital realm.
            </p>
          </div>
        </section>

        <section className="align-self-start" data-aos="fade-right">
          <div>
            <ul>
              <li>
                Quest-Based Learning – Complete interactive challenges and
                puzzles.
              </li>
              <li>
                Choose Your Class – Become a Wizard of JavaScript or a Rogue of
                CSS.
              </li>
              <li>
                Earn Experience & Level Up – Unlock new abilities and titles as
                you grow.
              </li>
              <li>
                Explore the Realm – Progress through different zones themed
                <img
                  src="/images/decorations/clericDeco.webp"
                  alt=""
                  width={"150px"}
                  style={{ float: "left" }}
                  loading="lazy"
                />{" "}
                around web development topics.
              </li>
            </ul>
          </div>
        </section>

        <section className="align-self-end" data-aos="fade-left">
          <div>
            <p>
              Whether you're a seasoned adventurer or a new squire, there's a
              place for you at the table.
            </p>
            <img
              src="/images/decorations/beholderDeco.webp"
              alt=""
              width={"150px"}
              style={{ float: "right" }}
              loading="lazy"
            />
            <p>The realm awaits. Are you ready to begin your legend?</p>
          </div>
        </section>

        <section className="align-self-center" data-aos="fade-up">
          <Link to="/register">
            <h2>Press here to register yourself to the adventurers guild!</h2>
          </Link>
          <hr />
          <Link className="secondAnchor" to="/login">
            <h2>Press here to start logging your quests and adventures!</h2>
          </Link>
        </section>
      </main>
    </Background>
  );
}

export default App;
