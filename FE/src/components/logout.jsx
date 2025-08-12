import axios from "axios";
import UserDetails from "../zustore/userStore";
import { useSoundContext } from "../components/soundContext";
// import { useState } from "react";
import { useNavigate } from "react-router";

const LogoutFunc = () => {
  //   const {
  //     level,
  //     exp,
  //     vocation,
  //     username,
  //     email,
  //     vocation_img,
  //     vocation_portrait,
  //   } = UserDetails();

  const { pauseBGM, pauseBattle, pauseBoss } = useSoundContext();
  const navigate = useNavigate();

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        axios
          .post(
            "http://localhost:3000/logout",
            {},
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            if (response.status === 200 && response.status < 300) {
              pauseBGM();
              pauseBattle();
              pauseBoss();
              UserDetails.getState().reset();
              navigate("/login", { replace: true });
            } else {
              console.log("error logging out", response.status);
              pauseBGM();
              pauseBattle();
              pauseBoss();
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <button className="btn btn-dark btn-lg btn btn-primary" onClick={logout}>
      Logout
    </button>
  );
};

export default LogoutFunc;
