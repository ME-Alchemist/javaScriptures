import styled from "styled-components";
import useStore from "../zustore/store";
import userStore from "../zustore/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const StyledWrapper = styled.div`
  width: auto;
  height: auto;
  border: 1px solid black;
  flex-grow: 1;
`;

const ChosenQuests = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/stats", { withCredentials: true })
      .then((res) => {
        console.log(res);
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
  }, []);

  const { user_id, level_id, exp, vocation_id, username, email } = userStore();
  const { count, decrement, increment } = useStore();

  return (
    <StyledWrapper>
      <h1>Chosen Quests</h1>

      <div>
        <p className="uid">{user_id}</p>
        <p className="pid">{level_id}</p>
        <p className="exp">{exp}</p>
        <p className="vid">{vocation_id}</p>
        <p className="uname">{username}</p>
        <p className="email">{email}</p>
      </div>

      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </StyledWrapper>
  );
};

export default ChosenQuests;
