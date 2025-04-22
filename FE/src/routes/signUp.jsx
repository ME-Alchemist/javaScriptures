import { useForm } from "react-hook-form";
import { Col, Row, Form, Button, ToastContainer } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import { useNavigate } from "react-router";

const StyleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;

  .form-control {
    max-width: 250px;
  }

  & span {
    color: red;
    text-shadow: 1px 1px 5px blue;
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

  const changeHandler = (e) => {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
    console.log(e.target.value);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const pass = watch("passHash");
  const repeat = watch("repass");

  const onSubmit = (data) => {
    const form = document.getElementById("userForm");
    console.log(data);
    if (pass !== repeat) {
      alert("Password and repeated password are not matching!");
      return;
    }
    axios
      .post("http://localhost:3000/sign-up", data)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setToast(true);
          console.log(res);
          setTimeout(() => {
            navigate("/sign-in");
          }, 1500);
        }
      })
      .catch((err) => console.log(err));

    form.reset();
  };

  // useEffect(() => {
  //   fetch("http://localhost:3000", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, [errors]);

  return (
    <div>
      <h1>Sign up page</h1>
      <StyleWrapper>
        <Form
          autoComplete="off"
          id="userForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* <Col>
            <Form.Group className="mb-3" controlId="fname">
              <Form.Label>First name:</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  className="mx-auto"
                  placeholder="enter first name"
                  {...register("fname", { required: true })}
                  onChange={(e) => setFname(e.target.value)}
                />
              </Col>
              {errors.fname && <span>First name is required</span>}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="lname">
              <Form.Label>Last name:</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  className="mx-auto"
                  placeholder="enter last name"
                  {...register("lname", { required: true })}
                />
              </Col>
              {errors.lname && <span>Last name is required</span>}
            </Form.Group>
          </Col> */}
          <Col>
            <Form.Group className="mb-3" controlId="uname">
              <Form.Label>Username:</Form.Label>
              <Col>
                <Form.Control
                  name="username"
                  onChange={changeHandler}
                  type="text"
                  className="mx-auto"
                  placeholder="enter username"
                  {...register("username", { required: true })}
                  autoComplete="off"
                />
              </Col>
              {errors.username && <span>Username is required</span>}
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
                  onInput={(e) => console.log(e.target.value)}
                  placeholder="enter password"
                  {...register("passHash", { required: true })}
                  autoComplete="new-password"
                />
              </Col>
              {errors.repass && <span>A password is required</span>}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="repass">
              <Form.Label>Repeat password:</Form.Label>
              <Col>
                <Form.Control
                  ref={repeat}
                  name="repass"
                  onChange={changeHandler}
                  type="password"
                  className="mx-auto repeatPass"
                  placeholder="repeat password"
                  {...register("repass", { required: true })}
                  autoComplete="new-password"
                />
              </Col>
              {errors.repass && <span>Please repeat the password</span>}
            </Form.Group>
          </Col>
          <Button type="submit" className="btn btn-dark">
            Submit
          </Button>
        </Form>
      </StyleWrapper>
      <ToastContainer position={"bottom-end"}>
        <Toast
          onClose={() => setToast(false)}
          show={toast}
          delay={2500}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Jsdungeons</strong>
            <small>{new Date().toLocaleString()}</small>
          </Toast.Header>
          <Toast.Body>Woohoo, user successfully registered!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
