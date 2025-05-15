import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";

// import "normalize.css";
// import App from "./routes/App.jsx";
const App = lazy(() => import("./routes/App.jsx"));

import Login from "./routes/login.jsx";
import Register from "./routes/signUp.jsx";

// const Login = lazy(() => import("./routes/login.jsx"));
// const Register = lazy(() => import("./routes/signUp.jsx"));

// import FourOhFour from "./routes/404.jsx";
const NotFound = lazy(() => import("./routes/404.jsx"));

import QuestSuccess from "./routes/questSuccess.jsx";
import QuestFailed from "./routes/questFailed.jsx";
import Quests from "./routes/chooseQuest.jsx";
import MainPage from "./routes/mainPage.jsx";
import LoadQuest from "./routes/loadQuest.jsx";
import Status from "./routes/status.jsx";
import ChooseVocation from "./routes/chooseVocation.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "vocation",
    element: <ChooseVocation />,
  },
  {
    path: "/main",
    element: <MainPage />,
    children: [
      {
        path: "quests",
        element: <Quests />,
        children: [],
      },
      {
        path: "questStart/html/:difficulty",
        element: <LoadQuest />,
      },
      {
        path: "questStart/css/:difficulty",
        element: <LoadQuest />,
      },
      {
        path: "questStart/js/:difficulty",
        element: <LoadQuest />,
      },
      {
        path: "results/success",
        element: <QuestSuccess />,
      },
      {
        path: "results/failed",
        element: <QuestFailed />,
      },
      {
        path: "stats",
        element: <Status />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
