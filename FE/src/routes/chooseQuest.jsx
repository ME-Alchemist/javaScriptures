import { useRef, useEffect } from "react";
import { Link } from "react-router";
import styled from "styled-components";

const StyledSection = styled.section`
  gap: 3rem;
  font-size: 1.2rem;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  flex-direction: column;

  .questDropdown {
    flex-direction: row !important;
  }

  .placeText {
    font-size: larger;
    font-weight: bold;
    color: #fffefe;
    text-shadow: 2px 4px 3px black;
  }

  .questDescription {
    border-radius: 15px;
    border: 2px solid black !important;
    border-style: outset;
    width: 350px;
    height: 360px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 768px) {
    gap: 8rem;

    .questDescription {
      width: 300px;
      height: 300px;
    }
    .placeText {
      font-size: large;
      font-weight: bold;
      color: #fffefe;
    }
  }

  @media screen and (max-width: 400px) {
    .questDescription {
      width: 300px;
      height: 330px;
    }

    .questDropdown {
      & button {
        padding: 9px 5px !important;
      }
    }
  }
`;

const List = styled.ul`
  list-style-type: none;
  width: auto;
  padding: 0;
  margin: 0;
  font-size: 1.1rem;
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

  const textRef = useRef(null);

  const handleHover = (text) => {
    const threeStrings = {
      html: "A challenge awaits — three code tags lie before you. Drag and drop the correct tag into the sacred markup. You have three attempts to structure it right. Fail, and a hit point shall be lost. Succeed, and earn experience in the language of the web. The browser gods are watching — good luck.",

      css: "A style puzzle lies ahead — three declarations await. Drag and drop the right rule into the scroll of design. You have three chances to craft the perfect look. Fail, and a hit point shall vanish. Succeed, and gain experience in the art of style. May your layouts be ever aligned.",

      js: "A logic test begins — three scripts stand before you. Drag and drop the true function into the flow of code. You have three tries to bend the browser to your will. Fail, and you shall lose a hit point. Succeed, and power flows through your syntax. Let the code be with you.",
    };

    if (text === "html") {
      text = threeStrings.html;
    } else if (text === "css") {
      text = threeStrings.css;
    } else if (text === "js") {
      text = threeStrings.js;
    }

    textRef.current.innerHTML = text;
  };

  useEffect(() => {
    textRef.current.innerHTML =
      "5 riddles await — paths lie before you. Drag and drop your answer into the circle of fate. You have three chances to prove your wisdom. Fail, and a hit point shall be lost. Succeed, and experience shall be your reward. May fortune favor the bold.";
  }, []);

  return (
    <>
      <header>
        <h1>Choose your quest</h1>
      </header>

      <StyledSection className="flex-md-row">
        <div
          className="questDropdown flex-column d-flex dropdown gap-3"
          style={{ textAlign: "end" }}
        >
          <div className="dropdown">
            <button
              onClick={() => handleHover("html")}
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
              onClick={() => handleHover("css")}
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
              onClick={() => handleHover("js")}
              className="dropdown-toggle rounded"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              // onClick={() => handleList("js")}
            >
              JavaScript
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
        <div>
          <section className="questDescription">
            <p ref={textRef} className="placeText"></p>
          </section>
        </div>
      </StyledSection>
    </>
  );
};

export default ChooseQuest;
