import styled from "styled-components";
import useStore from "../zustore/store";
// import { useEffect } from "react";
// import { useNavigate } from "react-router";
// import axios from "axios";

const StyledWrapper = styled.div`
  width: auto;
  height: auto;
  border: 1px solid black;
  flex-grow: 1;
`;

const ChosenQuests = () => {
  const { count, decrement, increment } = useStore();

  return (
    <StyledWrapper>
      <h1>Chosen Quests</h1>

      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </StyledWrapper>
  );
};

export default ChosenQuests;
