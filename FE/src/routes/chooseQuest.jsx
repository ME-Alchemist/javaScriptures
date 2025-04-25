import { useState } from "react";
import styled from "styled-components";
import HtmlQuests from "./htmlQuests";
import CSSQuests from "./cssQuests";
import JSQuests from "./jsQuests";

const List = styled.ul`
  list-style-type: none;
  width: auto;
  padding: 0;
  margin: 0;
  :hover {
    cursor: pointer;
  }
`;

const ChooseQuest = () => {
  const [show, setShow] = useState(null);

  const handleList = (list) => {
    console.log(list);
    setShow(list);
    if (show === list) {
      setShow(null);
    }
  };

  return (
    <main>
      <section>
        <h1>Choose your quest</h1>
      </section>
      <section>
        <List>
          <li onClick={() => handleList("html")}>HTML</li>
          {show === "html" && <HtmlQuests />}
          <li onClick={() => handleList("css")}>CSS</li>
          {show === "css" && <CSSQuests />}
          <li onClick={() => handleList("js")}>JS</li>
          {show === "js" && <JSQuests />}
        </List>
      </section>
    </main>
  );
};

export default ChooseQuest;
