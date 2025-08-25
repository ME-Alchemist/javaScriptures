import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { Col, Form, Button, ToastContainer } from "react-bootstrap";
import { useSoundContext } from "../components/soundContext";
import styled from "styled-components";
import Toast from "react-bootstrap/Toast";
import axios from "axios";
import AOS from "aos";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import sessiontimer from "../zustore/sessionTimer";

const StyleWrapper = styled.div`
  font-size: x-large;
  border: 3px solid black;
  background-color: #bdb76b66;
  margin: 0 auto auto auto;
  padding: 15px;
  min-width: 154px;
  max-width: 408px;
  display: flex;
  flex-direction: column;
  width: 90%;
  border-radius: 15px;
  text-align: center;

  .form-control {
    max-width: 250px;
  }

  & span {
    color: red;
    text-shadow: 1px 1px 5px blue;
  }
`;

const Login = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { resetCountdown } = sessiontimer();

  const { stopBGM, stopBattle, setPlaying, setPlayingBattle, setMute } =
    useSoundContext();
  const navigate = useNavigate();

  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    resetCountdown();
    stopBGM();
    stopBattle();
    setPlaying(false);
    setPlayingBattle(false);
    setMute(false);
    AOS.init({
      duration: 1000,
      once: true,
    });

    window.scrollTo(0, 0);
  }, []);

  const onSubmit = (data) => {
    // change cursor to wait
    document.body.style.cursor = "wait";
    const form = document.getElementById("userForm");
    axios
      .post(`${API_URL}/login`, data, { withCredentials: true })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          if (res.data.user.chosenVocation === 0) {
            {
              document.body.style.cursor = "auto";
              alert("You must select a vocation first");
              navigate("/vocation");
              return;
            }
          }
          document.body.style.cursor = "auto";
          setToastColor("bg-success fs-5");
          setToastMessage("Welcome back " + res.data.user.username + "!");
          setToast(true);
          setTimeout(() => {
            navigate("/main/home", { replace: true });
          }, 2500);
          form.reset();
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            setToastColor("bg-danger fs-5");
            setToastMessage("Wrong email or password!");
            setToast(true);
            console.log(err);
          } else if (err.response.status === 404) {
            setToastColor("bg-danger fs-5");
            setToastMessage("Adventurer not found!");
            setToast(true);
            console.log(err);
          }
        } else {
          setToastColor("bg-danger fs-5");
          setToastMessage("Something went wrong!");
          setToast(true);
          console.log(err);
        }
      });
  };

  return (
    <>
      <div
        className="d-flex justify-content-center mt-2"
        data-aos="fade-zoom-in"
      >
        <img
          data-aos-once="true"
          className="img-fluid"
          src={`${import.meta.env.BASE_URL}images/decorations/lichTopDeco.webp`}
          alt="lich"
          title="Lich"
          width={"470px"}
          height={"205px"}
        />
      </div>
      <StyleWrapper>
        <h1 style={{ textDecoration: "underline" }}>login</h1>
        <Form
          autoComplete="off"
          id="userForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Col>
                <Form.Control
                  name="email"
                  type="email"
                  className="mx-auto"
                  placeholder="enter email"
                  {...register("email", { required: true })}
                  autoComplete="email"
                />
              </Col>
              {errors.email && <span>Email is required</span>}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="pass">
              <Form.Label>Password:</Form.Label>
              <Col>
                <Form.Control
                  name="passHash"
                  type="password"
                  className="mx-auto mainPass"
                  placeholder="enter password"
                  {...register("passHash", { required: true })}
                  autoComplete="new-password"
                />
              </Col>
              {errors.repass && <span>A password is required</span>}
            </Form.Group>
          </Col>
          <Button type="submit" className="btn btn-dark btn-lg">
            Login
          </Button>
        </Form>
        <p className="mt-5">
          No account? sign up <Link to={"/register"}>here!</Link>
        </p>
        <p>
          Back to the <Link to={"/"}>main page</Link>
        </p>
      </StyleWrapper>
      {toast && (
        <ToastContainer position={"top-center"}>
          <Toast
            onClose={() => setToast(false)}
            show={toast}
            delay={2000}
            autohide
          >
            <Toast.Header className={toastColor}>
              <strong className="me-auto">The Guild</strong>
              <small>{new Date().toLocaleString()}</small>
            </Toast.Header>
            <Toast.Body className="fs-5">{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  );
};

export default Login;
