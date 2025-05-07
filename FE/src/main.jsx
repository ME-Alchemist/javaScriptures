import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "normalize.css";
import App from "./routes/App.jsx";
import Login from "./routes/login.jsx";
import Register from "./routes/signUp.jsx";
import FourOhFour from "./routes/404.jsx";
import Quests from "./routes/chooseQuest.jsx";
import MainPage from "./routes/mainPage.jsx";
import LoadQuest from "./routes/loadQuest.jsx";
import Status from "./routes/status.jsx";
import ChooseVocation from "./routes/chooseVocation.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Routes outside of main, before login */}
        <Route index path="/" element={<App />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="vocation" element={<ChooseVocation />} />
        {/* <Route path="*" element={<FourOhFour />} /> */}

        {/* Routes after successful login, header and footer should be rendered*/}
        <Route path="/main" element={<MainPage />}>
          {/* <Route path="" element={null} /> */}
          <Route path="quests" element={<Quests />} />
          <Route path="questStart">
            <Route path="html/:difficulty" element={<LoadQuest />} />
            <Route path="css/:difficulty" element={<LoadQuest />} />
            <Route path="js/:difficulty" element={<LoadQuest />} />
          </Route>
          <Route path="404" element={<FourOhFour />} />
          <Route path="stats" element={<Status />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
