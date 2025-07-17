import { createContext, useContext, useState } from "react";
import useSound from "use-sound";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {

  const [playing, setPlaying] = useState(false);
  const [vol, setVol] = useState(0.3);
  const [mute, setMute] = useState(false);
  const [playBGM, {pause: pauseBGM}] = useSound("/sounds/tunnels.mp3", {volume: 0.2, loop: true,});
  const [playSlash, {pause: pauseSlash}] = useSound("/sounds/slash.mp3", { volume: vol });
  const [playMissed, {pause: pauseMissed}] = useSound("/sounds/missed.mp3", { volume: vol });
  const [playFail, {pause: pauseFail}] = useSound("/sounds/missed.mp3", { volume: vol });
  const [playWin, {pause: pauseWin}] = useSound("/sounds/missed.mp3", { volume: vol });

  const toggleMute = () => {
    const newMute = !mute;
    setMute(newMute)
    setVol(newMute ? 0 : 0.3);
  };
  const toggleBGM = () => {
    if (playing) {
      pauseBGM();
      setPlaying(false);
    } else {
      playBGM();
      setPlaying(true);
    }
  }

  return (
    <SoundContext.Provider
      value={{
        playing,
        mute,
        playBGM,
        pauseBGM,
        playSlash,
        pauseSlash,
        playMissed,
        pauseMissed,
        playFail,
        pauseFail,
        playWin,
        pauseWin,
        toggleMute,
        toggleBGM,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => useContext(SoundContext);