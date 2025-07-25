import { useEffect, useState } from "react";
// import jsonfile from "../data.json";
import titleStore from "../zustore/titleStore";
import styled from "styled-components";
import Spinner from "../components/spinner";
import axios from "axios";
import { useNavigate } from "react-router";

const StyledSection = styled.section`
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  flex-direction: column;

  .Container {
    border: 2px solid black;
    border-radius: 15px;
    border-style: inset;
    margin: 10px;
  }

  .figure {
    color: white;
    text-shadow: 2px 4px 3px black;
  }

  & p {
    padding: 10px;
  }

  @media screen and (max-width: 500px) {
    & p {
      font-size: medium !important;
    }
  }
`;

const Welcome = () => {
  const navigate = useNavigate();
  const { setTitle } = titleStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    axios.get("http://localhost:3000/check", { withCredentials: true }).then((response) => {
      console.log("the response:", response);
      
          setTitle("Home");
      
          const img = new Image();
          img.src = "/images/decorations/guildDeco.webp";
          img.onload = () => {
            setIsLoading(false);
          };
      
          return () => {
            setTitle("Welcome traveler");
          };

    }) .catch((err) => {
      console.log(err);
      navigate("/login", { replace: true });    
    });
  }, []);

  return (
    <>
      <h1 style={{ fontWeight: "bolder", textShadow: "2px 3px 12px white" }}>
        Ready to begin your quest?
      </h1>
      <StyledSection
        className="d-flex align-items-center justify-content-center mx-auto"
        style={{ maxWidth: "650px", width: "100%" }}
      >
        <div className="Container bg-dark bg-opacity-50">
          <p
            style={{
              fontSize: "larger",
              fontWeight: "bold",
              color: "#fffefe",
              textShadow: "2px 4px 3px black",
            }}
          >
            Welcome back, traveler. The realms remember your footsteps. Your
            journey through the lands of Code continues — quests await, and
            ancient knowledge lies hidden within scrolls yet unopened. Whether
            you wield the Runes of Structure, the Cloaks of Style, or the
            Scrolls of Behavior, your path is your own to carve. Choose your
            next trial wisely, and may your mind be as sharp as the sword of a
            High Elf. The Guild stands with you.
          </p>
          <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center">
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <q className="figure flex-grow-1">
                  Guildenstern, The Guildmaster
                </q>
                <img
                  className="img-fluid rounded-end-4"
                  src="/images/decorations/guildDeco.webp"
                  alt="Guildmaster"
                  title="Guildenstern"
                  width={"250px"}
                  style={{ float: "right" }}
                />
              </>
            )}
          </div>
        </div>
      </StyledSection>
    </>
  );
};

export default Welcome;
