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

  return <p className="fw-bold">Session ends in: {timer} seconds</p>;
};

export default TimerComponent;
