import userStore from "../zustore/userStore";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Status = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/stats", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        userStore.setState(res.data);
      })
      .catch((err) => {
        console.log("invalid token", err);
        userStore.setState({});
        clearInterval();
        navigate("/login", { replace: true });
      });

    // axios.get("http://localhost:3000/user/1").then((res) => {
    //   console.log(res.data);
    //   userStore.setState(res.data);
    // });
  }, [navigate]);

  const { user_id, level, exp, vocation, username, email } = userStore();

  return (
    <div>
      <h1>Stats</h1>
      <p>User ID: {user_id}</p>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Level: {level}</p>
      <p>Experience: {exp}</p>
      <p>Vocation: {vocation}</p>
    </div>
  );
};

export default Status;
