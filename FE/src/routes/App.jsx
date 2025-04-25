// import { useState } from "react";
// import reactLogo from "../assets/react.svg";
// import viteLogo from "/vite.svg";
import "../App.css";
import { Link } from "react-router";

function App() {
  return (
    <>
      <h1>Welcome to the main page</h1>
      <h2>
        press <Link to="/login">here</Link> for login
      </h2>
      <h2>
        press <Link to="/register">here</Link> for register
      </h2>
    </>
  );
}

export default App;
