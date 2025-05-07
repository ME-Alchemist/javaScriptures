import UserDetails from "../zustore/userStore";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Spinner } from "react-bootstrap";
import titleStore from "../zustore/titleStore";

const Status = () => {
  const navigate = useNavigate();
  const { setTitle } = titleStore();

  useEffect(() => {
    setTitle("Status");
    axios
      .get("http://localhost:3000/stats", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        UserDetails.setState(res.data);
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

  const { user_id, level, exp, vocation, username, email, vocation_img } =
    UserDetails();

  return (
    <>
      <h1>Stats</h1>
      {vocation_img ? (
        <section className="d-flex flex-column flex-md-row mx-auto align-items-center gap-5">
          <article>
            <p>User ID: {user_id}</p>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>Level: {level}</p>
            <p>Experience: {exp}</p>
            <p>Vocation: {vocation}</p>
          </article>
          <article>
            <img
              className="img-fluid"
              style={{
                boxShadow: "5px 3px 3px #7F513E, 1px 1px 15px #7F513E",
                borderRadius: "170px",
              }}
              src={vocation_img}
              alt={vocation}
              width={300}
              height={500}
            />
          </article>
        </section>
      ) : (
        <Spinner size="lg" animation="border" className="mx-auto" />
      )}
    </>
  );
};

export default Status;
