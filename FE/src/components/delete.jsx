import axios from "axios";
import UserDetails from "../zustore/userStore";
import { useSoundContext } from "../components/soundContext";
import { useNavigate } from "react-router";

const DelFunc = () => {
  const { pauseBGM, pauseBattle, pauseBoss } = useSoundContext();
  const navigate = useNavigate();

  const accDel = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone!"
      )
    ) {
      try {
        axios
          .delete("http://localhost:3000/delete", {
            withCredentials: true,
          })
          .then((response) => {
            if (response.status === 200 && response.status < 300) {
              pauseBGM();
              pauseBattle();
              pauseBoss();
              UserDetails.getState().reset();
              navigate("/login", { replace: true });
            } else {
              console.log("error deleting user account", response.status);
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
    <button className="btn btn-danger btn-primary mb-2 mt-4" onClick={accDel}>
      Delete account
    </button>
  );
};

export default DelFunc;
