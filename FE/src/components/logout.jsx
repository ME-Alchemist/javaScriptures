import axios from "axios";
import UserDetails from "../zustore/userStore";
import { useSoundContext } from "../components/soundContext";
import { useNavigate } from "react-router";

const LogoutFunc = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { pauseBGM, pauseBattle, pauseBoss } = useSoundContext();
  const navigate = useNavigate();

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        axios
          .post(
            `${API_URL}/api/logout`,
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
    <button className="btn btn-dark btn-primary mb-2 mt-4" onClick={logout}>
      Logout
    </button>
  );
};

export default LogoutFunc;
