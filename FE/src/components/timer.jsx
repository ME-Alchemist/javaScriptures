import { useEffect, useState } from "react";
import sessiontimer from "../zustore/sessionTimer";

const TimerComponent = () => {
  const { countdown, setCountdown } = sessiontimer();
  const [timer, setTimer] = useState(countdown);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer - 1);
      setCountdown(timer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div>
      <p className="fs-4 timer">
        <span className="fw-bold text-decoration-underline">
          Session ends in:
        </span>{" "}
        <br />
        {timer} seconds
      </p>
    </div>
  );
};

export default TimerComponent;
