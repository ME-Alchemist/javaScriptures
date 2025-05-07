import styled from "styled-components";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { DndContext } from "@dnd-kit/core";
import titleStore from "../zustore/titleStore";
import questStore from "../zustore/questStore";
import Draggable from "../components/DnD kit/Draggable";
import Droppable from "../components/DnD kit/Droppable";
import Header from "../components/header";

// import { useEffect } from "react";
// import { useNavigate } from "react-router";

const StyledWrapper = styled.section`
  /* width: auto;
  height: auto; */
  /* border: 1px solid black; */
  /* flex-grow: 1; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

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
    width: 300px;
    height: 450px;
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

const ChosenQuests = () => {
  const navigate = useNavigate();
  const { setTitle } = titleStore();
  const { addExp, resetQuest } = questStore();
  const { difficulty } = useParams();
  // maybe these states could be placed in a object
  const [next, setNext] = useState(0);
  const [quest, setQuest] = useState(null);
  // drag & drop from dnd kit
  const [dropped, setDropped] = useState(null);
  // place monster loaded into an array
  const [monsters, setMonsters] = useState(null);
  // const [loading, setLoading] = useState(true);
  // You get three tries
  const [hitPoints, setHitPoints] = useState(3);
  // const draggable = <Draggable id="draggable">Go ahead, drag me.</Draggable>;

  const appendToQuestLog = async (text) => {
    try {
      let i = 0;
      let txt = text;
      let speed = 20;
      const para = document.createElement("p");
      const questLog = document.querySelector(".questProgress");
      questLog.appendChild(para);

      const typeWriter = () => {
        if (i < txt.length) {
          para.innerHTML += txt.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
        }
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

  const questFetch = async () => {
    try {
      const questResponse = await axios.get(
        `http://localhost:3000/quests/html/${difficulty}`
      );
      const monsterResponse = await axios.get(
        `http://localhost:3000/monsters/${difficulty}`
      );
      const data = await questResponse.data;
      const monsterData = await monsterResponse.data;
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

  const nextQuestion = () => {
    if (next < quest.length) {
      setNext(next + 1);
      setDropped(null);
      appendToQuestLog(
        `The ${monsters[next].enemy_name} asks: ${quest[next].question}`
      );
      console.log(quest[next]);
      console.log(next);
    } else {
      // alert("No more questions!");
      // return;
      // setNext(0);
    }
  };

  const reload = () => {
    setNext(0);
    setHitPoints(3);
  };

  useEffect(() => {
    setTitle("The Quest begins!");
    questFetch();

    return () => {
      setTitle("Welcome traveler!"); // reset to initial title
      resetQuest();
    };
  }, []);

  // const { count, decrement, increment } = useStore();

  Header.title = `"Loading"`;

  return (
    <>
      {quest === null ? (
        <Spinner
          className="d-flex mx-auto mt-auto"
          size="5"
          animation="border"
        />
      ) : quest && next < quest.length ? (
        <>
          <DndContext onDragEnd={handleDragEnd}>
            {/* <button onClick={nextQuestion}>Next</button> */}
            <StyledWrapper className="">
              <article className="questLog">
                <h3 className="text-decoration-underline fw-bold">
                  {quest[next].category.category_name}
                </h3>
                <p>Quest log:</p>
                <hr
                  style={{ border: "2px solid darkgray", opacity: "unset" }}
                />
                <aside className="questProgress"></aside>
              </article>
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
                  <Draggable id="a">{quest[next].answer_a}</Draggable>
                  <Draggable id="b">{quest[next].answer_b}</Draggable>
                  <Draggable id="c">{quest[next].answer_c}</Draggable>
                  <p>{quest[next].correct_answer}</p>
                </div>
              </article>
            </StyledWrapper>
          </DndContext>
        </>
      ) : (
        <>
          <h1>No more questions!</h1>
          <button onClick={() => reload()}>Reload</button>
        </>
      )}
    </>
  );

  function handleDragEnd({ active, over }) {
    if (over) {
      console.log(
        `the answer "${active.id}" was dropped over the ${over.id} element`
      );
      if (active.id === String(quest[next].correct_answer)) {
        console.log(typeof quest[next].correct_answer, active.id);
        setDropped(active.id);
        addExp(monsters[next].exp_drop);
        appendToQuestLog(
          `Correct! You received ${monsters[next].exp_drop} exp`
        );
        nextQuestion();
        if (next === quest.length - 1) {
          alert(
            `No more questions! Total exp gathered: ${
              questStore.getState().exp_gathered
            } exp`
          );
          reload();
        }
      } else {
        let newHitpoints = hitPoints - 1;
        setHitPoints(newHitpoints);
        setDropped(active.id);
        alert(`wrong answer! You have ${newHitpoints} tries left`);
        if (newHitpoints === 0) {
          alert("No more tries!");
          navigate("/main/quests", { replace: true });
        }
      }
    }
  }
};

export default ChosenQuests;
