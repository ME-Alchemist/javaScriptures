import { useRef, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import styled from "styled-components";
import titleStore from "../zustore/titleStore";
import { useSoundContext } from "../components/soundContext";



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
      width: 270px;
      height: 330px;
    }

    .questDropdown {
      & button {
        padding: 9px 5px !important;
      }
    }
  }
`;

const StyledHeader = styled.header`
  font-weight: bolder;
  text-shadow: 2px 3px 12px white;
  margin-bottom: 30px;
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
  const { 
    stopBGM,
    currentBGM, 
    playBattle, 
    setPlayingBattle, 
    playing, 
    setPlaying } = useSoundContext();

    const dropdownBtns = [
      {text: "HTML", funcArg: "html", options: [
        {text: "HTML Basics 1", link: "/main/quests/start/html basics 1"},
        {text: "HTML Basics 2", link: "/main/quests/start/html basics 2"},
        {text: "HTML Basics 3", link: "/main/quests/start/html basics 3"},]},
      {text: "CSS", funcArg: "css", options: [
        {text: "CSS Basics 1", link: "/main/quests/start/css basics 1"},
        {text: "CSS Basics 2", link: "/main/quests/start/css basics 2"},
        {text: "CSS Basics 3", link: "/main/quests/start/css basics 3"},
      ]},
      {text: "JavaScript", funcArg: "js", options: [
        {text: "JS Basics 1", link: "/main/quests/start/javascript basics 1"},
        {text: "JS Basics 2", link: "/main/quests/start/javascript basics 2"},
        {text: "JS Basics 3", link: "/main/quests/start/javascript basics 3"},
      ]},
    ]

  const { setTitle } = titleStore();
  const navigate = useNavigate();

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

  const battleBGMbutton = () => {
        if(playing) {
        stopBGM();
        setPlaying(false);
        playBattle();
        setPlayingBattle(true);
      }
    // pauseBGM();
    // playBattle();
  }

  useEffect(() => {
    console.log(currentBGM.current);
    setTitle("Choose your Quest");
    axios.get("http://localhost:3000/check", { withCredentials: true }).then((res) => {
      console.log(res);
textRef.current.innerHTML =
        "5 riddles await — 3 paths lie before you. Drag and drop your answer into the box of fate. You have three chances to prove your wisdom. Fail, and a hit point shall be lost. Succeed, and experience shall be your reward. May fortune favor the bold.";
      }) .catch((err) => {
        console.log(err);
        navigate("/login", { replace: true });
      });
          return () => {
        setTitle("Welcome traveler");
      };
    
  }, []);

  return (
    <>
      <StyledHeader>
        <h1>Choose your quest</h1>
      </StyledHeader>
      <StyledSection className="flex-md-row">
        <div
          className="questDropdown flex-column d-flex dropdown gap-3"
          style={{ textAlign: "end" }}
        >

          {dropdownBtns.map((btn, index) => {
            return (
              <div key={index} className="dropdown">
                <button
                  onClick={() => handleHover(btn.funcArg)}
                  className="dropdown-toggle rounded"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  key={index}
                >
                  {btn.text}
                </button>
                <List className="dropdown-menu">
                  {btn.options.map((option, index) => {
                    return (
                      <li key={index}>
                        <Link
                          className="dropdown-item battleBtn"
                          to={option.link}
                          onClick={() => battleBGMbutton()}
                        >
                          {option.text}
                        </Link>
                      </li>
                    );
                  })}
                </List>
              </div>
            );
          })}
        </div>

        <div>
          <section className="questDescription bg-dark bg-opacity-50">
            <p ref={textRef} className="placeText"></p>
          </section>
        </div>
      </StyledSection>
    </>
  );
};

export default ChooseQuest;




  // Keeping this as an example for future use
  // const [show, setShow] = useState(null);

  // const handleList = (list) => {
  //   console.log(list);
  //   setShow(list);
  //   if (show === list) {
  //     setShow(null);
  //   }
  // };