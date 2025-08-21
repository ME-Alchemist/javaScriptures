import { createContext, useContext, useState, useRef, useEffect } from "react";
import useSound from "use-sound";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [playing, setPlaying] = useState(false);
  const [playingBattle, setPlayingBattle] = useState(false);
  const [playingBoss, setPlayingBoss] = useState(false);
  const currentBGM = useRef(null);
  const [mute, setMute] = useState(false);
  const [vol, setVol] = useState(0);
  const [playBGM, { pause: pauseBGM, stop: stopBGM }] = useSound(
    "/sounds/tunnels.mp3",
    { volume: 0.2, loop: true }
  );
  const [playBattle, { pause: pauseBattle, stop: stopBattle }] = useSound(
    "/sounds/battle.mp3",
    { volume: 0.2, loop: true }
  );
  const [playBoss, { pause: pauseBoss, stop: stopBoss }] = useSound(
    "/sounds/challenge.mp3",
    { volume: 0.3, loop: true }
  );
  const [playSlash, { pause: pauseSlash }] = useSound("/sounds/slash.mp3", {
    volume: vol,
  });
  const [playMissed, { pause: pauseMissed }] = useSound("/sounds/missed.mp3", {
    volume: vol,
  });
  const [playFail, { stop: stopFail }] = useSound("/sounds/fail.mp3", {
    volume: vol,
  });
  const [playWin, { stop: stopWin }] = useSound("/sounds/success.mp3", {
    volume: vol,
  });

  useEffect(() => {
    currentBGM.current = playing;
    console.log(currentBGM.current);
  }, [playing]);

  const toggleMute = () => {
    const newMute = !mute;
    setMute(newMute);
    setVol(newMute ? 0.3 : 0);
  };

  const toggleBGM = (path) => {
    // preparing sounds by playing them and immmediately pausing them for later use
    playWin();
    stopWin();
    playFail();
    stopFail();

    const string = "/main/quests/start/Dragon Queen's challenge";

    if (decodeURIComponent(path) === string) {
      if (playingBoss) {
        pauseBoss();
        setPlayingBattle(false);
        setPlaying(false);
        setPlayingBoss(false);
      } else {
        playBoss();
        setPlayingBoss(true);
      }
    } else if (path.startsWith("/main/quests/start/") && path !== string) {
      if (playingBattle) {
        pauseBattle();
        setPlaying(false);
        setPlayingBattle(false);
        setPlayingBoss(false);
      } else {
        playBattle();
        setPlayingBattle(true);
      }
    } else {
      if (playing) {
        pauseBGM();
        setPlayingBattle(false);
        setPlaying(false);
        setPlayingBoss(false);
      } else {
        playBGM();
        setPlaying(true);
      }
    }
  };

  return (
    <SoundContext.Provider
      value={{
        currentBGM,
        playBattle,
        pauseBattle,
        playBoss,
        pauseBoss,
        stopBoss,
        playingBoss,
        setPlayingBoss,
        stopBGM,
        playingBattle,
        setPlayingBattle,
        setPlaying,
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
        setMute,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => useContext(SoundContext);
