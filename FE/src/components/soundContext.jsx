import { createContext, useContext, useState, useRef, useEffect } from "react";
// import { useLocation } from "react-router";
// import { set } from "react-hook-form";
import useSound from "use-sound";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
    
    // const currentLocation = useLocation();
    const [playing, setPlaying] = useState(false);
    const [playingBattle, setPlayingBattle] = useState(false);
    const currentBGM = useRef(null);
    const [mute, setMute] = useState(false);
    const [vol, setVol] = useState(0.3);
    const [playBGM, {pause: pauseBGM, stop: stopBGM}] = useSound("/sounds/tunnels.mp3", {volume: 0.2, loop: true,});
    const [playBattle, {pause: pauseBattle, stop: stopBattle}] = useSound("/sounds/battle.mp3", {volume: 0.2, loop: true,});
    const [playSlash, {pause: pauseSlash}] = useSound("/sounds/slash.mp3", { volume: vol });
    const [playMissed, {pause: pauseMissed}] = useSound("/sounds/missed.mp3", { volume: vol });
    const [playFail, {stop: stopFail}] = useSound("/sounds/fail.mp3", { volume: 0.3 });
    const [playWin, {stop: stopWin}] = useSound("/sounds/success.mp3", { volume: 0.3 });

  useEffect(() => {
      currentBGM.current = playing;
      console.log(currentBGM.current);
  }, [playing])

  const toggleMute = () => {
    const newMute = !mute;
    setMute(newMute)
    setVol(newMute ? 0 : 0.3);
  };

  const toggleBGM = (path) => {
    // preparing sounds by playing them and immmediately pausing them for later use
    playWin();
    stopWin();
    playFail();
    stopFail();
    if(!path.startsWith("/main/quests/start/")) {
      if (playing) {
          pauseBGM();
          setPlayingBattle(false);
          setPlaying(false);
          console.log(path);
        } else {
            playBGM();
            setPlaying(true);
          console.log(path);
        }
    } else if (path.startsWith("/main/quests/start/")) {
      if (playingBattle) {
          pauseBattle();
          setPlaying(false);
          setPlayingBattle(false);
          console.log(path);
        } else {
            playBattle();
            setPlayingBattle(true);
          console.log(path);
        }
    }
    
    else {
      console.log(path);
      console.log("not on the right path dude");
    }
  }


  return (
    <SoundContext.Provider
      value={{
        currentBGM,
        playBattle,
        pauseBattle,
        stopBGM,
        playingBattle,
        setPlayingBattle,
        playing,
        mute,
        playBGM,
        pauseBGM,
        stopBattle,
        playSlash,
        pauseSlash,
        playMissed,
        pauseMissed,
        playFail,
        stopFail,
        playWin,
        stopWin,
        toggleMute,
        toggleBGM,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => useContext(SoundContext);