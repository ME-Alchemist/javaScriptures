import styled from "styled-components";
import axios from "axios";
import Prompt from "react-router-prompt";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { DndContext } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import HP from "../components/HP";

import titleStore from "../zustore/titleStore";
import questStore from "../zustore/questStore";
import completedStore from "../zustore/questCompletedStore";
import Draggable from "../components/DnD kit/Draggable";
import Droppable from "../components/DnD kit/Droppable";

const StyledWrapper = styled.section`
  /* width: auto;
  height: auto; */
  /* border: 1px solid black; */
  /* flex-grow: 1; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .icons {
    height: 20px;
    width: 20px;
  }

  #droppable {
    width: 300px;
    height: 150px;
    border: 2px solid black;
  }

  .questLog {
    border: 3px solid #ffe244bf;
    border-radius: 15px;
    flex-basis: 0;
    flex-grow: 0.5;
    max-width: 350px;
    min-width: 300px;
    background-color: #fffff0c2;
    margin-left: 10px;
    min-height: 450px;
    max-height: 450px;
    overflow-y: scroll;
    & p {
      font-size: large;
      font-weight: 600;
    }
  }

  .question {
    text-shadow: #fc0 1px 0 10px;
    color: white;
    font-weight: bold;
    margin-bottom: 30px;
    max-width: 450px;
    /* min-width: 700px; */
    @media screen and (max-width: 600px) {
      font-size: large;
    }
  }

  .answers {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-left: 10px;
  }

  & img {
    width: 250px;
    height: 400px;
    object-fit: contain;
  }

  @media screen and (max-width: 760px) {
    .questLog {
      display: none;
    }

    @media screen and (max-width: 500px) {
      & img {
        height: 300px;
      }
    }
  }
`;

const ModalBox = styled.div`
  .lightbox {
    position: fixed;
    z-index: 999;
    inset: 0;
    background: #00000087;
    display: flex;
    align-items: center;
    justify-content: center;
    & p {
      font-size: larger;
      font-weight: bold;
      color: white;
    }
    & button {
      border-radius: 15px;
      /* background-color: #143636 !important; */
    }
  }

  .lightbox .boxContainer {
    background: #16081c;
    padding: 2em 4em;
    border-radius: 1rem;
    max-width: 550px;
  }
`;

const ChosenQuests = () => {
  const navigate = useNavigate();
  const { setTitle } = titleStore();
  const { updateQuest, resetQuest } = questStore();
  const { setQuestCompleted } = completedStore();
  const { category_name } = useParams();
  // maybe these states could be placed in a object on in a useReducer

  const [next, setNext] = useState(0);
  const [quest, setQuest] = useState(null);
  // drag & drop from dnd kit
  const [dropped, setDropped] = useState(null);
  // place monsters loaded into an array
  const [monsters, setMonsters] = useState([]);
  // const [loading, setLoading] = useState(true);
  // You get three tries
  const [hitPoints, setHitPoints] = useState(3);
  // const draggable = <Draggable id="draggable">Go ahead, drag me.</Draggable>;
  const [blocking, setBlocking] = useState(true);
  // const [autoNavigate, setAutoNavigate] = useState(false);

  // Type writer effect
  const appendToQuestLog = async (text, fSize, fStyle, fColor) => {
    try {
      let i = 0;
      let txt = text;
      let speed = 20;
      const para = document.createElement("p");
      para.style.fontSize = fSize;
      para.style.fontStyle = fStyle;
      para.style.color = fColor;
      const questLog = document.querySelector(".questProgress");
      questLog.appendChild(para);

      const typeWriter = () => {
        if (i < txt.length) {
          para.innerHTML += txt.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
        }
        para.scrollIntoView({ behavior: "smooth" });
      };
      typeWriter();
    } catch (error) {
      console.log(error);
    }
  };

  // image preloader
  const preloadImages = async (imageUrls) => {
    return Promise.all(
      imageUrls.map(
        (url) =>
          new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(url);
            img.onerror = reject;
          })
      )
    );
  };

  // fetch data/quests/monsters
  const questFetch = async () => {
    try {
      resetQuest();
      const questResponse = await axios.get(
        `http://localhost:3000/quests/${category_name}`,
        {
          withCredentials: true,
        }
      );
      const monsterResponse = await axios.get(
        `http://localhost:3000/monsters/${category_name}`,
        {
          withCredentials: true,
        }
      );
      const data = questResponse.data;
      const monsterData = monsterResponse.data;
      while (monsterData.length < 5) {
        let random = Math.floor(Math.random() * 3);
        monsterData.push(monsterData[random]);
      }

      const imageUrls = monsterData.map((monster) => monster.img_path);
      await preloadImages(imageUrls);

      setMonsters(monsterData);
      setQuest(data);
    } catch (error) {
      console.log(error);
    }
  };

  // next question by index
  const nextQuestion = () => {
    if (next < quest.length) {
      setNext(next + 1);
      setDropped(null);

      console.log(quest[next]);
      console.log(next);
    }
  };

  // Reload button to restart game and reset hitpoints,
  // const reload = () => {
  //   setNext(0);
  //   setHitPoints(3);
  // };

  // Run fetch on mount
  useEffect(() => {
    setQuestCompleted(false);
    console.log(completedStore.getState().questCompleted);
    setTitle("The Quest begins!");
    questFetch();

    // cleanup function
    return () => {
      setTitle("Welcome traveler!"); // reset to initial title
      // resetQuest();
      setBlocking(true);
    };
  }, []);

  useEffect(() => {
    if (quest) {
      appendToQuestLog(
        `The ${monsters[0].enemy_name} asks: ${quest[0].question}`
      );
    }
  }, [quest]);

  useEffect(() => {
    if (quest && next >= quest.length) {
      setBlocking(false);
      appendToQuestLog(
        `Quest completed! Total exp gathered: ${
          questStore.getState().exp_gathered
        } exp`,
        "20px",
        "italic"
      );
      setTimeout(() => {
        navigate(`/main/results/success/${category_name}`, {
          replace: true,
          state: { fromQuest: true },
        });
      }, 2000);
    }
  }, [next]);

  // Header.title = `"Loading"`;

  return (
    <>
      <Prompt
        when={blocking}
        beforeConfirm={() => {
          resetQuest();
          console.log(
            `You chose to leave.Your progress is now lost, the quest resets itself`
          );
        }}
        beforeCancel={() => {
          console.log("You chose to remain");
        }}
      >
        {({ isActive, onCancel, onConfirm }) =>
          isActive && (
            <ModalBox>
              <div className="lightbox">
                <div className="boxContainer">
                  <p>
                    Are you sure you want to cancel the current quest? You'll
                    lose your experience gathered so far
                  </p>
                  <div className="d-flex justify-content-center flex-column flex-sm-row gap-2">
                    <button
                      className="bg-success bg-gradient"
                      type="button"
                      onClick={onCancel}
                    >
                      No, I will push on!
                    </button>
                    <button
                      className="bg-warning bg-gradient"
                      type="submit"
                      onClick={onConfirm}
                    >
                      Fallback! Retreat!
                    </button>
                  </div>
                </div>
              </div>
            </ModalBox>
          )
        }
      </Prompt>

      <>
        {quest ? (
          <>
            <DndContext
              modifiers={[restrictToWindowEdges]}
              onDragEnd={handleDragEnd}
            >
              {/* <button onClick={nextQuestion}>Next</button> */}
              <StyledWrapper className="">
                <section className="d-flex flex-column gap-2">
                  <div
                    className="border border-black rounded-4"
                    style={{ marginLeft: "10px" }}
                  >
                    <HP />
                  </div>

                  <article className="questLog">
                    <h3 className="text-decoration-underline fw-bold">
                      {quest[next]?.category.category_name}
                    </h3>
                    <p>Quest log:</p>
                    <hr
                      style={{ border: "2px solid darkgray", opacity: "unset" }}
                    />
                    <aside className="questProgress"></aside>
                  </article>
                </section>

                {next < quest.length ? (
                  <article>
                    <div className="d-flex justify-content-center">
                      <h3 className="question">{quest[next].question}</h3>
                    </div>
                    {/* {!parent ? draggable : null} */}
                    <img
                      src={monsters[next].img_path}
                      alt={monsters[next].enemy_name}
                      title={monsters[next].enemy_name}
                      className="img-fluid monster-img"
                      srcSet=""
                    />
                    <Droppable
                      id="droppable"
                      droppedAnswer={
                        dropped ? quest[next][`answer_${dropped}`] : null
                      }
                    />
                    <div className="answers">
                      <Draggable id="a">
                        {quest[next].answer_a}{" "}
                        <img
                          className="icons"
                          src="/images/decorations/swordDeco.webp"
                          alt=""
                        />
                      </Draggable>
                      <Draggable id="b">
                        {quest[next].answer_b}{" "}
                        <img
                          className="icons"
                          src="/images/decorations/shieldDeco.webp"
                          alt=""
                        />
                      </Draggable>
                      <Draggable id="c">
                        {quest[next].answer_c}{" "}
                        <img
                          className="icons"
                          src="/images/decorations/potionDeco.webp"
                          alt=""
                        />
                      </Draggable>
                    </div>
                  </article>
                ) : (
                  <div className="d-flex justify-content-center gap-4 ms-4">
                    <h3 className="question">Quest Complete!</h3>
                  </div>
                )}
              </StyledWrapper>
            </DndContext>
          </>
        ) : (
          <StyledWrapper className="fs-3 d-flex flex-row align-items-center">
            <Spinner animation="border" />
            <p className="mb-0 ms-3">LOADING QUEST...</p>
          </StyledWrapper>
        )}
      </>
    </>
  );

  function handleDragEnd({ active, over }) {
    if (over) {
      console.log(
        `the answer "${active.id}" was dropped over the ${over.id} element`
      );
      if (active.id === String(quest[next].correct_answer)) {
        const nextMonster = next + 1;
        setDropped(active.id);
        updateQuest(
          monsters[next].exp_drop,
          questStore.getState().hitPoints,
          monsters[next].enemy_name
        );
        console.log(questStore.getState().exp_gathered);
        appendToQuestLog(
          `Correct! You received ${monsters[next].exp_drop} exp`,
          undefined,
          undefined,
          "green"
        );
        if (nextMonster < quest.length) {
          appendToQuestLog(
            `The ${monsters[nextMonster].enemy_name} asks: ${quest[nextMonster].question}`
          );
        }
        nextQuestion();
      }

      if (active.id !== String(quest[next].correct_answer)) {
        let getHP = document.querySelectorAll(".hp");
        getHP[getHP.length - 1].remove();
        const newHitPoints = hitPoints - 1;
        setHitPoints(newHitPoints);
        setDropped(active.id);
        appendToQuestLog(
          `wrong answer! Hit Points left: ${newHitPoints}HP`,
          undefined,
          undefined,
          "red"
        );
        updateQuest(0, newHitPoints, "");

        if (newHitPoints <= 0) {
          setBlocking(false);
          appendToQuestLog("No more tries!").then(() => {
            setTimeout(() => {
              navigate("/main/results/failed", {
                replace: true,
                state: { fromQuest: true },
              });
            }, 1500);
          });
        }
      }
    }
  }
};

export default ChosenQuests;
