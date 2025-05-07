// import { useState } from "react";
import { Link } from "react-router";
import styled from "styled-components";
import HtmlQuests from "../components/htmlQuests";
import CSSQuests from "../components/cssQuests";
import JSQuests from "../components/jsQuests";

const List = styled.ul`
  list-style-type: none;
  width: auto;
  padding: 0;
  margin: 0;
  & li:hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

const ChooseQuest = () => {
  // Keeping this as an example for future use

  // const [show, setShow] = useState(null);

  // const handleList = (list) => {
  //   console.log(list);
  //   setShow(list);
  //   if (show === list) {
  //     setShow(null);
  //   }
  // };

  return (
    <>
      <header>
        <h1>Choose your quest</h1>
      </header>

      <section>
        <div className="align-self-start flex-column d-flex dropdown gap-2 mt-auto ms-5">
          <div className="dropdown">
            <button
              className="dropdown-toggle rounded"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              // Keeping this as an example for future use
              // onClick={() => handleList("html")}
            >
              HTML
            </button>
            <List className="dropdown-menu">
              <li>
                <Link
                  className="dropdown-item"
                  to="/main/questStart/html/1"
                  role="button"
                >
                  HTML Basics 1
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/main/questStart/html/2">
                  HTML Basics 2
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/main/questStart/html/3">
                  HTML Basics 3
                </Link>
              </li>
            </List>
          </div>

          <div className="dropdown">
            <button
              className="dropdown-toggle rounded"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              CSS
            </button>
            <List className="dropdown-menu">
              <li>
                <Link
                  className="dropdown-item"
                  to="/main/questStart/css/1"
                  role="button"
                >
                  CSS Basics 1
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/main/questStart/css/2">
                  CSS Basics 2
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/main/questStart/css/3">
                  CSS Basics 3
                </Link>
              </li>
            </List>
          </div>
          <div className="dropdown">
            <button
              className="dropdown-toggle rounded"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              // onClick={() => handleList("js")}
            >
              JS
            </button>
            <List className="dropdown-menu">
              <li>
                <Link
                  className="dropdown-item"
                  to="/main/questStart/js/1"
                  role="button"
                >
                  JS Basics 1
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/main/questStart/js/2">
                  JS Basics 2
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/main/questStart/js/3">
                  JS Basics 3
                </Link>
              </li>
            </List>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChooseQuest;
