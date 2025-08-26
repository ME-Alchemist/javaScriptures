import axios from "axios";

// import { useSoundContext } from "../components/soundContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Logout from "../components/logout";
import Delete from "../components/delete";
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
    height: 530px;
    width: 290px;
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

  .interpolated {
    max-width: 200px;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .interpolated::-webkit-scrollbar {
    display: none;
  }

  .userAvatar {
    filter: drop-shadow(rgb(0, 0, 0) 10px 5px 5px);
  }

  .titleText,
  .paragraphBreak {
    text-decoration: underline;
  }

  .paragraphBreak {
    margin-bottom: 0px;
  }

  @media screen and (max-width: 768px) {
    .userAvatar {
      display: none;
    }

    .userPortrait {
      display: block;
      height: 140px;
      width: 140px;
    }

    .userInfo {
      font-size: large;
      height: 440px;
      width: 270px;
    }
  }

  .fade-in-img {
    opacity: 0;
    transition: opacity 0.3s ease-in;
  }

  .fade-in-img.loaded {
    opacity: 1;
  }

  @media screen and (max-width: 325px) {
    .userPortrait {
      height: 120px;
      width: 120px;
    }

    .userInfo {
      font-size: medium;
      height: 400px;
      width: 270px;
    }
  }
`;

const Status = () => {
  const API_URL = import.meta.env.VITE_API_URL;
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
      .get(`${API_URL}/api/stats`, { withCredentials: true })
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
        <StyledSection className="d-flex flex-column flex-md-row mx-auto align-items-center gap-2">
          <article className="userPortrait">
            <img
              src={`${import.meta.env.BASE_URL}${vocation_portrait}`}
              alt="userPortrait"
              title="userPortrait"
              width="100%"
              height="100%"
            />
          </article>
          <article className="userInfo flex flex-column align-items-center">
            <h1 className="fw-bold titleText">Stats</h1>
            <p className="paragraphBreak ">Username:</p>
            <span className="interpolated">{username}</span>
            <p className="paragraphBreak mt-2">Email:</p>
            <span className="interpolated">{email}</span>
            <p className="paragraphBreak mt-2">Level:</p>
            <span className="interpolated">{level}</span>
            <p className="paragraphBreak mt-2">Experience:</p>
            <span className="interpolated">{exp}</span>
            <p className="paragraphBreak mt-2">Vocation:</p>
            <span className="interpolated">{vocation}</span>
            <div className="gap-2 d-flex flex-row">
              <Logout />
              <Delete />
            </div>
          </article>
          <article>
            {isLoading ? (
              <Spinner />
            ) : (
              <img
                className="img-fluid userAvatar"
                src={`${import.meta.env.BASE_URL}${vocation_img}`}
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
