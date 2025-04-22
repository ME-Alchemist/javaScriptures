import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "normalize.css";
import App from "./routes/App.jsx";
import Login from "./routes/login.jsx";
import Register from "./routes/signUp.jsx";
import FourOhFour from "./routes/404.jsx";
import Header from "../src/components/header";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="sign-up" element={<Register />} />
        <Route path="sign-in" element={<Login />} />
        {/* <Route path="main" element={<Welcome />} /> */}
        <Route path="/" element={<Header />}>
          <Route path="/404" element={<FourOhFour />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
