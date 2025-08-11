import axios from "axios";
import { useSoundContext } from "../components/soundContext";
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

  .paragraphBreak {
    word-break: break-all;
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
    const { pauseBGM, pauseBattle } = useSoundContext();
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

    const logout = async () => {
    if(window.confirm("Are you sure you want to logout?")) {
      try {
        const response = await axios.post(
          "http://localhost:3000/logout",
          {},
          {
            withCredentials: true,
          }
        );
  
        if (response.status === 200 && response.status < 300) {
          pauseBGM();
          pauseBattle();
          UserDetails.getState().reset();
          navigate("/login", { replace: true });
        } else {
          console.log("error logging out", response.status);
          pauseBGM();
          pauseBattle();
        }
      } catch (err) {
        console.log(err);
      }

    }
  };

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
          <article className="userInfo flex flex-column align-items-center">
            {/* <h1 style={{ textDecoration: "underline" }}>Stats</h1> */}
            <p className="paragraphBreak">Username: {username}</p>
            <p className="paragraphBreak">Email: {email}</p>
            <p>Level: {level}</p>
            <p className="paragraphBreak">Experience: {exp}</p>
            <p className="paragraphBreak">Vocation: {vocation}</p>
            <button className="btn btn-dark btn-lg btn btn-primary" onClick={logout}>Logout</button>
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
