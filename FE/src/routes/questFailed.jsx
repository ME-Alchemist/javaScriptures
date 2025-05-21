import styled from "styled-components";
import questStore from "../zustore/questStore";
import axios from "axios";
import { useEffect, useState } from "react";

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
    }
  }
`;

const QuestFailed = () => {
  const { hitPoints, monstersEncountered } = questStore();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // const combinedExp = exp_gathered + hitPoints * 10;
    // Grab the score from the questStore,
    // display Results then perform a PATCH request on the users exp field

    axios
      .get("http://localhost:3000/stats", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setUser(res.data);
      });
  }, []);

  return (
    <StyledDiv>
      <h1>Quest Failed..</h1>

      <section className="d-flex flex-column flex-md-row gap-2 align-items-center justify-content-center">
        <section className="eventBox d-flex align-items-center justify-content-center">
          <img
            src="/images/Event/Failure.webp"
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
                src={user?.vocation_portrait}
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
              <p>Exp: {user?.exp}</p>
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
              <li>Hit Points remaining: {hitPoints * 0}</li>
              <li>
                Remaining HP bonus exp:{" "}
                <span style={{ color: "red", fontWeight: "bold" }}>{`+${
                  hitPoints * 0
                }`}</span>
              </li>
              <li>Total Exp Gained: 0</li>
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
              {monstersEncountered.map((m, index) => {
                return <p key={index}>{m}</p>;
              })}
            </div>
          </div>
        </section>
      </section>
    </StyledDiv>
  );
};

export default QuestFailed;
