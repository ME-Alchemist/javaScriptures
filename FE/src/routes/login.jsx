import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { Col, Row, Form, Button, ToastContainer } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router";
// import { useState } from "react";

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

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const form = document.getElementById("userForm");
    console.log(data);
    // if (pass.value !== repeat.value) {
    //   alert("Password and repeated password are not matching!");
    //   return;
    // }
    axios
      .post("http://localhost:3000/login", data, { withCredentials: true })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          // setToast(true);
          console.log(res);
          alert("Login successful");
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      })
      .catch((err) => console.log(err));

    form.reset();
  };

  return (
    <div>
      <h1>login page</h1>

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
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email:</Form.Label>
              <Col>
                <Form.Control
                  name="email"
                  // onChange={changeHandler}
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
                  name="passHash"
                  // onChange={changeHandler}
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
          <Button type="submit" className="btn btn-dark">
            Submit
          </Button>
        </Form>
      </StyleWrapper>

      <p>
        No account? sign up <Link to={"/sign-up"}>here!</Link>
      </p>
    </div>
  );
}
