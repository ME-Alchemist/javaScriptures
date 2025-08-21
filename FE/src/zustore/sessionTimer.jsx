import { create } from "zustand";
import { persist } from "zustand/middleware";

const sessiontimer = create(
  persist(
    (set) => ({
      countdown: 3600,
      setCountdown: (time) => set({ countdown: time }),
      resetCountdown: () => set({ countdown: 3600 }),
    }),
    {
      name: "sessiontimer", // Keyname in localStorage
      getStorage: () => localStorage, // <-- change to localStorage if you prefer
    }
  )
);

export default sessiontimer;
