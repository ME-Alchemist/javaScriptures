import styled from "styled-components";
import { useSoundContext } from "../components/soundContext";
import { appendToQuestLog, shuffle } from "../utils/utils";
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
    text-shadow: #000 -1px 5px 3px;
    color: white;
    font-weight: bold;
    margin-bottom: 30px;
    max-width: 450px;
    /* min-width: 700px; */
    @media screen and (max-width: 600px) {
      font-size: larger;
      margin-top: 10px;
      margin-bottom: 15px;
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

  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }

  @keyframes move {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(40px);
    }
    100% {
      transform: translateX(0);
    }
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
  const {
    playSlash,
    playMissed,
    playBlocked,
    stopBattle,
    stopBoss,
    playBGM,
    playWin,
    stopWin,
    playFail,
    stopFail,
    setPlaying,
    playingBattle,
    playingBoss,
    setPlayingBattle,
    setPlayingBoss,
  } = useSoundContext();

  const navigate = useNavigate();
  const { setTitle } = titleStore();
  const { updateQuest, resetQuest } = questStore();
  const { setQuestCompleted } = completedStore();
  const { category_name } = useParams();

  const [next, setNext] = useState(0);
  const [quest, setQuest] = useState(null);
  // drag & drop from dnd kit
  const [dropped, setDropped] = useState(null);
  // place monsters loaded into an array
  const [monsters, setMonsters] = useState([]);
  // You get three tries
  const [hitPoints, setHitPoints] = useState(3);
  const [blocking, setBlocking] = useState(true);
  // grab the current monster from the array
  // let isDragonQ = false;

  // Run check on mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/check", { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.status === 401) {
          setBlocking(false);
          navigate("/login", { replace: true });
        }
      });

    setQuestCompleted(false);
    console.log(completedStore.getState().questCompleted);
    setTitle("The Quest begins!");
    questFetch();

    // cleanup function
    return () => {
      setTitle("Welcome traveler!"); // reset to initial title
      setBlocking(true);
    };
  }, []);

  // sound effects
  const playSFX = (type) => {
    switch (type) {
      case "slash":
        playSlash();
        break;
      case "missed":
        playMissed();
        break;
      case "blocked":
        playBlocked();
        break;
    }
    console.log("playing sound effect");
  };

  //monster img shake effect
  const attackHit = () => {
    const monsterImg = document.querySelector(".monster-img");
    monsterImg.style.animation = "shake 0.3s";
    monsterImg.style.animationIterationCount = "1";

    monsterImg.addEventListener(
      "animationend",
      () => {
        monsterImg.style.animation = "";
      },
      { once: true }
    );
  };

  //monster img move effect
  const attackMissed = () => {
    const monsterImg = document.querySelector(".monster-img");
    monsterImg.style.animation = "move 0.6s";
    monsterImg.style.animationIterationCount = "1";

    monsterImg.addEventListener(
      "animationend",
      () => {
        monsterImg.style.animation = "";
      },
      { once: true }
    );
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
      shuffle(questResponse.data);
      const data = questResponse.data;
      const monsterData = monsterResponse.data;

      if (monsterData[0].enemy_name === "Dragon Queen") {
        for (let i = 0; i < 14; i++) {
          monsterData.push({ ...monsterData[0] });
        }
      }

      for (let i = 1; i < monsterData.length; i++) {
        if (monsterData[i].enemy_name === "Dragon Queen") {
          monsterData[i].exp_drop = 0;
        }
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
    }
  };

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
        stopBoss();
        stopBattle();
        playWin();
        setTimeout(() => {
          stopWin();
          if (playingBattle || playingBoss) {
            setPlayingBoss(false);
            setPlayingBattle(false);
            setPlaying(true);
            playBGM();
          }
        }, 4000);
      }, 2000);
    }
  }, [next]);

  return (
    <>
      <Prompt
        when={blocking}
        beforeConfirm={() => {
          resetQuest();
          if (playingBattle || playingBoss) {
            stopBattle();
            setPlayingBattle(false);
            stopBoss();
            setPlayingBoss(false);
            playBGM();
            setPlaying(true);
          }
          console.log(`You chose to leave. Your progress is now lost.`);
        }}
        beforeCancel={() => {
          console.log("You chose to remain and continue the quest.");
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
                      style={{ backgroundColor: "rgb(173 37 37)" }}
                      className=""
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

                {questStore.getState().hitPoints <= 0 ? (
                  <div className="d-flex justify-content-center gap-4 ms-4">
                    <h3 className="question">Quest Failed...</h3>
                  </div>
                ) : next < quest.length ? (
                  <article>
                    <div className="d-flex justify-content-center">
                      <h3 className="question">{quest[next].question}</h3>
                    </div>

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
      // if the answer is correct
      if (active.id === String(quest[next].correct_answer)) {
        attackHit();
        playSFX("slash");

        setTimeout(() => {
          const nextMonster = next + 1;
          setDropped(active.id);
          // control first if the next monster is the dragon queen
          // if it is, prevent any further exp drop after the first attack since the dragon queen appears 15 times
          // and we do not want to reward the player the same exp 15 times

          updateQuest(
            monsters[next].exp_drop,
            questStore.getState().hitPoints,
            monsters[next].enemy_name
          );

          // make ternary if the monster is or is not the dragon queen
          monsters[next].enemy_name === "Dragon Queen"
            ? appendToQuestLog(
                `Correct! You've struck the Dragon Queen!`,
                undefined,
                undefined,
                "green"
              )
            : appendToQuestLog(
                `Correct! A fine hit! You received ${monsters[next].exp_drop} exp`,
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
        }, 500);
      }

      // if the answer is wrong
      if (active.id !== String(quest[next].correct_answer)) {
        attackMissed();
        playSFX("missed");
        setTimeout(() => {
          let getHP = document.querySelectorAll(".hp");
          getHP[getHP.length - 1].remove();
          const newHitPoints = hitPoints - 1;
          setHitPoints(newHitPoints);
          setDropped(active.id);
          appendToQuestLog(
            `wrong answer! The attack missed! Hit Points left: ${newHitPoints}HP`,
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
                stopBattle();
                stopBoss();
                playFail();
                setTimeout(() => {
                  stopFail();
                  if (playingBattle || playingBoss) {
                    setPlayingBattle(false);
                    setPlayingBoss(false);
                    setPlaying(true);
                    playBGM();
                  }
                }, 4000);
              }, 2000);
            });
          }
        }, 500);
      }
    }
  }
};

export default ChosenQuests;
