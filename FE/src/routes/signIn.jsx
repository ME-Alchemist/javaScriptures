import { useForm } from "react-hook-form";
import { Col, Row, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { useEffect } from "react";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    fetch("http://localhost:3000", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [errors]);

  return (
    <div>
      <h1>sign in page</h1>
      <StyleWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Col>
            <Form.Group className="mb-3" controlId="fname">
              <Form.Label>First name:</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  className="mx-auto"
                  placeholder="enter first name"
                  {...register("fname", { required: true })}
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
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="uname">
              <Form.Label>Username:</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  className="mx-auto"
                  placeholder="enter username"
                  {...register("uname", { required: true })}
                />
              </Col>
              {errors.uname && <span>Username is required</span>}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email:</Form.Label>
              <Col>
                <Form.Control
                  type="email"
                  className="mx-auto"
                  placeholder="enter email"
                  {...register("email", { required: true })}
                />
              </Col>
              {errors.email && <span>Last name is required</span>}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="pass">
              <Form.Label>Password:</Form.Label>
              <Col>
                <Form.Control
                  type="password"
                  className="mx-auto"
                  placeholder="enter password"
                  {...register("pass", { required: true })}
                />
              </Col>
              {errors.pass && <span>A password is required</span>}
            </Form.Group>
          </Col>
          <Button type="submit" className="btn btn-dark">
            Submit
          </Button>
        </Form>
      </StyleWrapper>
    </div>
  );
}
