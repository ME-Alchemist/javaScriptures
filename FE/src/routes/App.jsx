// import { useState } from "react";
// import reactLogo from "../assets/react.svg";
// import viteLogo from "/vite.svg";
import "../App.css";
import { Link } from "react-router";

function App() {
  return (
    <>
      <h1>
        "Welcome to the Realm — Where Code is Power and Every Line Matters."
      </h1>
      <h1>Welcome to the JavaScriptures!</h1>
      <main
        className="d-flex flex-column gap-5 mx-auto justify-content-center align-items-center mt-5"
        style={{ width: "65%" }}
      >
        <section
          className="align-self-start"
          style={{ border: "1px solid black", width: "300px" }}
        >
          <div>
            <p>
              This isn’t just another tutorial. It’s a world built on logic,
              challenge, and growth.
            </p>
            <p>
              In this game, your tools are HTML, CSS, and JavaScript. Each quest
              is a trial. Every bug, a monster to defeat. And the deeper you go,
              the stronger you become.
            </p>
          </div>
        </section>

        <section
          className="align-self-end"
          style={{ border: "1px solid black", width: "300px" }}
        >
          <div>
            <p>Pick your class. Sharpen your skills. Rewrite your fate</p>
            <p>
              Sign up to begin your journey — and earn your place among the
              legends of this digital realm.
            </p>
          </div>
        </section>

        <section
          className="align-self-start"
          style={{ border: "1px solid black", width: "300px" }}
        >
          <div>
            <p>section 3</p>
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
                around web development topics.
              </li>
            </ul>
          </div>
        </section>

        <section
          className="align-self-end"
          style={{ border: "1px solid black", width: "300px" }}
        >
          <div>
            <p>
              Whether you're a seasoned adventurer or a new squire, there's a
              place for you at the table.
            </p>
            <p>The realm awaits. Are you ready to begin your legend?</p>
          </div>
        </section>

        <section className="align-self-center">
          <h2>
            press <Link to="/register">here</Link> to register
          </h2>
          <h2>
            press <Link to="/login">here</Link> to login
          </h2>
        </section>
      </main>
    </>
  );
}

export default App;
