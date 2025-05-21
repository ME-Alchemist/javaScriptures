import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import { Spinner } from "react-bootstrap";
import styled from "styled-components";
import AOS from "aos";
import titleStore from "../zustore/titleStore";
import UserDetails from "../zustore/userStore";
import Spinner from "../components/spinner";

const StyledSection = styled.section`
  .userInfo {
    font-size: x-large;
    background-color: #ff843a6b;
    text-shadow: azure 2px 2px 2px;
    border: 1px solid black;
    height: 400px;
    width: 240px;
    text-align: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 15px;
    background-image: url("/images/backdrops/poseBG.webp");
    background-size: cover;
  }

  .userPortrait {
    display: none;
    border: 2px solid black;
    height: 180px;
    width: 180px;
    margin-top: 25px;
    border-radius: 15px;
    & img {
      border-radius: 15px;
    }
  }

  @media screen and (max-width: 768px) {
    .userAvatar {
      display: none;
    }

    .userPortrait {
      display: block;
    }
  }

  .fade-in-img {
    opacity: 0;
    transition: opacity 0.3s ease-in;
  }

  .fade-in-img.loaded {
    opacity: 1;
  }
`;

const Status = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { setTitle } = titleStore();

  const {
    level,
    exp,
    vocation,
    username,
    email,
    vocation_img,
    vocation_portrait,
  } = UserDetails();

  useEffect(() => {
    setTitle("Status");

    const img = new Image();
    img.src = { vocation_img };
    img.onload = () => {
      setIsLoading(false);
    };

    AOS.init({
      duration: 1000,
      once: true,
    });

    axios
      .get("http://localhost:3000/stats", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        UserDetails.setState(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("invalid token", err);
        UserDetails.getState().reset();
        navigate("/login", { replace: true });
      });

    return () => {
      setTitle("Welcome traveler!");
    };
  }, [navigate]);

  return (
    <>
      {vocation_img ? (
        <StyledSection className="d-flex flex-column flex-md-row mx-auto align-items-center gap-5">
          <article className="userPortrait">
            <img
              src={vocation_portrait}
              alt="userPortrait"
              title="userPortrait"
              width="100%"
              height="100%"
            />
          </article>
          <article className="userInfo">
            <h1 style={{ textDecoration: "underline" }}>Stats</h1>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>Level: {level}</p>
            <p>Experience: {exp}</p>
            <p>Vocation: {vocation}</p>
          </article>
          <article
          // style={{
          //   backgroundImage: `url("/images/backdrops/userFrame.webp")`,
          //   backgroundRepeat: "no-repeat",
          //   backgroundSize: "contain",
          // }}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <img
                className="img-fluid userAvatar"
                src={vocation_img}
                alt={vocation}
                width={400}
                height={600}
              />
            )}
          </article>
        </StyledSection>
      ) : (
        <Spinner
          style={{ zIndex: "5" }}
          size="lg"
          animation="border"
          className="mx-auto"
        />
      )}
    </>
  );
};

export default Status;
