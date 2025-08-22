import { useForm } from "react-hook-form";
import { Col, Row, Form, Button, ToastContainer } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import AOS from "aos";

import { useState, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import { useNavigate, Link } from "react-router";

const StyleWrapper = styled.div`
  border: 3px solid black;
  background-color: #bdb76b66;
  font-size: x-large;
  margin: auto;
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
    color: #ffffff;
    text-shadow: 0px 0px 5px #ff1800;
  }
`;

export default function SignIn() {
  let navigate = useNavigate();
  const setUser = useState({
    username: "",
    email: "",
    passHash: "",
  });

  const [toast, setToast] = useState(false);
  const [toastColor, setToastColor] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const changeHandler = (e) => {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    window.scrollTo(0, 0);
  }, []);

  const pass = watch("passHash");
  const repeat = watch("repass");

  const onSubmit = (data) => {
    const form = document.getElementById("userForm");
    axios
      .post("http://localhost:3000/sign-up", data)
      .then((res) => {
        if (res.status === 201) {
          setToastColor("bg-success fs-5");
          setToastMessage("A new adventurer successfully registered!");
          setToast(true);
          console.log(res);
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setToastColor("bg-danger fs-5");
          setToastMessage("This email or username has been taken!");
          setToast(true);
          console.log(err);
        } else {
          setToastMessage("Something went wrong!");
          setToast(true);
          console.log(err);
        }
      });
    document.activeElement.blur();
    form.reset();
  };

  return (
    <>
      <div className="d-flex justify-content-center" data-aos="fade-zoom-in">
        <img
          data-aos-once="true"
          className="img-fluid"
          src="/images/decorations/dragonTopDeco.webp"
          alt="dragon"
          title="dragon"
          width={"420px"}
          height={"220px"}
        />
      </div>
      <StyleWrapper className="mb-5">
        <h1 style={{ textDecoration: "underline" }}>Sign up</h1>
        <Form
          autoComplete="off"
          id="userForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Col>
            <Form.Group className="mb-3" controlId="uname">
              <Form.Label>Username:</Form.Label>
              <Col>
                <Form.Control
                  name="username"
                  onChange={changeHandler}
                  type="input"
                  className="mx-auto"
                  placeholder="enter username"
                  {...register("username", {
                    required: true,
                    maxLength: 20,
                    minLength: 4,
                  })}
                  autoComplete="off"
                />
              </Col>
              {errors.username && (
                <span>
                  {errors.username.type === "required" &&
                    "Username is required"}
                  {errors.username.type === "minLength" &&
                    "Username must be between 4 to 20 characters long"}
                </span>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email:</Form.Label>
              <Col>
                <Form.Control
                  name="email"
                  onChange={changeHandler}
                  type="email"
                  className="mx-auto"
                  placeholder="enter email"
                  {...register("email", { required: true })}
                  autoComplete="off"
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
                  ref={pass}
                  name="passHash"
                  onChange={changeHandler}
                  type="password"
                  className="mx-auto mainPass"
                  placeholder="enter password"
                  {...register("passHash", {
                    required: true,
                    pattern:
                      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
                  })}
                  autoComplete="new-password"
                />
              </Col>
              {errors.passHash && (
                <span>
                  {errors.passHash.type === "required" &&
                    "Password is required"}
                  {errors.passHash.type === "pattern" &&
                    "Required: one uppercase letter, one number, one special character and 8 or more characters"}
                </span>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="repass">
              <Form.Label>Confirm password:</Form.Label>
              <Col>
                <Form.Control
                  ref={repeat}
                  name="repass"
                  onChange={changeHandler}
                  type="password"
                  className="mx-auto repeatPass"
                  placeholder="repeat password"
                  {...register("repass", {
                    required: true,
                    validate: (value) => value == watch("passHash"),
                  })}
                  autoComplete="new-password"
                />
              </Col>
              {errors.repass && (
                <span>
                  {errors.repass.type === "required" &&
                    "Repeat password is required"}
                  {errors.repass.type === "validate" &&
                    "Passwords are not matching!"}
                </span>
              )}
            </Form.Group>
          </Col>
          <Button type="submit" className="btn btn-dark btn-lg">
            Register
          </Button>
        </Form>
        <p className="mt-5">
          Already registered? login <Link to={"/login"}>here!</Link>
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
            delay={2500}
            autohide
          >
            <Toast.Header className={toastColor}>
              <strong className="me-auto">The Guild</strong>
              <small>{new Date().toLocaleString()}</small>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  );
}
