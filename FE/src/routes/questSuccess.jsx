import styled from "styled-components";
import questStore from "../zustore/questStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import completedStore from "../zustore/questCompletedStore";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & h1 {
    font-weight: bolder;
    text-shadow: 2px 3px 12px white;
  }

  .eventBox {
    background-image: url("/images/backdrops/resultBG.webp");
    background-size: cover;
    width: 400px;
    height: 480px;
    border: 2px solid grey;
    border-radius: 15px;

    @media screen and (max-width: 768px) {
      /* all: unset; */
      height: 80px;
      width: 350px;
      display: none !important;

      /* height: 480px; */
    }

    @media screen and (max-width: 400px) {
      width: 300px;
      height: 80px;

      & img {
        height: 80%;
      }
    }
  }

  .resultBox {
    background-image: url("/images/backdrops/resultBG.webp");
    background-size: cover;
    width: 400px;
    height: 480px;
    border: 2px solid grey;
    border-radius: 15px;
    font-weight: bold;

    & p {
      margin-bottom: 0px;
      font-size: larger;
    }

    & ul {
      list-style: inside;

      & li {
        font-size: large;
      }
    }

    @media screen and (max-width: 995px) {
      width: 350px;
      height: 480px;
    }

    @media screen and (max-width: 400px) {
      width: 300px;
      height: 480px;

      .portrait {
        width: 120px !important;
        height: 120px !important;
      }
    }
  }
`;

const QuestSuccess = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { exp_gathered, hitPoints, monstersEncountered } = questStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const { category_name } = useParams();
  const { setQuestCompleted, questCompleted } = completedStore();

  useEffect(() => {
    console.log(completedStore.getState().questCompleted);

    // trying to navigate here manually or
    //attempting to the reload the page will navigate away
    if (!location.state?.fromQuest || questCompleted === true) {
      navigate("/main/404");
      return;
    }
    const combinedExp = exp_gathered + hitPoints * 10;
    setQuestCompleted(true);

    // Grab the score from the questStore,
    // display Results then perform a PATCH request on the users exp field
    axios
      .patch(
        `${API_URL}/user/questComplete`,
        {
          exp: combinedExp,
          category_name: category_name,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => {
        console.error("PATCH error:", err.response?.data || err.message);
        navigate("/main/404");
      });
  }, []);

  return (
    <StyledDiv>
      <h1>Quest Successful!</h1>

      <section className="d-flex flex-column flex-md-row gap-2 align-items-center justify-content-center">
        <section className="eventBox">
          <img
            src={`${import.meta.env.BASE_URL}images/Event/Success.webp`}
            alt="Success"
            title="Success!"
            style={{ height: "100%" }}
          />
        </section>
        <section className="resultBox">
          <h3 style={{ textDecoration: "underline", fontWeight: "bold" }}>
            Results
          </h3>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <div
              className="portrait"
              style={{
                width: "150px",
                height: "150px",
                border: "1px solid black",
                borderRadius: "15px",
                margin: "10px",
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}${user?.portrait}`}
                alt="portrait"
                title="portrait"
                width={"100%"}
                height={"100%"}
                style={{ borderRadius: "15px" }}
              />
            </div>
            <div>
              <p>Hero: {user?.username}</p>
              <p>Vocation: {user?.vocation}</p>
              <p>Level: {user?.level}</p>
              <p>Exp: {user?.totaltExp}</p>
            </div>
          </div>
          <hr
            style={{
              border: "2px solid rgba(0, 0, 0, 0.36)",
              opacity: "unset",
              margin: "0 0 10px 0",
            }}
          />
          <div className="questResults">
            <ul>
              <li># of times repeated: {user?.timesCompleted ?? 0}</li>
              <li>Hit Points remaining: {hitPoints}</li>
              <li>
                Remaining HP bonus exp:{" "}
                <span style={{ color: "green", fontWeight: "bold" }}>{`+${
                  hitPoints * 10
                }`}</span>
              </li>
              <li>Total Exp Gained: {user?.gainedExp}</li>
            </ul>
            <hr
              style={{
                border: "2px solid #0000005c",
                opacity: "unset",
                margin: "0 0 10px 0",
              }}
            />
            <p style={{ textDecoration: "underline" }}>Monsters encountered:</p>
            <div style={{ maxHeight: "80px", overflowY: "auto" }}>
              {monstersEncountered[0] === "Dragon Queen" ? (
                <p>{monstersEncountered[0]}</p>
              ) : (
                monstersEncountered.map((m, index) => {
                  return <p key={index}>{m}</p>;
                })
              )}
            </div>
          </div>
        </section>
      </section>
    </StyledDiv>
  );
};

export default QuestSuccess;
